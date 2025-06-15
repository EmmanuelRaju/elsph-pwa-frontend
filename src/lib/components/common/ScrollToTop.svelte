<script lang="ts">
	import { UpArrow } from '$lib/assets/icons';
	import { showScrollToTop } from '$lib/stores/show-scroll-to-top';
	import { onMount } from 'svelte';

	onMount(() => {
		const handleScroll = () => {
			$showScrollToTop = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check on load

		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if $showScrollToTop}
	<button
		type="button"
		class="fixed bottom-[86px] right-[10px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-lg md:right-[30px]"
		onclick={scrollToTop}
		aria-label="Scroll to top"
	>
		<UpArrow />
	</button>
{/if}
