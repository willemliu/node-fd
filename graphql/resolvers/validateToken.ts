import mongodb, { Db } from 'mongodb';

export async function validateToken(
    parent: any,
    args: { token: string },
    context: any,
    info: any
) {
    console.log('validate token', args.token);
    return await db(args.token);
}

async function db(token: string) {
    const mongoClient = mongodb.MongoClient;
    const dbName = 'bnr';
    const collection = 'tokens';
    const url = `mongodb+srv://${encodeURIComponent(
        'willem_liu'
    )}:${encodeURIComponent(
        process.env.MONGO_DB_PASS || ''
    )}@cluster0-ucyju.mongodb.net/testgraphql?retryWrites=true&w=majority`;
    console.log(url);
    let result: boolean = false;
    let clientCon = await mongoClient.connect(url, {
        useNewUrlParser: true,
        ssl: false,
        autoReconnect: true,
        auth: {
            password: process.env.MONGO_DB_PASS || '',
            user: 'willem_liu',
        },
    });
    const db: Db = clientCon.db(dbName);
    // We would do a findOneAndDelete normally. But for development findOne is easier.
    const cursor = await db.collection(collection).findOne({ token });
    if (cursor && cursor.token) {
        console.log('token found:', cursor.token);
        result = true;
    }
    if (clientCon) {
        clientCon.close();
    }
    return result;
}
