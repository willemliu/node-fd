import Cors from 'micro-cors';
import 'fetch-everywhere';
import { ApolloServer } from 'apollo-server-micro';
import { audios } from '../../graphql/resolvers/audios';
import { articles } from '../../graphql/resolvers/articles';
import { brandStories } from '../../graphql/resolvers/brandStories';
import { validateToken } from '../../graphql/resolvers/validateToken';
import { home } from '../../graphql/resolvers/home';
import { typeDefs } from '../../graphql/typeDefs/typeDefs';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import basicAuth from 'basic-auth';

const ComplexityLimitRule = createComplexityLimitRule(1000, {
    onCost: (cost: number) => {
        console.log('query cost:', cost);
    },
    formatErrorMessage: (cost: number) =>
        `query with cost ${cost} exceeds complexity limit`,
});

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
    Mutation: {
        validateToken,
    },
};

const notProduction =
    typeof process.env.ENVIRONMENT == 'undefined' ? false : true;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: notProduction && !process.env.BASIC_AUTH,
    playground: notProduction || !!process.env.BASIC_AUTH,
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
    },
    validationRules: [
        ComplexityLimitRule,
        depthLimit(10, { ignore: [] }, (depths: number) => {
            console.log('query depths:', JSON.stringify(depths, null, 2));
        }),
    ],
    context: ({ req }) => {
        const user = basicAuth(req);
        // We can prevent users from seeing our schema if they are not logged in.
        // if (!user) throw new AuthenticationError('you must be logged in');
        return {
            user: {
                username: user ? user.name : '',
                password: user ? user.pass : '',
                authorization: req.headers.authorization,
            },
        };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(apolloServer.createHandler({ path: '/api/graphql' }));
