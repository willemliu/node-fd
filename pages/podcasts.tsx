import fetch from 'node-fetch';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import { BnrPageStyle } from '../styles/Bnr';
import etag from 'etag';
import PodcastsPageListComponent from '../components/PodcastsPageListComponent';
import TopPodcastListComponent from '../components/TopPodcastListComponent';
import { getIsServer } from '../utils/server';

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
                    <PodcastsPageListComponent
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
        etag: getIsServer() ? etag(`${JSON.stringify(podcasts)}`) : undefined,
        podcasts,
    };
};

export default Podcasts;
