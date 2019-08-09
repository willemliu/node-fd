import { gql } from 'apollo-server-micro';
import { storyTypeDefs } from './storyTypeDefs';
import { sectionTypeDefs } from './sectionTypeDefs';
import { audioTypeDefs } from './audioTypeDefs';

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

    ${audioTypeDefs}

    ${storyTypeDefs}

    ${sectionTypeDefs}

    type Mutation {
        """
        Validate one-time-use token. Given token will be invalidated.
        """
        validateToken(token: String): Boolean
    }
`;
