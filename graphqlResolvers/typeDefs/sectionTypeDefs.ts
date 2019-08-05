export const sectionTypeDefs = `
"""
Section object.
"""
type HomeSection {
    editorsPickModel: TeaserList!
    specialTeasersModel: TeaserList!
    brandstoriesTeaserModel: TeaserList!
    newsFragmentsModel: NewsFragments!
    homeLatestPodcastModel: LatestPodcasts!
}

type TeaserList {
    teasers: [Teaser!]!
}

"""
Teaser object.
"""
type Teaser {
    id: ID!
    title: String
    intro: String
    publicationUrl: String
    prefix: String
    category: String
    socialMediaDescription: String
    socialMediaTitle: String
    shareUrl: String
    tags: [Tag]!
    publicationDate: Int
    shortTime: String
    newWindow: Boolean
    read: Boolean
    shortArticle: Boolean
    state: String
    relatedArticles: [Teaser]
    articleType: String
    sourceDisplayName: String
    matchedQueriesAsString: String
    meta: String
    shortArticleContent: String
    picture: Picture
    detailPicture: String
    countInlinePictures: Int
    thirdParty: Boolean
    audio: Boolean
    audioId: Int
    sponsors: [Teaser]
    rubric: String
    genre: String
    programType: String
    programTitle: String
    brandSponsor: Boolean
    sponsorTitle: String
    sponsorContent: String
    durationInMinutes: Int
    authorInfos: String
    photoSeries: Boolean
}

type Tag {
    name: String
    directory: String
    type: String
    typename: String
}

type Picture {
    caption: String
    photographer: String
    alignment: String
    imageBaseUrl: String
    imageUrlSmall: String
    imageUrlMedium: String
    imageUrlLarge: String
    cssClass: String
    resolutionSmall: PictureResolution
    resolutionMedium: PictureResolution
    resolutionLarge: PictureResolution
    aligned: String
}

type PictureResolution {
    width: Int
    height: Int
    quality: Float
}

type NewsFragments {
    teaserFragment1: Teaser!
    teaserFragment2: Teaser!
    teaserFragment3: Teaser!
}

type LatestPodcasts {
    teasers: [Teaser!]!
}
`;
