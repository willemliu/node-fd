import fetch from 'node-fetch';
import Head from 'next/head';
import { PageStyle } from '../styles/Page';
import Menu from '../components/Menu';
import { BnrPageStyle } from '../styles/Bnr';
import etag from 'etag';
import PodcastListComponent from '../components/PodcastListComponent';
import { encode } from 'base-64';

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
                    <PodcastListComponent
                        title="Top 3 nieuwsfragmenten"
                        items={[
                            props.home.newsFragmentsModel.teaserFragment1,
                            props.home.newsFragmentsModel.teaserFragment2,
                            props.home.newsFragmentsModel.teaserFragment3,
                        ]}
                    />
                    <PodcastListComponent
                        title="Nieuwste podcasts"
                        items={props.home.homeLatestPodcastModel.teasers}
                    />
                    <PodcastListComponent
                        title="Brand stories"
                        items={props.home.brandstoriesTeaserModel.teasers}
                    />
                    <PodcastListComponent
                        title="BNR specials"
                        items={props.home.specialTeasersModel.teasers}
                    />
                </main>
                <aside>
                    <PodcastListComponent
                        title="Top 5 podcasts"
                        items={props.home.editorsPickModel.teasers}
                    />
                </aside>
            </div>
            {props.etag} - {props.updateTimestamp}
        </PageStyle>
    );
}

BNR.getInitialProps = async () => {
    let home = [];
    try {
        home = await fetch(`https://dev.bnr.nl/?cookieconsent=bypass`, {
            headers: {
                Authorization:
                    'Basic ' + encode(process.env.BASIC_AUTH as string),
                'x-fdmg-json': 'true',
            },
        }).then((res) => res.json());
    } catch (e) {
        console.error(e);
    }
    return {
        etag: etag(`${JSON.stringify(home)}`),
        home,
        updateTimestamp: new Date().toUTCString(),
    };
};

export default BNR;
