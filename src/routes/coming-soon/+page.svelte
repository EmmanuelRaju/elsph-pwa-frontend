<script lang="ts">
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<div class="grid h-screen place-content-center">
	<p class="gradient-text text-[15vw] font-bold">COMING SOON</p>
</div>

<style>
	.gradient-text {
		background: linear-gradient(to right, #cfccd4 20%, #7c7e7f 30%, #171718 70%, #eceaef 80%);
		/* background: linear-gradient(to right, #7953cd 20%, #00affa 30%, #0190cd 70%, #764ada 80%); */
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		/* text-fill-color: transparent; */
		background-size: 500% auto;
		animation: textShine 5s ease-in-out infinite alternate;
	}
	@keyframes textShine {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 100% 50%;
		}
	}
</style>
