import { gql } from 'apollo-server-micro';

export const GraphQLTypeDefs = gql`
    type Query {
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
    """
    Story object
    """
    type Story {
        analyticsInfo: AnalyticsInfo
        articleview: Articleview
        audios: [Audio!]!
    }
    """
    The viewmodel of an article.
    It contains an Article
    """
    type Articleview {
        """
        Article representation
        """
        article: Article
    }
    """
    Object representing an article
    """
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
    """
    Audio object.
    It contains a playerview object
    """
    type Audio {
        playerview: PlayerView
    }
    """
    Playerview object with all the information about the audio fragment
    """
    type PlayerView {
        audioUrl: String
        articleId: Int
        shareDescription: String
        shareImageUrl: String
        title: String
        publicationUrl: String
    }
`;
