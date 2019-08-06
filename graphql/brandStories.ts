export async function brandStories(
    parent: any,
    args: any,
    context: any,
    info: any
) {
    const json = await fetch(
        `${process.env.PROXY}/brandstories/-/${args.id}/-`
    ).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`${res.status}`);
        }
    });

    return [json];
}
