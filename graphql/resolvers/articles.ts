import { graphqlResolverAuthorized } from '../../utils/authorization';

export async function articles(
    parent: any,
    args: any,
    context: any,
    info: any
) {
    // We do authorization checks in resolver so we can manage access per resolver.
    graphqlResolverAuthorized(context.user.authorization);
    const json = await fetch(`${process.env.PROXY}/-/${args.id}/-`).then(
        (res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        }
    );

    return [json];
}
