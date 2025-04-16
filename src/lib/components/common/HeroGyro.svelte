<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import SunCalc from 'suncalc';

	export let title = 'Page Title';
	let shadowStyle = '';

	function updateShadow(x, y, width, height) {
		const centerX = width / 2;
		const centerY = height / 2;
		const offsetX = x - centerX;
		const offsetY = y - centerY;
		const blur = 20;
		const spread = 5;

		shadowStyle = `text-shadow: ${-offsetX / 10}px ${-offsetY / 10}px ${blur}px rgba(0, 0, 0, 0.5),
                                ${-offsetX / 5}px ${-offsetY / 5}px ${spread}px rgba(0, 0, 0, 0.3);`;
	}

	function handleMouseMove(event) {
		updateShadow(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
	}

	async function handleMobileLightSource() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				const times = SunCalc.getPosition(new Date(), latitude, longitude);

				const sunX = (times.azimuth * window.innerWidth) / Math.PI;
				const sunY = window.innerHeight / 2 - (times.altitude * window.innerHeight) / Math.PI;
				updateShadow(sunX, sunY, window.innerWidth, window.innerHeight);
			});
		}
	}

	onMount(() => {
		if (browser) {
			if (window.innerWidth > 768) {
				window.addEventListener('mousemove', handleMouseMove);
			} else {
				handleMobileLightSource();
			}
		}
	});
</script>

<div class="hero-title" style={shadowStyle}>{title}</div>

<style>
	.hero-title {
		font-size: 10vw;
		font-weight: bold;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-transform: uppercase;
	}
</style>
