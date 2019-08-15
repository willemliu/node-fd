import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
    uri: `${process.env.GRAPHQL_SERVER}`,
    name: 'BNR Nieuwsradio',
    version: process.env.ENVIRONMENT,
    credentials: 'include',
});

apolloClient.defaultOptions.watchQuery = {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
};

export { apolloClient };
