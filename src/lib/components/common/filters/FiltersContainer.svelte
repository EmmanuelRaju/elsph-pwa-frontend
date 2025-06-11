<script lang="ts">
	let { children } = $props();
</script>

<div class="bg-black p-6">
	{@render children()}
</div>
