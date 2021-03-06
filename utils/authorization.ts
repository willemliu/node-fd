import { AuthenticationError } from 'apollo-server-micro';

export function checkCredentials(username: string, password: string) {
    return username === 'test' && password === 'test';
}

export function checkBasicAuth(authorizationValue: string) {
    if (process.env.BASIC_AUTH) {
        return authorizationValue === process.env.BASIC_AUTH;
    } else {
        return true;
    }
}

/**
 * Determine if user has enough rights. When not, then throw an AuthenticationError.
 * @param authorizationValue Authorization header value
 */
export function graphqlResolverAuthorized(authorizationValue: string) {
    if (
        process.env.BASIC_AUTH &&
        authorizationValue !== process.env.BASIC_AUTH
    ) {
        throw new AuthenticationError('you must be logged in');
    }
}

export function denied(res: any) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Biffy"');
    res.end('Access denied');
}
