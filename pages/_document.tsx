import Document, { Html, Main, NextScript, Head } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<any> {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        ctx.res.setHeader('Cache-Control', 'max-age=0, max-stale, s-maxage=1');

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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
