import React from 'react';
import App, { Container } from 'next/app';
import { GlobalStyle } from '../styles/Global';
import Router from 'next/router';
import Loader from '../components/Loader';

export default class PersistentApp extends App {
    state: any = {
        loading: false,
    };

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
        });
        Router.events.on('routeChangeComplete', () => {
            this.setState({ loading: false });
        });
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <GlobalStyle />
                {this.state.loading ? <Loader /> : ''}
                <Component {...pageProps} />
            </Container>
        );
    }
}
