import fetch from 'node-fetch';
import { PageStyle } from '../styles/Page';
import { BnrPageStyle, StyledArticle } from '../styles/Bnr';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import etag from 'etag';
import { getIsServer } from '../utils/server';

interface Article {
    articleview: {
        article: {
            title: string;
            intro: string;
            content: string;
        };
    };
}
interface Props {
    article: Article;
    etag?: string;
}

function Article(props: Props) {
    const router = useRouter();
    const { articleId, section, subSection, title } = router.query;
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
    } catch (e) {
        console.error(e);
        article = {
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
        etag: getIsServer() ? etag(`${JSON.stringify(article)}`) : undefined,
        article,
    };
};

export default Article;
