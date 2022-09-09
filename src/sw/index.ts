// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export type { };

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.registration.unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => clients.forEach((client) => client.navigate(client.url)));
});
