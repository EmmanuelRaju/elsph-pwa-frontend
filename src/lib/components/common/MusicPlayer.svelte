<script lang="ts">
	import { PUBLIC_SUPABASE_STORAGE_BUCKET } from '$env/static/public';
	import { pause as Pause, play as Play, close as Close } from '$lib/assets/icons';
	import { currentTrack } from '$lib/stores/player';
	import { cleanFileName } from '$lib/utils/common';
	import { supabase } from '$lib/utils/supabaseClient';
	import { slide } from 'svelte/transition';

	let playing = $state();
	let audio: HTMLAudioElement | null = $state(null);

	const togglePlay = () => {
		if (!audio) return;
		if (playing) {
			audio.pause();
		} else {
			audio.play();
		}
		playing = !playing;
	};

	let url = $state('');

	const closePlayer = () => {
		audio?.pause();
		$currentTrack = null;
		playing = false;
		url = '';
	};

	$effect(() => {
		if (!$currentTrack) return;
		url = supabase.storage
			.from(PUBLIC_SUPABASE_STORAGE_BUCKET)
			.getPublicUrl(`music/${$currentTrack.name}`).data.publicUrl;
		playing = true;
		console.log('Playing:', url);
		audio?.play();
	});

	$effect(() => {
		if (audio) {
			audio.addEventListener('ended', closePlayer);
			return () => audio?.removeEventListener('ended', closePlayer);
		}
	});
</script>

{#if $currentTrack}
	<div
		transition:slide
		class="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-black p-4 text-white shadow-2xl"
		style="padding-bottom: calc(var(--safe-bottom) + 1rem);"
	>
		<p class="text-center text-2xl">{cleanFileName($currentTrack.name)}</p>
		<div class="flex items-center gap-2">
			<button onclick={togglePlay}>
				{#if playing}
					<div
						class="flex size-10 items-center justify-center rounded-full border border-black bg-white p-2"
					>
						<Pause></Pause>
					</div>
				{:else}
					<div
						class="flex size-10 items-center justify-center rounded-full border border-black bg-white p-2 pl-2.5"
					>
						<Play></Play>
					</div>
				{/if}
			</button>
			<button onclick={closePlayer}>
				<div
					class="flex size-10 items-center justify-center rounded-full border border-black bg-white p-2"
				>
					<Close></Close>
				</div>
			</button>
		</div>
		<audio bind:this={audio} src={url}></audio>
	</div>
{/if}
