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

interface Article {
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
}
interface Props {
    audio: any;
    article: Article;
    etag?: string;
}

function Article(props: Props) {
    const router = useRouter();
    const { articleId, section, subSection, title } = router.query;

    useEffect(() => {
        [].slice
            .call(document.querySelectorAll('.article-audio-button'))
            .forEach((audioButton: HTMLAnchorElement) => {
                audioButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    AudioStore.setAudio(props.audio);
                });
            });
    }, []);

    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    {props.article.articleview.article.title} | BNR Nieuwsradio
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

Article.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const { articleId } = ctx.query;
    let article: Article;
    let audio: any;

    try {
        article = await fetch(`${process.env.PROXY}/-/${articleId}/-`).then(
            (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`${res.status}`);
                }
            }
        );

        audio = await fetch(
            `${process.env.PROXY}/player/audio/${article.analyticsInfo.audioId}/${article.articleview.article.id}`
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        });
        audio.playerview.publicationUrl =
            article.articleview.article.publicationUrl;
        audio.playerview.articleId = article.articleview.article.id;
    } catch (e) {
        console.error(e);
        article = {
            analyticsInfo: {
                audioId: '',
            },
            articleview: {
                article: {
                    content: '',
                    intro: '',
                    title: '',
                },
            },
        };
    }
    return {
        etag: `"${md5(JSON.stringify(article))}"`,
        audio,
        article,
    };
};

export default Article;
