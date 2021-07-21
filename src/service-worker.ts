/* eslint-disable no-console */

// ref: https://qiita.com/TakeshiNickOsanai/items/8d012a128827c9db980d

// Service Worker のバージョンとキャッシュする App Shell を定義する

const CACHE_NAME = "music-client-v4-@@@@@";
const urlsToCache = [
  "./",
  "./index.js",
  "./index.css"
];

console.log(CACHE_NAME);

// Service Worker へファイルをインストール

self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );

});

// リクエストされたファイルが Service Worker にキャッシュされている場合
// キャッシュからレスポンスを返す

self.addEventListener("fetch", (event) => {

  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {

    return;

  }
  event.respondWith(
    caches.match(event.request).then((response) => {

      if (response) {

        return response;

      }
      return fetch(event.request);

    })
  );

});

// Cache Storage にキャッシュされているサービスワーカーのkeyに変更があった場合
// 新バージョンをインストール後、旧バージョンのキャッシュを削除する
// (このファイルでは CACHE_NAME をkeyの値とみなし、変更を検知している)

self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.
      keys().
      then((keys) => Promise.all(
        keys.map((key) => {

          if (!CACHE_NAME.includes(key)) {

            return caches.delete(key);

          }

          return undefined;

        })
      )
      ).
      then(() => {

        console.log(`${CACHE_NAME} : activated`);

      })
  );

});
