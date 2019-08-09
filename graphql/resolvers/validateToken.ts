import mongodb, { Db } from 'mongodb';
const mongoClient = mongodb.MongoClient;
const dbName = 'bnr';
const collection = 'tokens';
const url =
    'mongodb+srv://app:' +
    encodeURIComponent(process.env.MONGO_DB_PASS || '') +
    '@cluster0-ucyju.mongodb.net/test?retryWrites=true&w=majority';
let cachedDb: Db;

export async function validateToken(
    parent: any,
    args: { token: string },
    context: any,
    info: any
) {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('validate token', args.token);
    return await db(args.token);
}

async function db(token: string) {
    console.log(url);
    let result: boolean = false;
    let clientCon;
    try {
        clientCon = await mongoClient.connect(url, {
            useNewUrlParser: true,
        });
        if (cachedDb) {
            console.log('=> using cached database instance');
        } else {
            const db: Db = clientCon.db(dbName);
            cachedDb = db;
        }
        // We would do a findOneAndDelete normally. But for development findOne is easier.
        const cursor = await cachedDb.collection(collection).findOne({ token });
        if (cursor && cursor.token) {
            console.log('token found:', cursor.token);
            result = true;
        }
    } catch (e) {
        console.error(e);
    } finally {
        if (clientCon) {
            clientCon.close();
        }
        return result;
    }
}
