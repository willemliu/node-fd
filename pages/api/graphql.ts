import Cors from 'micro-cors';
import 'fetch-everywhere';
import { ApolloServer } from 'apollo-server-micro';
import { audios } from '../../graphqlResolvers/audios';
import { articles } from '../../graphqlResolvers/articles';
import { brandStories } from '../../graphqlResolvers/brandStories';
import { GraphQLTypeDefs as typeDefs } from '../../graphqlResolvers/GraphQLTypeDefs';

const cors = Cors({ allowMethods: ['GET', 'HEAD'] });

const resolvers = {
    Query: {
        articles,
        audios,
        brandStories,
    },
    Story: {
        audios,
    },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(apolloServer.createHandler({ path: '/api/graphql' }));
