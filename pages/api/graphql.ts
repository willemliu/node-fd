import Cors from 'micro-cors';
import 'fetch-everywhere';
import { ApolloServer } from 'apollo-server-micro';
import { audios } from '../../graphqlResolvers/audios';
import { articles } from '../../graphqlResolvers/articles';
import { brandStories } from '../../graphqlResolvers/brandStories';
import { home } from '../../graphqlResolvers/home';
import { typeDefs } from '../../graphqlResolvers/typeDefs/typeDefs';

const cors = Cors({ allowMethods: ['GET', 'HEAD'] });

const resolvers = {
    Query: {
        articles,
        audios,
        brandStories,
        home,
    },
    Story: {
        audios,
    },
};

const notProduction =
    typeof process.env.ENVIRONMENT == 'undefined' ? false : true;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: notProduction,
    playground: notProduction,
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(apolloServer.createHandler({ path: '/api/graphql' }));
