<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import { booksData } from '$lib/data/song-lyrics/books';
	import Select from '$lib/components/common/filters/Select.svelte';
	import FiltersContainer from '$lib/components/common/filters/FiltersContainer.svelte';
	import type { TSong } from '$lib/models';
	import Search from '$lib/components/common/filters/Search.svelte';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});

	const bookOptions = booksData.map((it) => ({
		label: it.name,
		value: it.slug
	}));

	let _book = $state(bookOptions[0].value);

	let selectedBook = $derived.by(() => {
		return booksData.find((it) => it.slug === _book);
	});

	const allComponents = import.meta.glob('/**/data/song-lyrics/**/*.json');

	const lyricBooks = Object.entries(allComponents);

	const getBookData = async (filename: string) => {
		try {
			const item = lyricBooks.find(([_path]) => {
				return _path.includes(`${filename}`);
			});
			if (item) {
				const module = await allComponents[item[0]]();
				//@ts-expect-error As we are importing svelte component, there will be default
				return module.default;
			}
		} catch (error) {
			console.error(`Unable to dynamically import ${filename}`, error);
		}
	};

	let songs: TSong[] = $state([]);
	let _songs: TSong[] = $state([]);
	let searchQuery = $state('');

	$effect(() => {
		if (selectedBook) {
			getBookData(selectedBook?.fileName).then((data) => {
				songs = data;
				_songs = data;
			});
		}
	});

	const searchSongs = () => {
		if (searchQuery.trim() !== '') {
			const lowerCaseQuery = searchQuery.toLowerCase();
			songs = _songs.filter(
				(song) =>
					song.title.toLowerCase().includes(lowerCaseQuery) ||
					song.intSongNumber.toString().includes(lowerCaseQuery)
			);
		} else {
			songs = _songs; // Reset to original songs if search query is empty
		}
	};
</script>

<main class="">
	<Hero title="Lyrics"></Hero>

	<FiltersContainer>
		<div class="mx-auto flex max-w-4xl gap-5">
			<Select
				options={bookOptions}
				id="book"
				name="book"
				bind:value={_book}
				label="Select Book"
				classes={{ container: 'max-w-max' }}
			></Select>
			<Search
				id="search-song"
				name="search"
				bind:value={searchQuery}
				label="Search"
				on:input={searchSongs}
				placeholder="Search by song number or title"
			></Search>
		</div>
	</FiltersContainer>
	<div class="content-bg flex flex-col gap-5 p-10 md:gap-10">
		{#if searchQuery}
			<p class="text-center text-3xl font-medium">Searching for "{searchQuery}"</p>
		{/if}
		<ul class="mx-auto grid max-w-max grid-cols-12 gap-x-6 gap-y-2">
			{#each songs as song, i (song.intSongNumber + i)}
				<li class="col-span-full text-2xl duration-200 hover:scale-110 hover:underline">
					<a href="/lyrics/{selectedBook!.slug}/{song.intSongNumber}" class="flex gap-2">
						<span class="text-right">{song.intSongNumber}.</span> <span>{song.title}</span>
					</a>
				</li>
			{:else}
				<li class="col-span-full text-center text-2xl">No song found</li>
			{/each}
		</ul>
	</div>
</main>
