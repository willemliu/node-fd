import fetch from 'node-fetch';
import { PageStyle } from '../styles/Page';
import { BnrPageStyle, StyledArticle } from '../styles/Bnr';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';

function Article(props: any) {
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
                    | BNR Nieuwsradio
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

Article.getInitialProps = async (ctx: NextPageContext) => {
    const { articleId } = ctx.query;
    let article;
    try {
        article = await fetch(
            `https://xz4on0khc6.execute-api.eu-west-1.amazonaws.com/acc/-/${articleId}/-`
        ).then((res) => res.json());
    } catch (e) {
        console.error(e);
    }
    return { article };
};

export default Article;
