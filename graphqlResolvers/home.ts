export async function home(parent: any, args: any, context: any, info: any) {
    const json = await fetch(`${process.env.PROXY}`).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`${res.status}`);
        }
    });
    return json;
}
