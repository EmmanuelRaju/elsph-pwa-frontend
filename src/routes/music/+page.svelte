<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import musicData from '$lib/data/music.json';
	import MusicCard from '$lib/components/common/MusicCard.svelte';
	import { currentTrack } from '$lib/stores/player';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main class="">
	<Hero title="Music"></Hero>

	<div class="content-bg grid grid-cols-12 gap-5 p-10 md:gap-10">
		{#each musicData as item}
			<MusicCard
				track={item}
				classes="col-span-full sm:col-span-6 lg:col-span-4 {$currentTrack?.id === item.id
					? 'invert'
					: ''}"
			></MusicCard>
		{/each}
	</div>
</main>
