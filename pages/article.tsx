import { PageStyle } from '../styles/Page';
import { BnrPageStyle } from '../styles/Bnr';
import Head from 'next/head';

export default () => {
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.PREVIEW ? 'PREVIEW ' : null}| BNR Nieuwsradio
                </title>
            </Head>
            <div className="body">
                <main>Article</main>
                <aside></aside>
            </div>
        </PageStyle>
    );
};
