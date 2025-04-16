<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let cards = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	onMount(() => {
		gsap.utils.toArray('.card').forEach((card, index) => {
			gsap.fromTo(
				card,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					scrollTrigger: {
						trigger: card,
						start: 'top 80%',
						end: 'top 30%',
						scrub: true
					}
				}
			);
		});
	});
</script>

<div class="container">
	{#each cards as card, index}
		<div class="card">{card}</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px;
	}

	.card {
		width: 300px;
		height: 150px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: -100px;
		position: relative;
	}
</style>
