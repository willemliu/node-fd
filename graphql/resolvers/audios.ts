import { graphqlResolverAuthorized } from '../../utils/authorization';

export async function audios(parent: any, args: any, context: any, info: any) {
    // We do authorization checks in resolver so we can manage access per resolver.
    graphqlResolverAuthorized(context.user.authorization);
    const json = await fetch(
        `${process.env.PROXY}/player/audio/${
            args.audioId ? args.audioId : parent.analyticsInfo.audioId
        }/${args.articleId ? args.articleId : parent.articleview.article.id}`
    ).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`${res.status}`);
        }
    });
    json.playerview.publicationUrl = parent
        ? parent.articleview.article.publicationUrl
        : '';
    json.playerview.articleId = parent
        ? parent.articleview.article.id
        : args.articleId;
    return [json];
}
