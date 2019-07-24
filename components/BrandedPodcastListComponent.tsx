import styled from 'styled-components';
import { StyledH2, StyledAnchor, CardSection } from '../styles/Bnr';
import { ripple } from '../utils/ripple';
import Link from 'next/link';

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
                    return (
                        <li key={item.id} className="ripple" onClick={ripple}>
                            <Link
                                href={`/article?articleId=${item.id}`}
                                as={item.publicationUrl}
                            >
                                <StyledAnchor
                                    href={`https://dev.bnr.nl${item.publicationUrl}`}
                                >
                                    {item.picture ? (
                                        <figure>
                                            <picture>
                                                <source
                                                    media="(max-width:640px)"
                                                    srcSet={
                                                        item.picture
                                                            .imageUrlSmall
                                                    }
                                                />
                                                <source
                                                    media="(max-width:860px)"
                                                    srcSet={
                                                        item.picture
                                                            .imageUrlMedium
                                                    }
                                                />
                                                <source
                                                    media="(min-width:861px)"
                                                    srcSet={
                                                        item.picture
                                                            .imageUrlLarge
                                                    }
                                                />
                                                <img
                                                    src={
                                                        item.picture
                                                            .baseImageUrl
                                                    }
                                                    alt={item.title}
                                                />
                                            </picture>
                                        </figure>
                                    ) : null}
                                    <CardSection>
                                        <h3>{item.title}</h3>
                                        <time>
                                            Duur: {item.durationInMinutes} min
                                        </time>
                                        <h3>{item.programTitle}</h3>
                                    </CardSection>
                                </StyledAnchor>
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
    }
    figure {
        margin: 0;
        img {
            width: 100%;
        }
    }
    li {
        flex: 0 1 calc(50% - 0.25rem);
        @media only screen and (min-width: 860px) {
            flex: 0 1 calc(25% - 0.25rem);
        }
        padding: 0;
        margin: 0 0 0.5rem 0;
        overflow: hidden;
        box-shadow: 0 2px 0.2px rgba(255, 0, 0, 1);
        border-radius: 5px;
        background-color: white;
        section {
            padding: 0.5rem;
        }

        animation: branded-glow 6s linear;
        animation-iteration-count: infinite;
    }

    @keyframes branded-glow {
        0% {
            box-shadow: 0 2px 0.2px 0px rgba(255, 0, 0, 1);
        }
        50% {
            box-shadow: 0 0 10px 0px rgba(255, 0, 0, 0.6);
        }
        85% {
            box-shadow: 0 2px 0.2px 0px rgba(255, 0, 0, 1);
        }
    }
`;
