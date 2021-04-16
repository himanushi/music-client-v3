<script lang="ts">
let className = "";
export { className as class };
</script>

<!-- webfont 使うかもしないので text を噛ませる -->

<p class={className}><slot /></p>
