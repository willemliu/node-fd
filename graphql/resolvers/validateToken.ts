import mongodb, { Db } from 'mongodb';

const mongoClient = mongodb.MongoClient;
const dbName = 'bnr';
const collection = 'tokens';
const url = `mongodb://willem_liu:${encodeURIComponent(
    process.env.MONGO_DB_PASS || ''
)}@cluster0-shard-00-00-ucyju.mongodb.net:27017,cluster0-shard-00-01-ucyju.mongodb.net:27017,cluster0-shard-00-02-ucyju.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin`;

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
    let result: boolean = false;
    let clientCon;
    try {
        clientCon = await mongoClient.connect(url, { useNewUrlParser: true });
        const db: Db = clientCon.db(dbName);
        // We would do a findOneAndDelete normally. But for development findOne is easier.
        const cursor = await db.collection(collection).findOne({ token });
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
        console.log('finally false...');
        return result;
    }
}
