import { gql } from 'apollo-boost';

export const storyTypeDefs = gql`
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
`;
