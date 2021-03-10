import App from "./app.svelte";

const app = new App({
  "target": document.body
});

export default app;

/*
 * Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 * Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
 */
const meta = import.meta as any;
if (meta.hot) {

  meta.hot.accept();
  meta.hot.dispose(() => {

    app.$destroy();

  });

}
