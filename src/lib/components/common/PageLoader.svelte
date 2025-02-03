<script lang="ts">
	import { showPageLoader } from '$lib/stores/page-loader-store';
	import { fade } from 'svelte/transition';
</script>

{#if $showPageLoader}
	<div out:fade class="flex h-screen flex-col items-center justify-center p-10">
		<p class="text-white">Loading...Please wait</p>
		<div class="loader">
			<div class="loaderBar"></div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.loader {
		@apply relative mx-auto w-full max-w-[500px] rounded-lg border-4 border-transparent p-0.5;
	}

	.loader:before {
		content: '';
		border: 1px solid #fff;
		border-radius: 10px;
		position: absolute;
		top: -4px;
		right: -4px;
		bottom: -4px;
		left: -4px;
	}
	.loader .loaderBar {
		position: absolute;
		border-radius: 10px;
		top: 0;
		right: 100%;
		bottom: 0;
		left: 0;
		background: #fff;
		width: 0;
		animation: borealisBar 2s linear infinite;
	}

	@keyframes borealisBar {
		0% {
			left: 0%;
			right: 100%;
			width: 0%;
		}
		10% {
			left: 0%;
			right: 75%;
			width: 25%;
		}
		90% {
			right: 0%;
			left: 75%;
			width: 25%;
		}
		100% {
			left: 100%;
			right: 0%;
			width: 0%;
		}
	}
</style>
