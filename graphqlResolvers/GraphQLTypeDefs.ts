import { gql } from 'apollo-server-micro';

export const GraphQLTypeDefs = gql`
    type Query {
        articles(id: ID!): [Story!]!
        audios(audioId: ID!, articleId: ID!): [Audio!]!
        brandStories(id: ID!): [Story!]!
    }
    type Story {
        analyticsInfo: AnalyticsInfo
        articleview: Articleview
        audios: [Audio!]!
    }
    type Articleview {
        article: Article
    }
    type Article {
        id: Int
        title: String
        intro: String
        content: String
        publicationUrl: String
    }
    type AnalyticsInfo {
        audioId: String
    }
    type Audio {
        playerview: PlayerView
    }
    type PlayerView {
        audioUrl: String
        articleId: Int
        shareDescription: String
        shareImageUrl: String
        title: String
        publicationUrl: String
    }
`;
