export let IS_SERVER = false;

export function setIsServer(isServer: boolean) {
    IS_SERVER = isServer;
}

export function getIsServer() {
    return IS_SERVER;
}
