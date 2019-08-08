import 'core-js/modules/es6.string.starts-with'; // IE11
import * as promisePolyfill from 'es6-promise';
import 'fetch-everywhere';
import React from 'react';
import App, { Container } from 'next/app';
import { GlobalStyle } from '../styles/Global';
import Router from 'next/router';
import Loader from '../components/Loader';
import Audio from '../components/Audio';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../graphql/client';

promisePolyfill.polyfill();

export default class PersistentApp extends App {
    state: any = {
        loading: false,
    };
    private cachedPageScrollPos: number[] = [];
    private poppedState = false;
    private scrollTimeout: number = 0;

    static async getInitialProps({ Component, ctx }: any) {
        let pageProps: any = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
            if (ctx.res && pageProps.etag && !process.env.PREVIEW) {
                ctx.res.setHeader('Etag', `${pageProps.etag}`);
            }
        }

        return { pageProps };
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', () => {
            this.setState({ loading: true });
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            if (!this.poppedState) {
                this.cachedPageScrollPos.push(window.scrollY);
            }
        });
        Router.events.on('routeChangeComplete', () => {
            this.setState({ loading: false });
            if (this.poppedState) {
                const scrollY = this.cachedPageScrollPos.pop();
                if (typeof scrollY != 'undefined') {
                    this.scrollTimeout = setTimeout(() => {
                        window.scrollTo(0, scrollY);
                    }, 500);
                }
            }
            this.poppedState = false;
        });

        Router.beforePopState(() => {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            this.poppedState = true;
            return true;
        });
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <GlobalStyle />
                    {this.state.loading ? <Loader /> : ''}
                    <Component {...pageProps} />
                    <Audio />
                </ApolloProvider>
            </Container>
        );
    }
}
