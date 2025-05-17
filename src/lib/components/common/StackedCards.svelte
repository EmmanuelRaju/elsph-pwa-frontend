<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	// let cards = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	onMount(() => {
		// Check out the really ⚡️ powerful gsap.utils if you're not familar with them https://gsap.com/docs/v3/GSAP/UtilityMethods
		const scaleMax = gsap.utils.mapRange(1, document.querySelectorAll('.card').length - 1, 0.8, 1); // Convert values we know to values we want https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()
		const time = 2;

		gsap.set('.card', {
			y: (index) => 30 * index, // set offset
			transformStyle: 'preserve-3d', // For the perspecitve effect
			// transformPerspective: 1000, // For the perspecitve effect
			transformOrigin: 'center top'
		});

		//--------------------------------//
		// The animation
		//--------------------------------//
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: 'section',
				start: 'top top',
				end: `${window.innerHeight * 5} top`,
				scrub: true,
				pin: true,
				markers: true
			}
		});

		// Animte cards up from off screen one by one.
		tl.from('.card', {
			y: () => window.innerHeight,
			duration: time / 2,
			stagger: time
		});

		//
		tl.to(
			'.card:not(:last-child)',
			{
				rotationX: -20,
				scale: (index) => scaleMax(index), // dynamlicly get scale based on the index of the current card
				stagger: {
					each: time
				}
			},
			time // Start tween when the first cards has done animating
		);

		// END The animation --------------//
	});
</script>

<section>
	<ul class="cards">
		<li class="card panel green">
			<div class="flair flair--2"></div>
		</li>
		<li class="card panel red">
			<div class="flair flair--3"></div>
		</li>
		<li class="card panel orange">
			<div class="flair flair--4"></div>
		</li>
		<li class="card panel red">
			<div class="flair flair--5"></div>
		</li>
		<li class="card panel green">
			<div class="flair flair--6"></div>
		</li>
		<li class="card panel orange">
			<div class="flair flair--7"></div>
		</li>
		<li class="card panel purple">
			<div class="flair flair--8"></div>
		</li>
		<li class="card panel red">
			<div class="flair flair--8"></div>
		</li>
	</ul>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100svh;
	}

	.cards {
		padding: 0;
		margin: 0;
		display: grid;
		width: 100vw;
		height: 100vh;
		border: 2px solid red;
	}
	.cards > * {
		grid-area: 1/1/2/2;
	}
	.cards li {
		list-style: none;
	}

	.card {
		height: 100%;
		background-color: red;
		min-height: auto;
		padding: 30px;
	}
</style>
