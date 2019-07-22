import fetch from 'node-fetch';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import { BnrPageStyle } from '../styles/Bnr';
import etag from 'etag';
import CardListComponent from '../components/TopNewsListComponent';
import LatestPodcastListComponent from '../components/LatestPodcastListComponent';
import BrandedPodcastListComponent from '../components/BrandedPodcastListComponent';
import TopPodcastListComponent from '../components/TopPodcastListComponent';
import SpecialsListComponent from '../components/SpecialsListComponent';

function BNR(props: any) {
    return (
        <PageStyle>
            <BnrPageStyle />
            <Head>
                <title>Home | BNR Nieuwsradio</title>
            </Head>
            <Menu />
            <div className="body">
                <main>
                    <CardListComponent
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
            {props.etag}
        </PageStyle>
    );
}

BNR.getInitialProps = async () => {
    let home = [];
    try {
        // home = await fetch(`https://dev.bnr.nl/?cookieconsent=bypass`, {
        //     headers: {
        //         Authorization:
        //             'Basic ' + encode(process.env.BASIC_AUTH as string),
        //         'x-fdmg-json': 'true',
        //     },
        // }).then((res) => res.json());
        home = await fetch(
            `https://xz4on0khc6.execute-api.eu-west-1.amazonaws.com/acc`
        ).then((res) => res.json());
    } catch (e) {
        console.error(e);
    }
    return {
        etag: etag(`${JSON.stringify(home)}`),
        home,
    };
};

export default BNR;
