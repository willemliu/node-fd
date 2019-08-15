import ApolloClient from 'apollo-boost';

let apolloClient: any;

export function getApolloClient(isServer?: boolean) {
    if (!apolloClient) {
        let headers: any = {};
        if (isServer) {
            headers['Authorization'] = process.env.BASIC_AUTH;
        }
        console.log('APOLLO CLIENT HEADERS', headers);
        apolloClient = new ApolloClient({
            uri: `${process.env.GRAPHQL_SERVER}`,
            name: 'BNR Nieuwsradio',
            version: process.env.ENVIRONMENT,
            credentials: 'include',
            headers,
        });
        apolloClient.defaultOptions.watchQuery = {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        };
    }
    return apolloClient;
}
