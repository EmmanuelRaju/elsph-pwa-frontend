<script lang="ts">
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let logoRef: HTMLDivElement, heroRef: HTMLDivElement;

	let showInkAnimation: boolean = false;

	onMount(async () => {
		try {
			const response = await hidePageLoader();
			if (response.status === 200) {
				const tl = gsap.timeline();
				// Start the animation
				tl.fromTo(
					logoRef,
					{ opacity: 0, scale: 0.5, x: '45vw', y: '45svh', delay: '0.5' },
					{
						opacity: 1,
						scale: 2,
						duration: 1,
						ease: 'power2.out',
						onComplete: () => {
							showInkAnimation = true;
						}
					}
				).to(
					logoRef,
					{
						scale: 1,
						x: '0',
						y: '0',
						duration: 2,
						ease: 'sine.out'
					},
					'+=4'
				);
			}
		} catch (error) {
			console.error('Error while hiding page loader', error);
		}
	});
</script>

<section class="overflow-clip">
	<div class="banner text-white" class:ink-animation={showInkAnimation} bind:this={heroRef}>
		<div bind:this={logoRef} class="fixed left-5 top-5">
			<p class="font-accent text-3xl font-bold">ELSPH</p>
		</div>
	</div>
</section>

<style lang="postcss">
	.banner {
		@apply relative flex h-screen items-center justify-center;
	}
</style>
