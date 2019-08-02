import Link from 'next/link';
import styled from 'styled-components';
import { ripple } from '../utils/ripple';
import { useRouter } from 'next/router';

export default () => {
    const Router = useRouter();
    const selectedMenu: any = { '': false, podcast: false, article: false };
    Object.keys(selectedMenu).forEach((key: string) => {
        const splittedPath = Router.pathname.split('/');
        if (!splittedPath[1]) {
            selectedMenu['/'] = true;
        } else {
            selectedMenu[key] =
                splittedPath[1].toLowerCase().indexOf(key) === 0;
        }
    });
    return (
        <StyledHeader>
            <img src="/static/logo65x104.png" alt="BNR Nieuwsradio" />
            <LinksContainer>
                <Link href="/" as="/" prefetch={true} passHref={true}>
                    <a
                        className={`ripple${
                            selectedMenu['/'] ? ' active' : ''
                        }`}
                        onClick={ripple}
                    >
                        <span>Home</span>
                    </a>
                </Link>
                <Link
                    href="/podcasts"
                    as="/podcasts"
                    prefetch={true}
                    passHref={true}
                >
                    <a
                        className={`ripple ${
                            selectedMenu['podcast'] ? ' active' : ''
                        }`}
                        onClick={ripple}
                    >
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
        height: calc(100% - 0.5rem);
        margin: 0 0.5rem;
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
        text-decoration: none;
        text-align: center;
        &.ripple {
            overflow: unset;
        }
        span {
        }
        span::after {
            content: '';
            bottom: 0;
            transition: transform 0.2s ease-out;
            display: block;
            width: 100%;
            left: 0;
            right: 0;
            background-color: #ffd200;
            height: 2px;
            transform: scaleX(0);
            position: absolute;
        }
        &.active,
        &:hover {
            span::after {
                content: '';
                transform: scaleX(1);
            }
        }
    }
`;
