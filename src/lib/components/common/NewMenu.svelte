<script lang="ts">
	import { showScrollToTop } from '$lib/stores/show-scroll-to-top';
	import { bodyScrollHandler } from '$lib/utils/common';
	import { gsap } from 'gsap';
	import { onDestroy, onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

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

		if (open) {
			$showScrollToTop = false;
			history.pushState({ menuOpen: true }, '');
			bodyScrollHandler(false);
			gsap.to('.logo', { visibility: 'hidden', opacity: 0, duration: 0.5 });
		} else {
			bodyScrollHandler(true);
			const tl = gsap.timeline();
			// Fade out menu items
			tl.to('.logo', { visibility: 'visible', opacity: 1, duration: 0.5 }, '<+0.5');
			// Remove last history state without navigating away
			history.back();
		}
	};

	const navItems = [
		{ label: 'Home', link: '/' },
		{ label: 'About Us', link: '/about-us' },
		{ label: 'Good News', link: '/good-news' },
		{ label: 'Resources', link: '/#resources' },
		{ label: 'Contact Us', link: '/contact-us' }
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
{#if open}
	<div
		in:fade={{ delay: 500, duration: 500 }}
		out:fade={{ duration: 500 }}
		bind:this={menuOverlay}
		class="menu-overlay"
	>
		<!-- Fullscreen Menu Items -->
		<ul
			bind:this={menuItems}
			class="menu-items"
			class:overflow-y-scroll={open}
			class:h-screen={open}
		>
			{#snippet navItem(params: { label: string; link: string })}
				<li class="underline-offset-2">
					<a
						class="text-6xl font-medium leading-tight hover:underline lg:text-9xl"
						href={params.link}
						onclick={() => menuDisplayHandler('hide')}>{params.label}</a
					>
				</li>
			{/snippet}
			{#each navItems as item}
				{@render navItem(item)}
			{/each}
		</ul>
	</div>
{/if}

<style lang="postcss">
	/* Expanding Overlay */
	.menu-overlay {
		@apply fixed left-0 top-0 z-40 h-screen w-screen bg-black;
	}

	/* Fullscreen Menu Items */
	.menu-items {
		@apply flex flex-col gap-5 px-10 py-5 text-white;
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
