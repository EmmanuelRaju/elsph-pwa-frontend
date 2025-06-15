<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';

	export let title: string,
		classes: {
			container?: string;
			title?: string;
		} = { container: '', title: '' };

	let heroRef: HTMLElement;
	let textRef: HTMLElement;

	function updateShadow(event: MouseEvent) {
		const { clientX, clientY } = event;
		const { width, height, left, top } = heroRef.getBoundingClientRect();

		// Get the center of the text area
		const centerX = left + width / 2;
		const centerY = top + height / 2;

		// Calculate offsets based on mouse position
		const x = clientX - centerX;
		const y = clientY - centerY;

		// Invert shadow movement (moves away from mouse)
		const depth = 100; // Adjust this for stronger/weaker effect
		const shadowX = -(x / width) * depth;
		const shadowY = -(y / height) * depth * 1.5; // More downward pull

		// Adjust opacity for depth illusion
		const opacity = Math.min(0.8, Math.abs(y) / height + 0.3);

		// Apply GSAP for smooth effect
		gsap.to(textRef, {
			textShadow: `${shadowX}px ${shadowY}px 20px rgba(0,0,0,${opacity})`,
			duration: 0.2,
			ease: 'power2.out'
		});
	}

	onMount(() => {
		if (document) {
			document.addEventListener('mousemove', updateShadow);
		}
	});

	onDestroy(() => {
		if (document) {
			document.removeEventListener('mousemove', updateShadow);
		}
	});
</script>

<section
	bind:this={heroRef}
	class="hero flex min-h-[30vh] w-full items-center justify-center overflow-hidden {classes.container}"
>
	<h1
		bind:this={textRef}
		class="hero-text text-7xl font-black uppercase leading-none text-black md:text-9xl {classes.title}"
	>
		{title}
	</h1>
</section>

<style>
	.hero-text {
		/* position: relative; */
		text-shadow: 0px 30px 20px rgba(0, 0, 0, 0.9);
		transition: text-shadow 0.1s ease-out;
	}
</style>
