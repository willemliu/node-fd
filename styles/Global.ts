import { createGlobalStyle } from 'styled-components';
import { TeaserStyle } from '@fdmg/fd-teaser';
import { SquareTeaserStyle } from '@fdmg/fd-square-teaser';
import { OpeningTeaserStyle } from '@fdmg/fd-opening-teaser';

const GlobalStyle = createGlobalStyle`
html {
    background-color: #f1ded0;
}
.fd-card {
    margin-bottom: 1rem;
}
${OpeningTeaserStyle}
${TeaserStyle}
${SquareTeaserStyle}
`;

export { GlobalStyle };
