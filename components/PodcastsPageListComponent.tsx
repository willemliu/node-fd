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
                    return (
                        <li key={item.id} className="ripple" onClick={ripple}>
                            <Link
                                href={`/podcast?podcastUrl=${item.publicationUrl}`}
                                as={item.publicationUrl}
                                prefetch={true}
                                passHref={true}
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
    flex: 1 1 auto;
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
    }
    figure {
        float: left;
        margin: 0;
        img {
            display: block;
            width: 96px;
        }
    }
    li {
        position: relative;
        padding: 0;
        margin: 0 0 0.5rem 0;
        overflow: hidden;
        box-sizing: content-box;
        box-shadow: 0 2px 0.2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        background-color: white;
        section {
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
    }
`;
