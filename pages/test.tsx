import React from 'react';
import Menu from '../components/Menu';
import { PageStyle } from '../styles/Page';
import Head from 'next/head';

export default function Test() {
    return (
        <PageStyle>
            <Head>
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    Test
                </title>
            </Head>
            <Menu />
            <div className="testtest">Testing123</div>
        </PageStyle>
    );
}
