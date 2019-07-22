import styled from 'styled-components';

export interface Props {
    title: string;
    items: any[];
}

export default (props: Props) => {
    return (
        <StyledList>
            <h1>{props.title}</h1>
            <ul>
                {props.items.map((item: any) => {
                    return (
                        <li key={item.id}>
                            <a
                                href={`https://dev.bnr.nl${item.publicationUrl}`}
                            >
                                {item.picture ? (
                                    <figure>
                                        <picture>
                                            <source
                                                media="(max-width:640px)"
                                                srcSet={
                                                    item.picture.imageUrlSmall
                                                }
                                            />
                                            <source
                                                media="(max-width:860px)"
                                                srcSet={
                                                    item.picture.imageUrlMedium
                                                }
                                            />
                                            <source
                                                media="(min-width:861px)"
                                                srcSet={
                                                    item.picture.imageUrlLarge
                                                }
                                            />
                                            <img
                                                src={item.picture.baseImageUrl}
                                                alt={item.title}
                                            />
                                        </picture>
                                    </figure>
                                ) : null}
                                <h3>{item.title}</h3>
                                <time>Duur: {item.durationInMinutes} min</time>
                                <h3>{item.programTitle}</h3>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </StyledList>
    );
};

const StyledList = styled.section`
    h1 {
        padding: 0.5rem 0;
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
    }
    h1,
    li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin: 0.5rem 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    figure {
        float: right;
        margin: 0 0 0 0.5rem;
        img {
            max-width: 96px;
        }
    }
    a {
        color: inherit;
        text-decoration: none;
        display: inline-block;
        width: 100%;
    }
    li {
        padding: 0.5rem 0;
        margin: 0;
        display: inline-block;
        width: 100%;
        h3 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1rem;
            margin: 0;
        }
        time {
            color: rgba(0, 0, 0, 0.5);
            font-family: Arial, Helvetica, sans-serif;
        }
    }
`;
