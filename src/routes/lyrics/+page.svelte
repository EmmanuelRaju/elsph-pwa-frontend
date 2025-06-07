<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import { booksData } from '$lib/data/song-lyrics/books';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main class="">
	<Hero title="Lyrics"></Hero>

	<div class="content-bg gap-5 p-10 md:gap-10">
		<ul class="flex flex-wrap gap-10">
			{#each booksData as book}
				{@render bookCard(book)}
			{/each}
		</ul>
	</div>
</main>

{#snippet bookCard(props: { slug: string; name: string; icon: any })}
	<li
		class="group flex-1 shrink-0 place-content-center rounded-[40px] border bg-white px-5 py-10 shadow-xl duration-200 hover:scale-110 hover:invert"
	>
		<a href="/lyrics/{props.slug}" class="flex flex-col items-center justify-center gap-10">
			<div class="size-40 duration-1000">
				<props.icon></props.icon>
			</div>
			<p class="text-center text-2xl font-semibold leading-5">{props.name}</p>
		</a>
	</li>
{/snippet}
