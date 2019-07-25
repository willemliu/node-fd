import fetch from 'node-fetch';
import { PageStyle } from '../styles/Page';
import { BnrPageStyle } from '../styles/Bnr';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import LatestPodcastListComponent from '../components/LatestPodcastListComponent';

interface Props {
    podcast: {
        podcastModel: {
            teasers: [];
        };
        programIntroductionTeaserModel: {
            teaser: {
                title: string;
                intro: string;
            };
        };
    };
}

function Podcast(props: Props) {
    const router = useRouter();
    const { podcast, podcastUrl } = router.query;
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    {props.podcast.programIntroductionTeaserModel.teaser.title}{' '}
                    | BNR Nieuwsradio
                </title>
            </Head>
            <Menu />
            <div className="body">
                <main>
                    <section>
                        <h1>
                            {
                                props.podcast.programIntroductionTeaserModel
                                    .teaser.title
                            }
                        </h1>
                        <p>
                            {
                                props.podcast.programIntroductionTeaserModel
                                    .teaser.intro
                            }
                        </p>
                    </section>
                    <section>
                        <LatestPodcastListComponent
                            title="Alle podcasts"
                            items={props.podcast.podcastModel.teasers}
                        />
                    </section>
                </main>
                <aside>
                    <div>{podcast}</div>
                    <div>{podcastUrl}</div>
                </aside>
            </div>
        </PageStyle>
    );
}

Podcast.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const { podcastUrl } = ctx.query;
    let podcastModel: any;
    try {
        podcastModel = await fetch(`${process.env.PROXY}${podcastUrl}`).then(
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
        podcastModel = {
            podcastModel: {
                teasers: [],
            },
            programIntroductionTeaserModel: {
                teaser: {
                    title: '',
                    intro: '',
                },
            },
        };
    }
    return {
        podcast: podcastModel,
    };
};

export default Podcast;
