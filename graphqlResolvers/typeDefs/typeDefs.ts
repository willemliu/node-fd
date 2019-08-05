import { gql } from 'apollo-server-micro';
import { typeDefs as storyTypeDefs } from './storyTypeDefs';
import { typeDefs as sectionTypeDefs } from './sectionTypeDefs';

export const typeDefs = gql`
    type Query {
        """
        Fetch home page
        """
        home: HomeSection
        """
        Fetch article with given ID
        """
        articles(id: ID!): [Story!]!
        """
        Fetch audio with given audio ID and article ID
        """
        audios(audioId: ID!, articleId: ID!): [Audio!]!
        """
        Fetch brandstory with given ID
        """
        brandStories(id: ID!): [Story!]!
    }

    ${storyTypeDefs}

    ${sectionTypeDefs}
`;
