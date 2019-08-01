import styled, { createGlobalStyle } from 'styled-components';

const BnrPageStyle = createGlobalStyle`
html {
    background-color: rgba(0, 0, 0, 0.1);
}

.body {
    margin: .5rem;
}

a {
    color: #0075b7;
}

.play-button {
        margin-right: 0.5rem;
        line-height: 0;
        .icon {
            position: relative;
            width: 16px;
            height: 16px;
            display: inline-block;
            border: 4px solid black;
            border-radius: 16px;
            background-color: #ffd200;
        }
        .icon .icon-play {
            position: absolute;
            top: 3px;
            left: 5px;
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 8px solid black;
        }
    }
`;

const StyledH2 = styled.h2`
    padding: 0.5rem 0;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0.5rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledAnchor = styled.a`
    color: inherit;
    text-decoration: none;
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const CardSection = styled.section`
    h3 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        margin: 0;
    }
    time {
        color: rgba(0, 0, 0, 0.5);
        font-family: Arial, Helvetica, sans-serif;
    }
`;

const StyledArticle = styled.article`
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 0.2px rgba(0, 0, 0, 0.1);

    .article-body {
        display: inline-block;
        width: 100%;
    }

    h1,
    .article-body,
    p {
        font-family: Arial, Helvetica, sans-serif;
    }

    p {
        color: #5f5f5f;
        line-height: 1.5;
        a {
            text-decoration: none;
        }
    }

    > p {
        font-weight: bold;
    }

    h1 {
        font-size: 2rem;
    }
    img {
        max-width: 100%;
    }

    .inline-content {
        text-decoration: none;
        &.related-link {
            padding: 0.5rem;
            background-color: #ffd200;
            border-radius: 3px;
            font-family: Arial, Helvetica, sans-serif;
            p {
                text-transform: uppercase;
                color: black;
                font-weight: bold;
                font-size: 0.8rem;
                margin: 0;
                line-height: 1.5rem;
            }
            h2 {
                color: #5f5f5f;
                font-size: 0.8rem;
                margin: 0;
                line-height: 1.5rem;
            }
        }
        &.image {
            margin: 1rem 0;
            figure {
                margin: 0;
            }
            figcaption {
                font-size: 0.7rem;
                color: #5f5f5f;
            }
        }
        &.right {
            float: right;
            width: 50%;
            box-sizing: border-box;
            margin: 1rem 0 1rem 1rem;
        }
        &.block {
            display: block;
            clear: both;
            margin: 1rem 0;
        }
    }

    .article-audio-button {
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.04);
        padding: 1rem;
    }
`;

export { BnrPageStyle, StyledH2, StyledAnchor, CardSection, StyledArticle };
