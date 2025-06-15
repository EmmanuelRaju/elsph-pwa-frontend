<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { PageLoader } from '$lib/components/common';
	import Menu from '$lib/components/common/Menu.svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';
	import { onMount } from 'svelte';
	import MusicPlayer from '$lib/components/common/MusicPlayer.svelte';
	import ScrollToTop from '$lib/components/common/ScrollToTop.svelte';

	let { children } = $props();
	// onMount(() => {
	// 	const lenis = new Lenis({
	// 		autoRaf: true
	// 	});
	// });
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Darker+Grotesque:wght@300..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if browser}
	<header class="fixed inset-x-0 flex justify-between p-3">
		<a
			href="/"
			class="logo fixed left-5 z-50 size-[60px] content-center rounded-full bg-white p-2 duration-300 hover:invert"
		>
			<p class="text-base font-bold drop-shadow-xl">ELSPH</p>
		</a>
		<Menu />
	</header>
{/if}

<ParaglideJS {i18n}>
	<PageLoader />
	{@render children()}
</ParaglideJS>

<footer class="mt-5 p-10 pb-20">
	<p class="text-center text-xl font-medium">&copy; 2025 ELSPH. All rights reserved.</p>
</footer>
<MusicPlayer />
<ScrollToTop></ScrollToTop>
