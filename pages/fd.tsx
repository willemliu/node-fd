import fetch from 'node-fetch';
import React, { Component } from 'react';
import OpeningTeaser from '@fdmg/fd-opening-teaser';
import Teaser from '@fdmg/fd-teaser';
import SquareTeaser from '@fdmg/fd-square-teaser';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import { getTeaserPropsFromComponents } from '../utils/model';
import Menu from '../components/Menu';
import etag from 'etag';
import { FdStyle } from '../styles/Global';

class Fd extends Component<any, any> {
    static async getInitialProps() {
        const homeModel = await fetch(
            `https://node-fd.willemliu.now.sh/api/home`
        ).then((res) => res.json());
        return {
            etag: etag(JSON.stringify(homeModel)),
            openingTeaserProps: getTeaserPropsFromComponents([
                {
                    model:
                        homeModel.openingTeaserModel &&
                        homeModel.openingTeaserModel.teaserModels[0]
                            ? homeModel.openingTeaserModel.teaserModels[0]
                            : [],
                },
            ]),
            leftTeaserProps: getTeaserPropsFromComponents(
                homeModel.homePageLayout && homeModel.homePageLayout.components
                    ? homeModel.homePageLayout.components
                    : []
            ),
            rightTeaserProps: getTeaserPropsFromComponents(
                homeModel.homePageSideLayout &&
                    homeModel.homePageSideLayout.components
                    ? homeModel.homePageSideLayout.components
                    : []
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
                        Home | Het Financieele Dagblad
                    </title>
                </Head>
                <Menu />
                <div className="body">
                    <main>
                        {this.props.openingTeaserProps.map((props: any) =>
                            props ? <OpeningTeaser {...props} /> : null
                        )}
                        {this.props.leftTeaserProps.map((props: any) =>
                            props ? <Teaser {...props} /> : null
                        )}
                    </main>
                    <aside>
                        {this.props.rightTeaserProps.map((props: any) =>
                            props ? <SquareTeaser {...props} /> : null
                        )}
                    </aside>
                </div>
            </PageStyle>
        );
    }
}

export default Fd;
