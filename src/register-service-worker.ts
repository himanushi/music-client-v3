/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */

// ref: https://github.com/facebook/create-react-app/blob/v3.4.4/packages/cra-template-typescript/template/src/serviceWorker.ts

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/u
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export const register = (config?: Config) => {

  if ("serviceWorker" in navigator) {

    const publicUrl = new URL(window.location.href);
    if (publicUrl.origin !== window.location.origin) {

      return;

    }

    window.addEventListener("load", () => {

      const swUrl = "/service-worker.js";

      if (isLocalhost) {

        checkValidServiceWorker(swUrl, config);

      } else {

        registerValidSW(swUrl, config);

      }

    });

  }

};

const registerValidSW = (swUrl: string, config?: Config) => {

  navigator.serviceWorker.
    register(swUrl).
    then((registration) => {

      registration.onupdatefound = () => {

        const installingWorker = registration.installing;
        if (installingWorker === null) {

          return;

        }
        installingWorker.onstatechange = () => {

          if (installingWorker.state === "installed") {

            if (navigator.serviceWorker.controller) {

              if (config && config.onUpdate) {

                config.onUpdate(registration);

              }

            } else if (config && config.onSuccess) {

              config.onSuccess(registration);

            }

          }

        };

      };

    }).
    catch((error) => {

      console.error("Service Worker 登録エラー", error);

    });

};

const checkValidServiceWorker = (swUrl: string, config?: Config) => {

  // Service Worker ファイルの存在チェック
  fetch(swUrl, { headers: { "Service-Worker": "script" } }).
    then((response) => {

      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        contentType !== null && contentType.indexOf("javascript") === -1
      ) {

        navigator.serviceWorker.ready.then((registration) => {

          registration.unregister().then(() => {

            window.location.reload();

          });

        });

      } else {

        registerValidSW(swUrl, config);

      }

    }).
    catch(() => {

      console.log(
        "インターネットに接続されていません。アプリはオフラインモードで動作しています。"
      );

    });

};

export const unregister = () => {

  if ("serviceWorker" in navigator) {

    navigator.serviceWorker.ready.
      then((registration) => {

        registration.unregister();

      }).
      catch((error) => {

        console.error(error.message);

      });

  }

};
