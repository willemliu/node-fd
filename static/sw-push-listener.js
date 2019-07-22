workbox.setConfig({ debug: false });

self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const sendNotification = (json) => {
        console.log(JSON.stringify(json, null, 2));
        return self.registration.showNotification(json.title, json.options);
    };

    if (event.data) {
        const message = event.data.text();
        event.waitUntil(sendNotification({title: message, options: {
            icon: '/static/192x192.png',
            body: message,
            actions: [{
                title: 'View in browser',
                action: 'https://persistent-component.willim.nl',
                icon: '/static/192x192.png'
            }],
        }}));
    }
});

self.addEventListener('notificationclick', (event) => {
    console.log('On notification click: ', event);
    event.notification.close();

    const url = event.notification.actions[0].action;

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then((clientList) => {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === url && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(url);
        }
    }));
});
