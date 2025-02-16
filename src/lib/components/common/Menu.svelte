<script lang="ts">
	import { bodyScrollHandler } from '$lib/utils/common';

	// import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let open: boolean = false;

	let menuOverlay: HTMLDivElement; // Reference for the expanding menu
	let menuItems: HTMLUListElement; // Reference for menu items
	let menuButton: HTMLButtonElement; // Reference for menu button

	onMount(() => {
		// Listen for browser back event
		window.addEventListener('popstate', handlePopState);
	});

	onDestroy(() => {
		// Cleanup listener
		window.removeEventListener('popstate', handlePopState);
	});

	const menuDisplayHandler = (mode: 'show' | 'hide' | 'toggle' = 'toggle') => {
		if (mode === 'toggle') {
			open = !open;
		} else if (mode === 'show') {
			open = true;
		} else {
			open = false;
		}

		// Get button's position
		const buttonRect = menuButton.getBoundingClientRect();
		const x = buttonRect.left + buttonRect.width / 2; // X center of button
		const y = buttonRect.top + buttonRect.height / 2; // Y center of button

		// Convert to percentage of viewport
		const xPercent = ((x + 50) / window.innerWidth) * 100 + '%';
		const yPercent = ((y + 200) / window.innerHeight) * 100 + '%';

		// console.log('xPercent: ', xPercent, 'yPercent: ', yPercent);

		// Set transform origin at button's position
		gsap.set(menuOverlay, { transformOrigin: `${xPercent} ${yPercent}` });

		if (open) {
			history.pushState({ menuOpen: true }, '');
			bodyScrollHandler(false);
			gsap.to('.logo', { visibility: 'hidden', opacity: 0, duration: 0.5 });
			// Expand overlay from button position
			gsap.to(menuOverlay, {
				backgroundColor: '#000',
				visibility: 'visible',
				scale: 50, // Expand to full screen
				duration: 1.2,
				ease: 'power3.inOut'
			});

			// Fade in menu items with stagger
			gsap.to(menuItems.children, {
				visibility: 'visible',
				opacity: 1,
				y: 0,
				stagger: 0.2,
				delay: 0.5
			});
		} else {
			bodyScrollHandler(true);
			const tl = gsap.timeline();
			// Fade out menu items
			tl.to(menuItems.children, {
				opacity: 0,
				y: 20,
				stagger: -0.1
			})
				// Shrink overlay back into button
				.to(
					menuOverlay,
					{
						backgroundColor: '#FFF',
						scale: 0,
						duration: 1,
						ease: 'power3.inOut'
					},
					'<'
				)
				.to('.logo', { visibility: 'visible', opacity: 1, duration: 0.5 }, '<+0.5')
				.to(menuItems.children, {
					visibility: 'hidden'
				});

			// Remove last history state without navigating away
			history.back();
		}
	};

	const navItems = [
		{ label: 'Home', link: '/' },
		{ label: 'About Us', link: '/coming-soon' },
		{ label: 'Good News', link: '/coming-soon' },
		{ label: 'Prayer Requests', link: '/coming-soon' },
		{ label: 'Contact Us', link: '/coming-soon' }
		// { label: 'Home', link: '/' },
		// { label: 'About Us', link: '/about-us' },
		// { label: 'Good News', link: '/good-news' },
		// { label: 'Prayer Requests', link: '/prayer-requests' },
		// { label: 'Contact Us', link: '/contact-us' }
	];

	function handlePopState() {
		// If menu is open and user clicks back, close it
		if (open) {
			menuDisplayHandler('hide');
		}
	}
</script>

<!-- Menu Button -->
<button
	bind:this={menuButton}
	class="menu flex h-10 w-32 items-center justify-center gap-2.5 rounded-full duration-1000 {open
		? 'bg-black text-white'
		: 'bg-white'} fixed right-5 top-5 z-50 px-4 py-3"
	onclick={() => menuDisplayHandler()}
>
	<div class="flex-1">
		{#if open}
			<p in:slide={{ duration: 500 }} class="text-lg font-medium uppercase">close</p>
		{:else}
			<p in:slide={{ duration: 500, axis: 'y' }} class="text-lg font-medium uppercase">menu</p>
		{/if}
	</div>
	<div id="nav-icon" class:open>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</button>

<!-- Expanding Overlay -->
<div bind:this={menuOverlay} class="menu-overlay scale-0"></div>

<!-- Fullscreen Menu Items -->
<ul
	data-lenis-prevent
	bind:this={menuItems}
	class="menu-items *:invisible *:translate-y-20 *:opacity-0"
	class:overflow-y-scroll={open}
	class:h-screen={open}
>
	{#snippet navItem(params: { label: string; link: string })}
		<li class="underline-offset-2">
			<a
				class="text-[18vw] font-medium leading-tight hover:underline sm:text-[10vw]"
				href={params.link}
				onclick={() => menuDisplayHandler('hide')}>{params.label}</a
			>
		</li>
	{/snippet}
	{#each navItems as item}
		{@render navItem(item)}
	{/each}
</ul>

<style lang="postcss">
	/* Expanding Overlay */
	.menu-overlay {
		@apply fixed left-0 top-0 z-40 h-full w-full rounded-full bg-black;
		transform-origin: center;
	}

	/* Fullscreen Menu Items */
	.menu-items {
		@apply fixed inset-0 z-40 flex flex-col gap-6 p-10 pt-5 text-white;
	}

	/* Nav Icon */
	#nav-icon {
		width: 20px;
		height: 12px;
		position: relative;
		transition: 0.5s ease-in-out;
		cursor: pointer;
	}

	#nav-icon span {
		display: block;
		position: absolute;
		height: 2px;
		width: 100%;
		background: #000;
		border-radius: 9px;
		opacity: 1;
		left: 0;
		transition: 0.25s ease-in-out;
	}

	#nav-icon.open span {
		background: #fff;
	}

	#nav-icon span:nth-child(1) {
		top: 0px;
	}

	#nav-icon span:nth-child(2),
	#nav-icon span:nth-child(3) {
		top: 5px;
	}

	#nav-icon span:nth-child(4) {
		top: 10px;
	}

	#nav-icon.open span:nth-child(1) {
		top: 5px;
		width: 0%;
		left: 50%;
	}

	#nav-icon.open span:nth-child(2) {
		transform: rotate(45deg);
	}

	#nav-icon.open span:nth-child(3) {
		transform: rotate(-45deg);
	}

	#nav-icon.open span:nth-child(4) {
		top: 10px;
		width: 0%;
		left: 50%;
	}
</style>
