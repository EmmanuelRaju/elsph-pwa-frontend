<script lang="ts">
	import { slide } from 'svelte/transition';

	export let open: boolean = false;
</script>

<button
	class="menu flex h-10 w-32 items-center justify-center gap-2.5 rounded-full duration-500 {open
		? 'bg-black text-white'
		: 'bg-white'} px-4 py-3"
	on:click={() => (open = !open)}
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

<style>
	#nav-icon {
		width: 20px;
		height: 12px;
		position: relative;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: 0.5s ease-in-out;
		-moz-transition: 0.5s ease-in-out;
		-o-transition: 0.5s ease-in-out;
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
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: 0.25s ease-in-out;
		-moz-transition: 0.25s ease-in-out;
		-o-transition: 0.25s ease-in-out;
		transition: 0.25s ease-in-out;
	}

	#nav-icon.open span {
		background: #fff;
	}

	/* Icon 3 */

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
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	#nav-icon.open span:nth-child(3) {
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

	#nav-icon.open span:nth-child(4) {
		top: 10px;
		width: 0%;
		left: 50%;
	}
</style>
