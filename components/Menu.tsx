import Link from 'next/link';
import styled from 'styled-components';

export default () => {
    return (
        <StyledHeader>
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
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: sticky;
    z-index: 1;
    top: 0;
    height: 60px;
    background-color: black;
    display: flex;
    align-items: center;
    a {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
    }
`;
