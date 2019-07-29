import Document, { Html, Main, NextScript, Head } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { setIsServer } from '../utils/server';

export default class MyDocument extends Document<any> {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        setIsServer(true);

        if (!process.env.PREVIEW) {
            ctx.res.setHeader(
                'Cache-Control',
                // 'max-age=0, max-stale, s-maxage=1, stale-while-revalidate=60'
                'max-age=0, max-stale, s-maxage=60'
            );
        }

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps: any = await Document.getInitialProps(ctx);
            const styleElement = sheet.getStyleElement();
            return {
                ...initialProps,
                styles: [...(initialProps.styles as any), ...styleElement],
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=UTF-8"
                    />
                    <meta http-equiv="X-UA-Compatible" content="IE=11" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link
                        rel="shortcut icon"
                        href="/static/favicon.ico"
                        type="image/x-icon"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
