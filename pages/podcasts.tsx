import fetch from 'node-fetch';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import { BnrPageStyle } from '../styles/Bnr';
import etag from 'etag';
import TopPodcastListComponent from '../components/TopPodcastListComponent';
import { encode } from 'base-64';

interface Podcasts {
    programListModel: {
        teasers: [];
    };
    playerLauncherModel: {
        topReadArticlesHavingAudio: [];
    };
}

interface Props {
    etag?: string;
    podcasts: Podcasts;
}

function Podcasts(props: Props) {
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <link
                    rel="shortcut icon"
                    href="/static/favicon.ico"
                    type="image/x-icon"
                />
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    Podcasts | BNR Nieuwsradio
                </title>
            </Head>
            <Menu />
            <div className="body">
                <main>
                    <TopPodcastListComponent
                        title="Alle podcasts"
                        items={props.podcasts.programListModel.teasers}
                    />
                </main>
                <aside>
                    <TopPodcastListComponent
                        title="Populairste podcasts"
                        items={
                            props.podcasts.playerLauncherModel
                                .topReadArticlesHavingAudio
                        }
                    />
                </aside>
            </div>
            {props.etag}
        </PageStyle>
    );
}

Podcasts.getInitialProps = async (): Promise<Props> => {
    let podcasts: Podcasts;
    try {
        // home = await fetch(
        //     `${process.env.PROXY}?url=https://acc.bnr.nl/?cookieconsent=bypass`
        // ).then((res) => res.json());

        podcasts = await fetch(`${process.env.PROXY}/podcasts`).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        });
    } catch (e) {
        console.error(e);
        podcasts = {
            programListModel: { teasers: [] },
            playerLauncherModel: { topReadArticlesHavingAudio: [] },
        };
    }
    return {
        etag: etag(`${JSON.stringify(podcasts)}`),
        podcasts,
    };
};

export default Podcasts;
