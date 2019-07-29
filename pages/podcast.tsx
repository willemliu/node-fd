import fetch from 'node-fetch';
import { PageStyle } from '../styles/Page';
import { BnrPageStyle } from '../styles/Bnr';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import LatestPodcastListComponent from '../components/LatestPodcastListComponent';
import styled from 'styled-components';
import md5 from 'md5';

interface Props {
    etag?: string;
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
                    <StyledStickyHeader>
                        {
                            props.podcast.programIntroductionTeaserModel.teaser
                                .title
                        }
                    </StyledStickyHeader>
                    <StyledIntro>
                        <p>
                            {
                                props.podcast.programIntroductionTeaserModel
                                    .teaser.intro
                            }
                        </p>
                    </StyledIntro>
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
        etag: md5(`"${JSON.stringify(podcastModel)}"`),
        podcast: podcastModel,
    };
};

const StyledStickyHeader = styled.h1`
    transform: skew(0deg, -7deg);
    padding: 0.1rem 0.5rem;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #ffd200;
    color: black;
    float: right;
    margin-top: 10px;
    font-size: 1.2rem;
    @media only screen and (min-width: 861px) {
        font-size: 1.5rem;
    }
    @media only screen and (min-width: 1025px) {
        font-size: 2rem;
    }
    position: sticky;
    top: 40px;
    z-index: 2;
`;

const StyledIntro = styled.section`
    background-color: black;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
    position: relative;
    p {
        padding: 1rem;
    }
`;

export default Podcast;
