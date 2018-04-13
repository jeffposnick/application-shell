import * as templates from './templates.mjs';
import * as urls from './urls.mjs';
import router from './router.mjs';
import routes from './routes.mjs';
import partials from './partials.mjs';

importScripts('workbox-v3.1.0/workbox-sw.js');
workbox.setConfig({modulePathPrefix: 'workbox-v3.1.0/'});

workbox.precaching.precacheAndRoute([]);

const cacheStrategy = workbox.strategies.cacheFirst({
  cacheName: workbox.core.cacheNames.precache,
});

const apiStrategy = workbox.strategies.staleWhileRevalidate({
  cacheName: 'api-cache',
});

const streamingResponseStrategy = workbox.streams.strategy([
  () => cacheStrategy.makeRequest({request: partials.HEAD}),
  () => cacheStrategy.makeRequest({request: partials.NAVBAR}),
  async ({event, url}) => {
    const route = router(url.pathname);
    if (route === routes.INDEX) {
      const tag = 'service-worker';
      const listResponse = await apiStrategy.makeRequest({
        event,
        request: urls.listQuestionsForTag(tag),
      });
      const json = await listResponse.json();
      const items = json.items;
      return templates.list(tag, items);
    }

    if (route === routes.ABOUT) {
      return cacheStrategy.makeRequest({request: partials.ABOUT});
    }

    if (route === routes.QUESTIONS) {
      const questionId = url.pathname.split('/').pop();
      const questionResponse = await apiStrategy.makeRequest({
        event,
        request: urls.getQuestion(questionId),
      });
      const json = await questionResponse.json();
      const item = json.items[0];
      return templates.question(item);
    }

    return `<p>${url} couldn't be handled by the service worker.</p>`;
  },
  () => cacheStrategy.makeRequest({request: partials.FOOT}),
]);

workbox.routing.registerRoute(
  new workbox.routing.NavigationRoute(streamingResponseStrategy)
);

// Gravatar images support CORS, so we won't be storing opaque responses.
workbox.routing.registerRoute(
  new RegExp('https://www\\.gravatar\\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'profile-images',
    plugins: [
      new workbox.expiration.Plugin({maxEntries: 50}),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^https://.*(?:\\.jpg|\\.png)'),
  workbox.strategies.cacheFirst({
    cacheName: 'other-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
      new workbox.expiration.Plugin({maxEntries: 10}),
    ],
  })
);

workbox.skipWaiting();
workbox.clientsClaim();
