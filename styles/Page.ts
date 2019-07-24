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

    .ripple {
        position: relative;
        overflow: hidden;
        .ink {
            display: block;
            position: absolute;
            background: inherit;
            filter: invert(1);
            opacity: 0.2;
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

export { PageStyle };
