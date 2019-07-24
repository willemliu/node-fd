import Link from 'next/link';
import styled from 'styled-components';
import { ripple } from '../utils/ripple';

export default () => {
    return (
        <StyledHeader className="ripple" onClick={ripple}>
            <img src="/static/logo65x104.png" alt="BNR Nieuwsradio" />
            <Link href="/" as="/" prefetch={true}>
                <a>Home</a>
            </Link>
            <Link href="/beurs" as="/beurs" prefetch={true}>
                <a>Beurs</a>
            </Link>
            <Link href="/bnr" as="/bnr" prefetch={true}>
                <a>BNR</a>
            </Link>
            <Link href="/test" as="/test" prefetch={true}>
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
    img {
        padding: 0.5rem 1rem;
        height: 100%;
    }

    a {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
    }
`;
