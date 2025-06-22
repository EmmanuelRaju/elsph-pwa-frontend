<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { onMount } from 'svelte';

	export let items: {
		day: string;
		date: string;
		event: {
			title: string;
			time: { start: string; end?: string };
			description?: string;
		}[];
	}[];
	export let direction: 'left' | 'right' | undefined = 'left';
	export let speed: 'fast' | 'normal' | 'slow' | undefined = 'fast';
	export let pauseOnHover: boolean | undefined = true;
	export let className: string | undefined = undefined;

	let containerRef: HTMLDivElement;
	let scrollerRef: HTMLUListElement;

	onMount(() => {
		addAnimation();
	});

	let start = false;

	function addAnimation() {
		if (containerRef && scrollerRef) {
			const scrollerContent = Array.from(scrollerRef.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef) {
					scrollerRef.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			start = true;
		}
	}
	const getDirection = () => {
		if (containerRef) {
			if (direction === 'left') {
				containerRef.style.setProperty('--animation-direction', 'forwards');
			} else {
				containerRef.style.setProperty('--animation-direction', 'reverse');
			}
		}
	};
	const getSpeed = () => {
		if (containerRef) {
			if (speed === 'fast') {
				containerRef.style.setProperty('--animation-duration', '20s');
			} else if (speed === 'normal') {
				containerRef.style.setProperty('--animation-duration', '40s');
			} else {
				containerRef.style.setProperty('--animation-duration', '80s');
			}
		}
	};
</script>

<!--Em: If masking on ends is required [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] -->
<div bind:this={containerRef} class={cn('scroller overflow-hidden ', className)}>
	<ul
		bind:this={scrollerRef}
		class={cn(
			' flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-4',
			start && 'animate-scroll ',
			pauseOnHover && 'hover:[animation-play-state:paused]'
		)}
	>
		{#each items as item, idx (item.day + idx)}
			{@render weekCard2(item)}
		{/each}
	</ul>
</div>

{#snippet weekCard(params: {
	day: string;
	date: string;
	event: {
		title: string;
		time: { start: string; end?: string };
		description?: string;
	}[];
})}
	<li
		class="grid grow grid-cols-12 overflow-clip rounded-[30px] border shadow-lg duration-300 hover:invert"
	>
		<div class="col-span-5 bg-black p-5 text-center text-white">
			<p class="text-4xl font-medium tracking-widest">{params.day}</p>
			<p class="whitespace-nowrap text-lg font-medium uppercase">
				{params.date}
			</p>
		</div>
		<div class="col-span-7 bg-white p-5">
			{#each params.event as event}
				<div class="flex flex-col justify-center">
					<p class="text-2xl font-semibold leading-5">{event.title}</p>
					<p class="text-2xl">
						{event.time.start}
						{#if event.time.end}
							<span> - {event.time.end}</span>
						{/if}
					</p>
					{#if event.description}
						<p>{event.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</li>
{/snippet}

{#snippet weekCard2(params: {
	day: string;
	date: string;
	event: {
		title: string;
		time: { start: string; end?: string };
		description?: string;
	}[];
})}
	<li
		class="flex max-w-[400px] grow overflow-clip rounded-[30px] border shadow-lg duration-300 hover:invert md:max-w-[600px]"
	>
		<div class=" place-content-center bg-black p-5 text-center text-white">
			<p class="text-4xl font-medium tracking-widest">{params.day}</p>
			<p class="whitespace-nowrap text-lg font-medium uppercase">
				{params.date}
			</p>
		</div>
		<div class="bg-white p-5">
			{#each params.event as event}
				<div class="flex flex-col justify-center">
					<p class="text-2xl font-semibold leading-5">{event.title}</p>
					<p class="text-2xl">
						{event.time.start}
						{#if event.time.end}
							<span> - {event.time.end}</span>
						{/if}
					</p>
					{#if event.description}
						<p>{event.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</li>
{/snippet}
