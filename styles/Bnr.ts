import { createGlobalStyle } from 'styled-components';

const BnrPageStyle = createGlobalStyle`
html {
    background-color: rgba(0, 0, 0, 0.1);
}

header {
    background-color: black;
    a {
        font-family: Arial, Helvetica, sans-serif;
        color: white;
    }
}
`;

export { BnrPageStyle };
