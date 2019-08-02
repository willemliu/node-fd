export async function audios(parent: any, args: any, context: any, info: any) {
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
    json.playerview.articleId = parent ? parent.articleview.article.id : '';
    return [json];
}
