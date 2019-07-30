let serverPathname = '';
export function canonical(appendPath?: boolean) {
    let canonical: JSX.Element;
    let path = '';
    if (appendPath && typeof window != 'undefined') {
        path = window.location.pathname;
    } else {
        path = serverPathname;
    }
    switch (process.env.ENVIRONMENT) {
        case 'DEV':
        case 'LOCAL':
            canonical = (
                <link rel="canonical" href={`https://dev.bnr.nl${path}`} />
            );
            break;
        case 'ACC':
            canonical = (
                <link rel="canonical" href={`https://acc.bnr.nl${path}`} />
            );
            break;
        case 'PREVIEW':
            canonical = (
                <link rel="canonical" href={`https://preview.bnr.nl${path}`} />
            );
            break;
        default:
            canonical = (
                <link rel="canonical" href={`https://www.bnr.nl${path}`} />
            );
    }
    return canonical;
}

export function setServerPathname(pathName: string) {
    serverPathname = pathName;
}
