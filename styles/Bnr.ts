import { createGlobalStyle } from 'styled-components';

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

export { BnrPageStyle };
