<script lang="ts">
  export let src: string =
    // eslint-disable-next-line max-len
    "https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5c/11/ff/5c11ff83-95a3-3db7-698a-5e1d692415b8/SQEX-10850_3000x3000.jpg/640x640bb.jpeg";
  export let alt = "no description";
  export let size = 10;
</script>

<img {src} {alt} class="h-{size} w-{size} inline rounded" />
