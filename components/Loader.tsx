import styled from 'styled-components';

export default () => {
    return <StyledLoader />;
};

const StyledLoader = styled.div`
    display: inline-block;
    position: fixed;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    z-index: 2;
    &:after {
        content: ' ';
        box-sizing: border-box;
        display: block;
        width: 60px;
        height: 60px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid rgba(0, 0, 0, 1);
        border-color: rgba(255, 210, 0, 1) transparent rgba(255, 210, 0, 1)
            transparent;
        animation: dual-ring 1.2s linear infinite;
    }
    @keyframes dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
