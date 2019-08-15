import React from 'react';
import 'fetch-everywhere';
import { PageStyle } from '../styles/Page';
import { BnrPageStyle, StyledArticle } from '../styles/Bnr';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import md5 from 'md5';
import { canonical } from '../utils/canonical';
import { useEffect } from 'react';
import AudioStore from '../stores/Audio';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { getApolloClient } from '../graphql/client';

interface Branded {
    analyticsInfo: {
        audioId?: string;
    };
    articleview: {
        article: {
            id?: number;
            title: string;
            intro: string;
            content: string;
            publicationUrl?: string;
        };
    };
    audios?: [
        {
            playerview: {
                audioUrl: string;
                articleId: string;
                shareDescription: string;
                shareImageUrl: string;
                title: string;
                publicationUrl: string;
            };
        }
    ];
}
interface Props {
    etag?: string;
    article: Branded;
}

function Branded(props: Props) {
    const router = useRouter();
    const { articleId, section, subSection, title } = router.query;
    const { loading, data } = useQuery(
        gql`
    {
        audios(articleId: ${parseInt(
            articleId as string,
            10
        )}, audioId: ${parseInt(
            props.article.analyticsInfo.audioId as string,
            10
        )}) {
            playerview {
                articleId
                audioUrl
                shareDescription
                shareImageUrl
                title
                publicationUrl
            }
        }
    }
    `
    );

    useEffect(() => {
        if (!loading) {
            [].slice
                .call(document.querySelectorAll('.article-audio-button'))
                .forEach((audioButton: HTMLAnchorElement) => {
                    audioButton.addEventListener('click', async (e) => {
                        e.preventDefault();
                        AudioStore.setAudio(data.audios[0]);
                    });
                });
        }
    }, [data]);

    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    | BNR Nieuwsradio
                </title>
                {canonical(true)}
            </Head>
            <Menu />
            <div className="body">
                <main>
                    <StyledArticle>
                        <h1>{props.article.articleview.article.title}</h1>
                        <p>{props.article.articleview.article.intro}</p>
                        <section
                            className="article-body"
                            dangerouslySetInnerHTML={{
                                __html:
                                    props.article.articleview.article.content,
                            }}
                        />
                    </StyledArticle>
                </main>
                <aside>
                    <div>{articleId}</div>
                    <div>{section}</div>
                    <div>{subSection}</div>
                    <div>{title}</div>
                </aside>
            </div>
        </PageStyle>
    );
}

Branded.getInitialProps = async ({ req, query }: any): Promise<Props> => {
    const { articleId } = query;
    let data: { brandStories: [Branded] };

    try {
        const graphRes = await getApolloClient(
            req ? { authorization: req.headers.authorization } : false
        ).query({
            query: gql`
            {
                brandStories(id: ${articleId}) {
                    analyticsInfo {
                        audioId
                    }
                    articleview {
                        article {
                            id
                            title
                            intro
                            content
                        }
                    }
                }
            }
            `,
        });
        data = graphRes.data;
    } catch (e) {
        console.error(e);
        data = {
            brandStories: [
                {
                    analyticsInfo: {},
                    articleview: {
                        article: {
                            content: '',
                            intro: '',
                            title: '',
                        },
                    },
                },
            ],
        };
    }
    return {
        etag: `"${md5(JSON.stringify(data))}"`,
        article: data.brandStories[0],
    };
};

export default Branded;
