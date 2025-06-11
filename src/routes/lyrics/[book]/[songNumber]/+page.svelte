<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	let { data } = $props();
	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main class="">
	<Hero title="Lyrics"></Hero>

	<div class="content-bg gap-5 p-10 md:gap-10">
		<div class="mx-auto flex max-w-max flex-col gap-5 text-center">
			<h2 class="text-4xl underline">{data.song.intSongNumber}. {data.song.title}</h2>
			<div class="text-2xl">
				{#if data.book?.slug === 'youth-songs-english'}
					{@html data.song.data}
				{:else}
					{@html data.song.lang}
				{/if}
			</div>
		</div>
	</div>
</main>
