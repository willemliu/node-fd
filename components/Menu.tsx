import Link from 'next/link';

export default () => {
    return (
        <header>
            <Link href="/" as="/">
                <a>Home</a>
            </Link>
            <Link href="/beurs" as="/beurs">
                <a>Beurs</a>
            </Link>
            <Link href="/bnr" as="/bnr">
                <a>BNR</a>
            </Link>
            <Link href="/test" as="/test">
                <a>Test</a>
            </Link>
        </header>
    );
};
