import Cors from 'micro-cors';
import 'fetch-everywhere';
import { encode } from 'base-64';

const cors = Cors({ allowMethods: ['GET', 'HEAD'] });

async function Proxy(request: any, response: any) {
    response.setHeader(
        'Cache-Control',
        'max-age=0, max-stale, s-maxage=1, stale-while-revalidate=60'
    );
    const model = await fetch(request.query.url, {
        headers: {
            Authorization: 'Basic ' + encode(process.env.BASIC_AUTH as string),
            'x-fdmg-json': 'true',
        },
    }).then((res) => res.json());
    response.status(200).json(model);
}

export default cors(Proxy);
