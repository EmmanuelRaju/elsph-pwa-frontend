<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import StackedCards from '$lib/components/common/StackedCards.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main>
	<Hero title="Emmanuel"></Hero>
	<!-- <StackedCards></StackedCards> -->
</main>
