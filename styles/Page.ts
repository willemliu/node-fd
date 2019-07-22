import styled from 'styled-components';

const PageStyle = styled.div`
    display: flex;
    flex-direction: column;
    .body {
        display: flex;
        @media only screen and (max-width: 860px) {
            flex-direction: column;
        }
    }

    header {
        a {
            margin-right: 1rem;
        }
    }

    main {
        flex: 1 1 auto;
        margin-right: 1rem;
    }
    aside {
        flex: 1 0 300px;
    }
`;

export { PageStyle };
