import Document, {
    Html,
    Main,
    NextScript,
    Head,
    DocumentContext,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { canonical } from '../utils/canonical';
import {
    checkCredentials,
    denied,
    checkBasicAuth,
} from '../utils/authorization';
import basicAuth from 'basic-auth';

export default class MyDocument extends Document<any> {
    static async getInitialProps(ctx: DocumentContext) {
        let authorized = false;
        if (process.env.BASIC_AUTH && ctx.req) {
            const credentials = basicAuth(ctx.req);
            if (credentials && ctx.req.headers.authorization) {
                authorized =
                    checkCredentials(credentials.name, credentials.pass) ||
                    checkBasicAuth(ctx.req.headers.authorization);
            }
        }

        if (process.env.BASIC_AUTH && !authorized && ctx.res) {
            denied(ctx.res);
            return;
        }

        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        if (!process.env.PREVIEW && ctx.res) {
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
                    <meta httpEquiv="X-UA-Compatible" content="IE=11" />
                    {canonical()}
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
