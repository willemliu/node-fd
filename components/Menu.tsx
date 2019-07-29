import Link from 'next/link';
import styled from 'styled-components';
import { ripple } from '../utils/ripple';

export default () => {
    return (
        <StyledHeader>
            <img src="/static/logo65x104.png" alt="BNR Nieuwsradio" />
            <LinksContainer>
                <Link href="/" as="/" prefetch={true} passHref={true}>
                    <a className="ripple" onClick={ripple}>
                        <span>Home</span>
                    </a>
                </Link>
                <Link
                    href="/podcasts"
                    as="/podcasts"
                    prefetch={true}
                    passHref={true}
                >
                    <a className="ripple" onClick={ripple}>
                        <span>Podcasts</span>
                    </a>
                </Link>
            </LinksContainer>
        </StyledHeader>
    );
};

const LinksContainer = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    height: 100%;
    white-space: nowrap;
    overflow-x: auto;
    background-color: inherit;
`;

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
        position: relative;
        background-color: inherit;
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        height: 100%;
        align-items: center;
        padding: 0 1rem;
        box-sizing: border-box;
        &.ripple {
            overflow: unset;
        }
    }
`;
