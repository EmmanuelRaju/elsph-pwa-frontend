<script lang="ts">
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css';
	import { gsap } from 'gsap';
	import { TextPlugin } from 'gsap/TextPlugin';
	import * as ICONS from '$lib/assets/icons';

	gsap.registerPlugin(TextPlugin);

	let foundationalPromisesRef: HTMLDivElement;
	let showInkAnimation = false;

	onMount(async () => {
		// Check if the animation has already played
		const hasPlayed = sessionStorage.getItem('homeAnimationPlayed');

		// First visit: Run full animation
		const pageLoaded = await hidePageLoader();
		if (pageLoaded.status === 'success') {
			if (!hasPlayed) {
				const tl = gsap.timeline();
				tl.fromTo('header', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 2 })
					.fromTo('.year-promise', { opacity: 0 }, { opacity: 1, delay: 2, duration: 1 })
					.to('#foundation-promise', {
						y: '-25%',
						onComplete: () => {
							document.body.setAttribute('style', 'overflow:visible;');
						}
					});
				// Mark animation as played
				sessionStorage.setItem('homeAnimationPlayed', 'true');
			} else {
				// Internal navigation: Skip animation and set elements to their final state
				gsap.set('header', { opacity: 1, scale: 1 });
				gsap.set('.year-promise', { opacity: 1 });
				gsap.set('#foundation-promise', { y: '-25%' });
				document.body.setAttribute('style', 'overflow:visible;');
			}
		}

		showInkAnimation = true;

		const foundationalPromisesSwiper = new Swiper(foundationalPromisesRef, {
			loop: true,
			autoplay: {
				delay: 3000
			}
		});

		const responsiblitiesTL = gsap.timeline({ repeat: -1, defaults: { duration: 4 } });
		// responsiblitiesTL
		// 	.to('#responsibility', {
		// 		text: 'We are called to<br/>Witness'
		// 	})
		// 	.to(
		// 		'#responsibility-reference',
		// 		{
		// 			text: '- Acts 1:8'
		// 		},
		// 		'<+0.5'
		// 	)
		// 	.to('#responsibility', {
		// 		text: 'We are called to<br/>Worship'
		// 	})
		// 	.to(
		// 		'#responsibility-reference',
		// 		{
		// 			text: '- Psalms 95:6'
		// 		},
		// 		'<+0.5'
		// 	)
		// 	.to('#responsibility', {
		// 		text: 'We are called to<br/>Wrestle'
		// 	})
		// 	.to(
		// 		'#responsibility-reference',
		// 		{
		// 			text: '- Ephesians 6:12'
		// 		},
		// 		'<+0.5'
		// 	);
		responsiblitiesTL
			.to('.christian-responsibilities', {
				text: 'We are called to<br/>Witness <br>- Acts 1:8'
			})
			.to('.christian-responsibilities', {
				text: 'We are called to<br/>Worship <br>- Psalms 95:6'
			})
			.to('.christian-responsibilities', {
				text: 'We are called to<br/>Wrestle <br>- Ephesians 6:12'
			});
	});

	const resources = [
		{
			label: 'YouTube Videos',
			icon: ICONS.play,
			link: 'https://www.youtube.com/@ElShaddaiPrayerHouse'
		},
		{
			label: 'Music',
			icon: ICONS.music,
			link: '/music'
		},
		{
			label: 'Lyrics',
			icon: ICONS.lyric,
			link: '/lyrics'
		}
		// {
		// 	label: 'Audio',
		// 	icon: ICONS.microphone,
		// 	link: '/coming-soon'
		// },
		// {
		// 	label: 'Articles',
		// 	icon: ICONS.file,
		// 	link: '/coming-soon'
		// }
	];

	const weekSchedule: {
		day: string;
		date: string;
		event: {
			title: string;
			time: { start: string; end?: string };
			description?: string;
		}[];
	}[] = [
		{
			day: 'Mon',
			date: '17 Feb 2025',
			event: [
				{
					title: `Sunday school teacher's zoom meeting`,
					time: { start: '06:30 P.M' }
				}
			]
		},
		{
			day: 'Tue',
			date: '18 Feb 2025',
			event: [
				{
					title: `Bible study`,
					time: { start: '06:30 P.M' }
				}
			]
		},
		{
			day: 'Wed',
			date: '19 Feb 2025',
			event: [
				{
					title: `Sister's meeting`,
					time: { start: '10:00 A.M' }
				}
			]
		},
		{
			day: 'Thu',
			date: '20 Feb 2025',
			event: [
				{
					title: `Church prayer`,
					time: { start: '06:30 P.M' }
				}
			]
		},
		{
			day: 'Fri',
			date: '21 Feb 2025',
			event: [
				{
					title: `All night prayer`,
					time: { start: '09:30 P.M' }
				}
			]
		},
		{
			day: 'Sat',
			date: '22 Feb 2025',
			event: [
				{
					title: `Fasting prayer`,
					time: { start: '10:30 A.M' }
				}
			]
		},
		{
			day: 'Sun',
			date: '23 Feb 2025',
			event: [
				{
					title: `Sunday service`,
					time: { start: '09:30 A.M' }
				}
			]
		}
	];
</script>

<!-- <header class="fixed inset-x-0 flex justify-between p-3">
	<a
		href="/"
		class="size-[60px] content-center rounded-full bg-white p-2 duration-300 hover:invert"
	>
		<p class="text-base font-bold drop-shadow-xl">ELSPH</p>
	</a>
	<Menu />
</header> -->

<svelte:head>
	<title>ELSPH | Home</title>
	<meta
		name="description"
		content="El Shaddai Prayer House - A place of worship and spiritual growth."
	/>
	<meta property="og:title" content="ELSPH | Home" />
	<meta property="og:description" content="A place of worship and spiritual growth." />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:url" content="https://elshaddaiprayerhouse.in" />
</svelte:head>

<main>
	<section
		id="hero"
		class="flex h-screen items-center justify-center overflow-clip"
		class:ink-animation={showInkAnimation}
	>
		<div class="year-promise promise-text-shadow max-w-4xl text-center text-white">
			<p class="lg:4xl text-2xl font-medium uppercase tracking-widest underline md:text-3xl">
				2025 year promise
			</p>
			<p class="lg:9xl text-6xl font-medium md:text-7xl">
				The Lord will fight for you; you need only to be still <br /><span
					class="lg:4xl whitespace-nowrap text-2xl font-medium md:text-3xl">- Exodus 14:14</span
				>
			</p>
		</div>
	</section>

	<section
		id="foundation-promise"
		class="relative -z-[1] mx-auto max-w-2xl rounded-[40px] bg-black px-3 py-10 text-center text-white"
	>
		<div bind:this={foundationalPromisesRef} class="swiper">
			<p class="px-2 text-3xl font-medium uppercase tracking-widest">
				church foundational promises
			</p>
			<ul class="swiper-wrapper mt-10 text-7xl">
				<li class="swiper-slide">
					Behold I make all things new.<br /><span class="whitespace-nowrap text-3xl font-medium"
						>- Revelation 21:5</span
					>
				</li>
				<li class="swiper-slide">
					My presence shall go with thee.<br /><span class="whitespace-nowrap text-3xl font-medium"
						>- Exodus 33:14</span
					>
				</li>
				<li class="swiper-slide">
					Behold, I will do marvels.<br /><span class="whitespace-nowrap text-3xl font-medium"
						>- Exodus 34:10</span
					>
				</li>
			</ul>
		</div>
	</section>

	<div class="content-bg">
		<section id="welcome" class="-mt-5 flex flex-col gap-10 p-10 pt-0">
			<h2 class="text-center text-6xl font-bold capitalize">welcome</h2>
			<p class="text-center text-2xl">
				Praise The Lord! With changing times, our desire is to utilize the emerging technologies to
				share the glorious gospel of Lord Jesus Christ, edify the Church of God and prepare Gods
				people for His coming.
			</p>
			<p class="text-center text-2xl">
				As we minister, our intent is to effectively meet the spiritual needs of all that who visit
				our assembly & the site. We hope that you will visit us to understand the purpose of God for
				our lives, worship Him, fellowship with Gods people, share one another's burden & reach out
				to the perishing world.
			</p>
			<!-- <div
				class="christian-responsibilities -mx-5 mt-10 text-center text-[15vw] font-medium leading-none"
			>
				<p id="responsibility">We are called to<br />Wrestle</p>
				<p id="responsibility-reference">-Ephesians 6:12</p>
			</div> -->
			<p
				class="christian-responsibilities -mx-5 mt-10 text-center text-[15vw] font-medium leading-none"
			>
				We are called to<br />Wrestle <br />- Ephesians 6:12
			</p>
			<!-- <ul class="mt-5 text-center text-2xl font-medium">
				<li>We are called to Wrestle, Ephesians 6:12.</li>
				<li>We are called to Witness, Acts 1:8 .</li>
				<li>We are called to Worship, Psalms 95.6.</li>
			</ul> -->
		</section>

		<section id="resources" class="mt-10 flex flex-col gap-10 p-10">
			<h2 class="text-center text-6xl font-bold capitalize">resources</h2>
			<p class="text-center text-2xl">
				We encourage you to use our library of media resources for your and your church's spiritual
				enrichment. We keep updating these time to time so keep checking regularly.
			</p>
			<div class="">
				<ul class="mt-5 flex flex-wrap gap-10">
					{#snippet resourceCard(props: { link: string; icon: any; label: string })}
						<li
							class="group flex-1 shrink-0 place-content-center rounded-[40px] border bg-white px-5 py-10 shadow-xl duration-200 hover:scale-110 hover:invert"
						>
							<a href={props.link} class="flex flex-col items-center justify-center gap-10">
								<div class="size-40 duration-1000">
									<props.icon></props.icon>
								</div>
								<p class="text-center text-2xl font-semibold leading-5">{props.label}</p>
							</a>
						</li>
					{/snippet}
					{#each resources as card}
						{@render resourceCard(card)}
					{/each}
				</ul>
			</div>
		</section>

		<section id="weekly-schedule" class="flex flex-col gap-10 p-10">
			<h2 class="text-center text-6xl font-bold capitalize">weekly schedule</h2>
			<p class="text-center text-2xl">
				There’s so much more to church than Sunday services. Join us in-person or online – on
				Sundays and during the week.
			</p>
			<div class="">
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
				<ul class="flex flex-wrap gap-10">
					{#each weekSchedule as schedule}
						{@render weekCard(schedule)}
					{/each}
				</ul>
			</div>
		</section>

		<section id="prayer-request" hidden>
			<h2>prayer request</h2>
			<p class="text-2xl">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis dignissimos ea explicabo
				neque reprehenderit iste magnam est tenetur molestias, eum aliquam odit ad, ex asperiores!
				Illo possimus ex ad doloribus.
			</p>
			<form>
				<input type="text" placeholder="Your Name" />
				<input type="email" placeholder="Your Email" />
				<input type="text" placeholder="Your Phone" />
				<textarea placeholder="Your Prayer Request"></textarea>
				<button type="submit">Submit</button>
			</form>
		</section>
	</div>
</main>

<style lang="postcss">
	.promise-text-shadow {
		text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}

	.ink-animation::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('$lib/assets/images/bg-2.jpg');
		background-size: cover;
		background-position: center;
		z-index: -1;
		overflow: hidden;

		mask-image: url('$lib/assets/images/ink_lv2.gif');
		mask-size: cover;
		mask-position: center;
		/* animation: zoom 150s ease-in-out infinite; */
	}
	/* .resource-icon {
		@apply h-[60px] w-[60px];
	}
	.resource-icon svg {
		@apply h-[inherit] w-[inherit];
	} */
</style>
