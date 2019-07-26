import React, { Component } from 'react';
import Teaser from '@fdmg/fd-teaser';
import Head from 'next/head';
import { beursModel } from '../utils/beursModel';
import { getTeaserPropsFromBeursComponents } from '../utils/model';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import etag from 'etag';
import { FdStyle } from '../styles/Global';

class Beurs extends Component<any, any> {
    static async getInitialProps() {
        return {
            etag: etag(`beurs-`),
            teaserProps: getTeaserPropsFromBeursComponents(
                beursModel.beursview.teaserList
            ),
        };
    }

    render() {
        return (
            <PageStyle>
                <FdStyle />
                <Head>
                    <title>
                        {process.env.ENVIRONMENT
                            ? `${process.env.ENVIRONMENT} `
                            : null}
                        Beurs | Het Financieele Dagblad
                    </title>
                </Head>
                <Menu />
                <div className="body">
                    <main>
                        {this.props.teaserProps.map((props: any) =>
                            props ? <Teaser {...props} /> : null
                        )}
                    </main>
                    <aside>Aside</aside>
                </div>
            </PageStyle>
        );
    }
}

export default Beurs;
