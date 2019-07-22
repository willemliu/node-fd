import Cors from 'micro-cors';
import fetch from 'node-fetch';

const cors = Cors({ allowMethods: ['GET', 'HEAD'] });

async function Proxy(request: any, response: any) {
    const model = await fetch(request.query.url).then((res) => res.json());
    response.status(200).json(model);
}

export default cors(Proxy);
