/**
 * FirefoxがあまりにもServiceWorkerダメなので、あきらめた
 * 再実装するときは、CacheExpirationを一切使わずにやること
 * CacheExpirationとExpirationPluginの併用が一番ダメっぽい
 *
 */

(function () {
  /*
  キャッシュまわりはこれを使うべし
  Workbox  |  Google Developers
  https://developers.google.com/web/tools/workbox/
  */

  "use strict";

  const CACHE_VERSION = 28;
  const OFFLINE_URL = "/serviceWorkerOffline.html";
  const MANIFEST_START_URL = "/?utm_medium=pwa&utm_source=pwa_homescreen";

  // cache bins currently using
  const validCacheNames = [];

  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
  );

  if (!workbox) {
    console.error("workbox not present!");
    return;
  }

  // workbox.*の前にsetConfig必要
  //workbox.setConfig({ debug: true });
  workbox.setConfig({ debug: false });

  //console.log('using workbox');

  workbox.loadModule("workbox-routing");
  const { registerRoute } = workbox.routing;

  workbox.loadModule("workbox-strategies");
  const { NetworkFirst, StaleWhileRevalidate, NetworkOnly } =
    workbox.strategies;

  // 使ってないけど使うべきだよな
  //workbox.loadModule('workbox-cacheable-response');
  //const {CacheableResponsePlugin} = workbox.cacheableResponse;

  // 2つそれぞれ必要
  workbox.loadModule("workbox-expiration");
  const { ExpirationPlugin, CacheExpiration } = workbox.expiration;

  // ExpirationPluginとCacheExpirationで使うデフォルトオプション
  const expirationDefaultSettings = {
    // Keep at most 200 entries.
    maxEntries: 200,
    //  maxEntries: 5,
    // Cache for a maximum of 4 weeks.
    maxAgeSeconds: 86400 * 30,
    //  maxAgeSeconds: 60,
    // Automatically cleanup if quota is exceeded.
    purgeOnQuotaError: true,
  };

  workbox.loadModule("workbox-precaching");
  const { precacheAndRoute, PrecacheFallbackPlugin } = workbox.precaching;

  let cacheName;

  // Enable Offline Google Analytics
  workbox.googleAnalytics.initialize();

  // ファーストパーティrouting判定正規表現の基本（ただしCDNあり）
  const regExpisFirstPartyHost = new RegExp(
    "^" + location.host.replace(/^([^.]+)/, "$1(?:-cdn)?") + "$"
  );

  let isRequestCacheable = function (url, event) {
    return (
      url.hostname.match(regExpisFirstPartyHost) &&
      event.request.method.toLowerCase() == "get" &&
      !(event.request.cache && event.request.cache == "no-cache")
    );
  };

  // precacheAndRoute()はregisterRoute()の前に呼ぶこと
  precacheAndRoute(
    [
      {
        url: OFFLINE_URL,
        revision: 28,
      },
      {
        url: MANIFEST_START_URL,
        revision: 28,
      },
    ],
    {
      // Ignore all URL parameters.
      ignoreURLParametersMatching: [/.*/],
    }
  );
  registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkOnly({
      plugins: [
        new PrecacheFallbackPlugin({
          fallbackURL: OFFLINE_URL,
        }),
      ],
    })
  );

  // HTML
  cacheName = "html-cache-" + CACHE_VERSION;
  validCacheNames.push(cacheName);
  registerRoute(
    ({ url, event }) => {
      return isRequestCacheable(url, event) && url.pathname.match(/\.html?$/);
    },
    //	  new StaleWhileRevalidate({
    new NetworkFirst({
      // Use a custom cache name.
      cacheName: cacheName,
      plugins: [new ExpirationPlugin(expirationDefaultSettings)],
    })
  );

  // CSS
  cacheName = "css-cache-" + CACHE_VERSION;
  validCacheNames.push(cacheName);
  registerRoute(
    ({ url, event }) => {
      return isRequestCacheable(url, event) && url.pathname.match(/\.css?$/);
    },
    new StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: cacheName,
      plugins: [new ExpirationPlugin(expirationDefaultSettings)],
    })
  );

  // JS
  cacheName = "js-cache-" + CACHE_VERSION;
  validCacheNames.push(cacheName);
  registerRoute(
    ({ url, event }) => {
      return isRequestCacheable(url, event) && url.pathname.match(/\.js?$/);
    },
    new StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: cacheName,
      plugins: [new ExpirationPlugin(expirationDefaultSettings)],
    })
  );

  // FONT
  cacheName = "font-cache-" + CACHE_VERSION;
  validCacheNames.push(cacheName);
  registerRoute(
    ({ url, event }) => {
      return (
        isRequestCacheable(url, event) &&
        url.pathname.match(/\.(woff|woff2|eot|ttf)?$/)
      );
    },
    new StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: cacheName,
      plugins: [new ExpirationPlugin(expirationDefaultSettings)],
    })
  );

  // IMAGE
  cacheName = "image-cache-" + CACHE_VERSION;
  validCacheNames.push(cacheName);
  registerRoute(
    ({ url, event }) => {
      return (
        isRequestCacheable(url, event) &&
        url.pathname.match(/\.(?:png|jpe?g|svg|gif|webp|ico)?$/)
      );
    },
    // Use the cache if it's available.
    new StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: cacheName,
      plugins: [new ExpirationPlugin(expirationDefaultSettings)],
    })
  );

  /**
   * installイベント
   */
  self.addEventListener("install", (event) => {
    console.info("service worker installed");
    event.waitUntil(self.skipWaiting().then(function () {}));
  });

  /**
   * activateイベント
   */
  self.addEventListener("activate", async (event) => {
    console.info("service worker activated");

    event.waitUntil(
      // 旧バージョンのキャッシュをbinごと削除
      caches
        .keys()

        .then(function (wbCacheNames) {
          //console.log('validCacheNames', validCacheNames);
          //console.log('deleting old cache bins');
          return Promise.all(
            wbCacheNames.map(function (wbCacheName) {
              return new Promise(function (resolve, reject) {
                //console.log('checking cache bin: ' + wbCacheName);
                if (
                  validCacheNames.includes(wbCacheName) ||
                  wbCacheName.match(/^workbox-googleAnalytics-/) ||
                  wbCacheName.match(/^workbox-precache-/)
                ) {
                  // スルーだけどPromise.allだからねresolveしとかなきゃね
                  resolve(wbCacheName);
                } else {
                  console.info("CacheExpiration: " + wbCacheName);
                  // ExpirationPlugin.deleteCacheAndMetadata()は
                  // registerRoute()で使ったインスタンスじゃないと使えないので
                  // ここではCacheExpiration.delete()とcaches.delete()を使う
                  // CacheExpiration.expireEntries()だとFirefoxでダメ
                  new CacheExpiration(wbCacheName, {
                    matchOptions: {
                      cacheName: wbCacheName,
                    },
                  })
                    .delete()

                    .then(function () {
                      console.info("caches.delete: " + wbCacheName);
                      return caches.delete(wbCacheName);
                    })

                    .then(function () {
                      console.info(
                        "deleted cache bin and indexedDB: " + wbCacheName
                      );
                      resolve(wbCacheName);
                    })

                    .catch(function (error) {
                      reject(error);
                    });
                }
              }); // return Promise
            })
          ); // return Promise.all
        }) // .then

        .then(function () {
          console.log("clients.claim");
          return self.clients.claim();
        })

        .then(function () {
          console.log("done done");
        })
    );
  });
})();
