import ApolloClient from 'apollo-boost';

let apolloClient: any;

export function getApolloClient(
    customHeaders?: { authorization: string | undefined } | boolean
) {
    if (!apolloClient) {
        let headers: any = {};
        if (customHeaders) {
            headers = customHeaders;
        }
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
