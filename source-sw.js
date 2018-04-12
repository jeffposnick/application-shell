importScripts('workbox-v3.0.1/workbox-sw.js');
workbox.setConfig({modulePathPrefix: 'workbox-v3.0.1/'});

workbox.precaching.precacheAndRoute([]);

// const navigationHandler = async ({event, request, url}) => {
//   return 'hi';
// };
// workbox.routing.registerRoute(new workbox.routing.NavigationRoute(navigationHandler));

workbox.routing.registerRoute(
  new RegExp('https://www\.gravatar\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'profile-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]}),
      new workbox.expiration.Plugin({maxEntries: 50}),
    ],
  })
);
