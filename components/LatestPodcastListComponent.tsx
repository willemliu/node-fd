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
                                <section>
                                    <h3>{item.title}</h3>
                                    <time>
                                        Duur: {item.durationInMinutes} min
                                    </time>
                                    <h3>{item.programTitle}</h3>
                                </section>
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
    h1 {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin: 0.5rem 0;
    }
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    figure {
        float: left;
        margin: 0;
        img {
            width: 96px;
        }
    }
    a {
        color: inherit;
        text-decoration: none;
        display: inline-block;
        width: 100%;
    }
    li {
        flex: 1 1 100%;
        @media only screen and (min-width: 1024px) {
            flex: 0 1 calc(50% - 0.25rem);
        }
        padding: 0;
        margin: 0 0 0.5rem 0;
        overflow: hidden;
        box-sizing: content-box;
        box-shadow: 0 2px 0.2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        background-color: white;
        > a {
            display: flex;
            height: 96px;
        }
        section {
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        h3 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1rem;
            margin: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        time {
            color: rgba(0, 0, 0, 0.5);
            font-family: Arial, Helvetica, sans-serif;
        }
    }
`;
