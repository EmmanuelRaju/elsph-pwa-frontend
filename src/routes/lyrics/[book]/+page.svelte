<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

{#await data.bookData}
	loading
{:then songs}
	<main class="">
		<Hero title={data.book?.name || 'Lyrics'} classes={{ title: 'text-[10vw] text-center' }}></Hero>
		<div class="content-bg gap-5 p-10 md:gap-10">
			<ul class="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-2">
				{#each songs as song, i (song.intSongNumber + i)}
					<li class="col-span-full text-2xl duration-200 hover:scale-110 hover:underline">
						<a href="/lyrics/{data.book?.slug}/{song.intSongNumber}" class="flex gap-2">
							<span class="text-right">{song.intSongNumber}.</span> <span>{song.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</main>
{/await}
