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

.ripple {
    position: relative;
    .ink {
        display: block;
        position: absolute;
        background: rgba(0, 0, 0, 0.04);
        border-radius: 100%;
        transform: scale(0);
    }

    .animate {
        animation: ripple 0.65s linear;
    }
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
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
    height: 100%;
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
