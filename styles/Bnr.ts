import styled, { createGlobalStyle } from 'styled-components';

const BnrPageStyle = createGlobalStyle`
html {
    background-color: rgba(0, 0, 0, 0.1);
}

.body {
    margin: .5rem;
}

header {
    position: sticky;
    top: 0;
    height: 60px;
    background-color: black;
    display: flex;
    align-items: center;
    a {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
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
`;

const StyledAnchor = styled.a`
    color: inherit;
    text-decoration: none;
    display: inline-block;
    width: 100%;
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

export { BnrPageStyle, StyledH2, StyledAnchor, CardSection };
