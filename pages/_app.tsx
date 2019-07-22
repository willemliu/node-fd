import React from 'react';
import App, { Container } from 'next/app';
import { GlobalStyle } from '../styles/Global';

export default class PersistentApp extends App {
    static async getInitialProps({ Component, ctx }: any) {
        let pageProps: any = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
            if (ctx.res) {
                ctx.res.setHeader('Etag', `${pageProps.etag}`);
            }
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <GlobalStyle />
                <Component {...pageProps} />
            </Container>
        );
    }
}
