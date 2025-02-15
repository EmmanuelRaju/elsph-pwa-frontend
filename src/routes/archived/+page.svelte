<script lang="ts">
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { TextPlugin } from 'gsap/TextPlugin';

	gsap.registerPlugin(TextPlugin);

	let logoRef: HTMLDivElement,
		heroRef: HTMLDivElement,
		menuRef: HTMLElement,
		promiseRef: HTMLDivElement,
		responsibilitiesRef: HTMLParagraphElement;

	let showInkAnimation: boolean = false;
	let showMenu: boolean = false;

	let isDev: boolean = false;

	const toggleMenu = () => {
		if (showMenu) {
			showMenu = false;
			gsap.to(menuRef, { text: 'MENU', duration: 1 });
		} else {
			showMenu = true;
			gsap.to(menuRef, { text: 'CLOSE', duration: 1 });
		}
	};

	onMount(async () => {
		try {
			const response = await hidePageLoader();
			if (response.status === 'success') {
				const tl = gsap.timeline({ paused: isDev });
				// Start the animation
				tl.fromTo(
					logoRef,
					{
						opacity: 0,
						scale: 0.5,
						left: '50%',
						translateX: '-50%',
						top: '50%',
						translateY: '-50%',
						delay: '0.5'
					},
					{
						opacity: 1,
						scale: 2,
						duration: 1,
						ease: 'power2.out',
						onComplete: () => {
							showInkAnimation = true;
						}
					}
				)
					.to(
						logoRef,
						{
							scale: 1,
							left: '12',
							translateX: '0',
							translateY: '0',
							top: '12',
							duration: 2,
							ease: 'power1.inOut'
						},
						'+=4'
					)
					.fromTo(
						menuRef,
						{
							xPercent: '100'
						},
						{
							opacity: 1,
							xPercent: 0,
							duration: 1,
							ease: 'back'
						},
						'<+1'
					)
					.to(promiseRef, {
						opacity: 1
					});
			}
		} catch (error) {
			console.error('Error while hiding page loader', error);
		}

		//replaces yourElement's text with "This is the new text"
		const responsiblitiesTL = gsap.timeline({ repeat: -1, defaults: { duration: 4 } });
		responsiblitiesTL
			.to(responsibilitiesRef, {
				text: 'We are called to Wrestle, Ephesians 6:12.'
			})
			.to(responsibilitiesRef, {
				text: 'We are called to Witness, Acts 1:8 .'
			})
			.to(responsibilitiesRef, {
				text: 'We are called to Worship, Psalms 95.6.'
			});
	});
</script>

<div class="relative z-[1]">
	<div bind:this={logoRef} class="fixed left-3 top-3 opacity-0">
		<p class="font-accent text-3xl font-bold text-white drop-shadow-xl">ELSPH</p>
	</div>
	<button
		bind:this={menuRef}
		class="fixed right-3 top-3 font-accent text-3xl font-bold text-white opacity-0 drop-shadow-xl"
		on:click={toggleMenu}
	>
		MENU
	</button>
</div>

<section class="overflow-clip">
	<div
		class="relative flex h-screen items-center justify-center text-white"
		class:ink-animation={showInkAnimation}
		bind:this={heroRef}
	>
		<div
			bind:this={promiseRef}
			class="mx-auto max-w-3xl p-5 text-center drop-shadow-md {isDev
				? ''
				: 'opacity-0'} promise-text-shadow"
		>
			<p class="text-2xl font-medium tracking-widest">2025 Church promise</p>
			<h1 class="text-6xl font-medium">
				The Lord will fight for you; you need only to be still
				<span class="whitespace-nowrap text-2xl font-medium">- Exodus 14:14</span>
			</h1>
		</div>
	</div>
</section>

<section class="absolute bg-white">
	<h2>Welcome!</h2>
	<p>
		Praise The Lord! With changing times, our desire is to utilize the emerging technologies to
		share the glorious gospel of Lord Jesus Christ, edify the Church of God and prepare Gods people
		for His coming.
	</p>
	<p>
		As we minister, our intent is to effectively meet the spiritual needs of all that who visit our
		assembly & the site. We hope that you will visit us to understand the purpose of God for our
		lives, worship Him, fellowship with Gods people, share one another's burden & reach out to the
		perishing world.
	</p>
	<p bind:this={responsibilitiesRef}>We are called to Worship, Psalms 95.6.</p>
</section>

<style lang="postcss">
	.promise-text-shadow {
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}
</style>
