<script lang="ts">
  import "./tailwind-styles.svelte";
  import Text from "./bits/text.svelte";

  import Button from "./components/button.svelte";

  const text = "world";
</script>

<Text {text} />

<Button />
