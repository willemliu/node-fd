import mongodb, { Db } from 'mongodb';
import { graphqlResolverAuthorized } from '../../utils/authorization';
const mongoClient = mongodb.MongoClient;
const dbName = 'bnr';
const collection = 'tokens';
const url =
    'mongodb+srv://cluster0-ucyju.mongodb.net/test?retryWrites=true&w=majority';
let cachedDb: Db | null;

export async function validateToken(
    parent: any,
    args: { token: string },
    context: any,
    info: any
) {
    // We do authorization checks in resolver so we can manage access per resolver.
    graphqlResolverAuthorized(context.user.authorization);
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('validate token', args.token);
    return await db(args.token);
}

async function db(token: string) {
    let result: boolean = false;
    let clientCon;
    try {
        clientCon = await mongoClient.connect(url, {
            useNewUrlParser: true,
            auth: {
                password: process.env.MONGO_DB_PASS || '',
                user: 'app',
            },
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
            cachedDb = null;
        }
        return result;
    }
}
