<script lang="ts">
	let { children } = $props();
</script>

<div class="bg-black p-6 pb-8">
	{@render children()}
</div>
