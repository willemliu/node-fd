import styled, { createGlobalStyle } from 'styled-components';

const BnrPageStyle = createGlobalStyle`
html {
    background-color: rgba(0, 0, 0, 0.1);
}

.body {
    margin: .5rem;
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

    h1,
    .article-body,
    p {
        font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
        font-size: 2rem;
    }
    img {
        max-width: 100%;
    }
`;

export { BnrPageStyle, StyledH2, StyledAnchor, CardSection, StyledArticle };
