import styled from 'styled-components';
import { StyledH2 } from '../styles/Bnr';
import { ripple } from '../utils/ripple';
import Link from 'next/link';
import CardAnchor from './CardAnchor';

export interface Props {
    title: string;
    items: any[];
}

export default (props: Props) => {
    return (
        <StyledList>
            <StyledH2>{props.title}</StyledH2>
            <ul>
                {props.items.map((item: any) => {
                    let href = item.publicationUrl;
                    if (href.startsWith('/podcast')) {
                        href = `/podcastArticle?articleId=${item.id}`;
                    } else if (href.startsWith('/brand')) {
                        href = `/branded?articleId=${item.id}`;
                    } else {
                        href = `/article?articleId=${item.id}`;
                    }

                    return (
                        <li key={item.id} className="ripple" onClick={ripple}>
                            <Link
                                href={href}
                                as={item.publicationUrl}
                                passHref={true}
                                prefetch={true}
                            >
                                <CardAnchor item={item} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </StyledList>
    );
};

const StyledList = styled.section`
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        @media only screen and (min-width: 861px) {
            max-width: calc(100vw - 300px); // IE11 fix
        }
    }
    figure {
        margin: 0;
        img {
            display: block;
            width: 100%;
        }
    }
    li {
        position: relative;
        flex: 0 1 calc(50% - 0.25rem);
        max-width: calc(50% - 0.25rem); // IE11 fix
        @media only screen and (min-width: 861px) {
            flex: 0 1 calc(25% - 0.25rem);
            max-width: calc(25% - 0.25rem); // IE11 fix
        }
        padding: 0;
        margin: 0 0 0.5rem 0;
        overflow: hidden;
        box-shadow: 0 2px 0.2px rgba(255, 210, 0, 1);
        border-radius: 5px;
        background-color: white;
        section {
            padding: 0.5rem;
        }
    }
`;
