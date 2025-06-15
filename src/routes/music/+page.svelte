<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { cleanFileName, hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import musicData from '$lib/data/music.json';
	import MusicCard from '$lib/components/common/MusicCard.svelte';
	import { currentTrack } from '$lib/stores/player';
	import FiltersContainer from '$lib/components/common/filters/FiltersContainer.svelte';
	import Search from '$lib/components/common/filters/Search.svelte';

	let songs: { name: string; id: string }[] = $state(musicData);
	let _songs: { name: string; id: string }[] = $state(musicData);
	let searchQuery = $state('');

	const searchSongs = () => {
		if (searchQuery.trim() !== '') {
			const lowerCaseQuery = searchQuery.toLowerCase();
			songs = _songs.filter((song) =>
				cleanFileName(song.name).toLowerCase().includes(lowerCaseQuery)
			);
		} else {
			songs = _songs; // Reset to original songs if search query is empty
		}
	};

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<svelte:head>
	<title>ELSPH | Music</title>
	<meta name="description" content="Audio songs and messages" />
	<meta property="og:title" content="ELSPH | Music" />
	<meta property="og:description" content="Audio songs and messages" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:url" content="https://elshaddaiprayerhouse.in/music" />
</svelte:head>

<main class="">
	<Hero title="Music"></Hero>

	<FiltersContainer>
		<div class="mx-auto flex max-w-6xl gap-5">
			<!-- <Select
				options={bookOptions}
				id="book"
				name="book"
				bind:value={_book}
				label="Select Book"
				classes={{ container: 'max-w-max' }}
			></Select> -->
			<Search
				id="search-song"
				name="search"
				bind:value={searchQuery}
				label="Search"
				on:input={searchSongs}
				placeholder="Search by name"
			></Search>
		</div>
	</FiltersContainer>

	<div class="content-bg flex flex-col gap-5 p-10 md:gap-10">
		{#if searchQuery}
			<p class="text-center text-3xl font-medium">Searching for "{searchQuery}"</p>
		{/if}
		<div class="mx-auto grid max-w-7xl grid-cols-12 gap-5 md:gap-10">
			{#each songs as item}
				<MusicCard
					track={item}
					classes="col-span-full sm:col-span-6 lg:col-span-4 {$currentTrack?.id === item.id
						? 'invert'
						: ''}"
				></MusicCard>
			{:else}
				<p class="col-span-full text-center text-2xl">No song found</p>
			{/each}
		</div>
	</div>
</main>
