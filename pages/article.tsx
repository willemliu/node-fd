import { PageStyle } from '../styles/Page';
import { BnrPageStyle } from '../styles/Bnr';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default () => {
    const router = useRouter();
    const { articleId } = router.query;
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.PREVIEW ? 'PREVIEW ' : null}| BNR Nieuwsradio
                </title>
            </Head>
            <div className="body">
                <main>Article {articleId}</main>
                <aside></aside>
            </div>
        </PageStyle>
    );
};
