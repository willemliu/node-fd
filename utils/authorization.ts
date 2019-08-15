export function checkCredentials(username: string, password: string) {
    console.log(username, password);
    return username === 'test' && password === 'test';
}

export function denied(res: any) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Biffy"');
    res.end('Access denied');
}
