import * as urls from './urls.mjs';
import * as templates from './templates.mjs';

importScripts('workbox-v3.1.0/workbox-sw.js');
workbox.setConfig({modulePathPrefix: 'workbox-v3.1.0/'});

workbox.precaching.precacheAndRoute([]);

const cacheStrategy = workbox.strategies.cacheFirst({
  cacheName: workbox.core.cacheNames.precache,
});

const apiStrategy = workbox.strategies.staleWhileRevalidate();

const streamingResponseStrategy = workbox.streams.strategy([
  () => cacheStrategy.makeRequest({request: 'partials/head.html'}),
  () => cacheStrategy.makeRequest({request: 'partials/navbar.html'}),
  async ({event, url}) => {
    if (url.pathname === '/') {
      const indexResponse = await apiStrategy.makeRequest({
        event,
        request: urls.index(),
      });
      const json = await indexResponse.json();
      const items = json.items;
      return templates.index(items);
    }

    if (url.pathname === '/about') {
      return cacheStrategy.makeRequest({request: 'partials/about.html'});
    }

    if (url.pathname.startsWith('/questions/')) {
      const questionId = url.pathname.split('/').pop();
      const questionResponse = await apiStrategy.makeRequest({
        event,
        request: urls.questions(questionId),
      });
      const json = await questionResponse.json();
      const item = json.items[0];
      return templates.question(item);
    }

    return `<div>Unknown URL.</div>`;
  },
  () => cacheStrategy.makeRequest({request: 'partials/foot.html'}),
]);

workbox.routing.registerRoute(
  new workbox.routing.NavigationRoute(streamingResponseStrategy)
);

workbox.routing.registerRoute(
  new RegExp('https://www\.gravatar\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'profile-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
      new workbox.expiration.Plugin({maxEntries: 10}),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://i\.stack\.imgur\.com'),
  workbox.strategies.cacheFirst({
    cacheName: 'imgur-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
      new workbox.expiration.Plugin({maxEntries: 10}),
    ],
  })
);

workbox.skipWaiting();
workbox.clientsClaim();
