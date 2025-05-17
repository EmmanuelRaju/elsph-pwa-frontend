<script lang="ts">
	import Play from '$lib/assets/icons/play.svelte';
	import { currentTrack } from '$lib/stores/player';
	import { cleanFileName } from '$lib/utils/common';

	export let track,
		classes = '';

	const play = () => {
		currentTrack.set(track);
	};
</script>

<button
	class="flex items-center gap-5 rounded-[20px] border bg-white p-4 shadow-xl duration-200 hover:scale-110 hover:invert {classes}"
	on:click={play}
>
	<div
		class="flex size-[25px] items-center justify-center rounded-full border border-black p-1 pl-1.5"
	>
		<Play></Play>
	</div>
	<p class="text-xl">{cleanFileName(track.name)}</p>
</button>
<!-- <p class="text-xl {classes}">{cleanFileName(track.name)}</p> -->
