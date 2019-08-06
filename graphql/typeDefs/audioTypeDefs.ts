import { gql } from 'apollo-boost';

export const audioTypeDefs = gql`
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
