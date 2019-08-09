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
    const url = `mongodb+srv://willem_liu:${encodeURIComponent(
        process.env.MONGO_DB_PASS || ''
    )}@cluster0-ucyju.mongodb.net/test?retryWrites=true&w=majority`;
    console.log(url);
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
