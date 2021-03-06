import React from 'react';
import 'fetch-everywhere';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import { BnrPageStyle } from '../styles/Bnr';
import TopNewsListComponent from '../components/TopNewsListComponent';
import LatestPodcastListComponent from '../components/LatestPodcastListComponent';
import BrandedPodcastListComponent from '../components/BrandedPodcastListComponent';
import TopPodcastListComponent from '../components/TopPodcastListComponent';
import SpecialsListComponent from '../components/SpecialsListComponent';
import md5 from 'md5';
import { canonical } from '../utils/canonical';
import { gql } from 'apollo-boost';
import { getApolloClient } from '../graphql/client';
import { NextPageContext } from 'next';

interface Home {
    newsFragmentsModel: {
        teaserFragment1: any;
        teaserFragment2: any;
        teaserFragment3: any;
    };
    homeLatestPodcastModel: { teasers: [] };
    brandstoriesTeaserModel: { teasers: [] };
    specialTeasersModel: { teasers: [] };
    editorsPickModel: { teasers: [] };
}

interface Props {
    etag?: string;
    home: Home;
    updateTimestamp?: string;
}

function BNR(props: Props) {
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>
                    {process.env.ENVIRONMENT
                        ? `${process.env.ENVIRONMENT} `
                        : null}
                    Home | BNR Nieuwsradio
                </title>
                {canonical(true)}
            </Head>
            <Menu />
            <div className="body">
                <main>
                    <TopNewsListComponent
                        title="Top 3 nieuwsfragmenten"
                        items={[
                            props.home.newsFragmentsModel.teaserFragment1,
                            props.home.newsFragmentsModel.teaserFragment2,
                            props.home.newsFragmentsModel.teaserFragment3,
                        ]}
                    />
                    <LatestPodcastListComponent
                        title="Nieuwste podcasts"
                        items={props.home.homeLatestPodcastModel.teasers}
                    />
                    <BrandedPodcastListComponent
                        title="Brand stories"
                        items={props.home.brandstoriesTeaserModel.teasers}
                    />
                    <SpecialsListComponent
                        title="BNR specials"
                        items={props.home.specialTeasersModel.teasers}
                    />
                </main>
                <aside>
                    <TopPodcastListComponent
                        title="Top 5 podcasts"
                        items={props.home.editorsPickModel.teasers}
                    />
                </aside>
            </div>
            {props.etag} {props.updateTimestamp}
        </PageStyle>
    );
}

BNR.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
    let home: Home;

    if (req) {
        console.log(req.headers.authorization);
    }

    try {
        const graphRes = await getApolloClient(
            req ? { authorization: req.headers.authorization } : false
        ).query({
            query: gql`
                {
                    home {
                        editorsPickModel {
                            teasers {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                        }
                        specialTeasersModel {
                            teasers {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                        }
                        brandstoriesTeaserModel {
                            teasers {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                        }
                        newsFragmentsModel {
                            teaserFragment1 {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                            teaserFragment2 {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                            teaserFragment3 {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                        }
                        homeLatestPodcastModel {
                            teasers {
                                id
                                title
                                publicationUrl
                                durationInMinutes
                                picture {
                                    imageBaseUrl
                                    imageUrlSmall
                                    imageUrlMedium
                                    imageUrlLarge
                                }
                            }
                        }
                    }
                }
            `,
        });
        home = graphRes.data.home;
    } catch (e) {
        console.error(e);
        home = {
            brandstoriesTeaserModel: { teasers: [] },
            editorsPickModel: { teasers: [] },
            homeLatestPodcastModel: { teasers: [] },
            newsFragmentsModel: {
                teaserFragment1: { id: 1 },
                teaserFragment2: { id: 2 },
                teaserFragment3: { id: 3 },
            },
            specialTeasersModel: { teasers: [] },
        };
    }

    return {
        etag: `"${md5(JSON.stringify(home))}"`,
        home,
        updateTimestamp: new Date().toUTCString(),
    };
};

export default BNR;
