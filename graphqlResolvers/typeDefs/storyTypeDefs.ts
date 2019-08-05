export const storyTypeDefs = `
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
