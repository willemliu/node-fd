import Cors from 'micro-cors';
import { homeModel } from '../../components/homeModel';

// import fetch from 'node-fetch';

const cors = Cors({ allowMethods: ['GET', 'HEAD'] });

function HomeModel(request: any, response: any) {
    // const model = await fetch('https://dev.fd.nl', {
    //     headers: {
    //         'x-fdmg-json': 'true',
    //     },
    // }).then((res) => res.json());
    response.status(200).json(homeModel);
}

export default cors(HomeModel);
