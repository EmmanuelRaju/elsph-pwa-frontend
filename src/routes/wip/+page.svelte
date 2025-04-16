<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import StackedCards from '$lib/components/common/StackedCards.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	import { supabase } from '$lib/utils/supabaseClient';
	import { PUBLIC_SUPABASE_STORAGE_BUCKET } from '$env/static/public';

	let audioUrl = '';

	const loadAudio = async () => {
		const { data } = supabase.storage
			.from(PUBLIC_SUPABASE_STORAGE_BUCKET)
			.getPublicUrl('music/00-Opening-Prayer.mp3');

		audioUrl = data.publicUrl;
		console.log('Audio URL:', audioUrl);
	};

	loadAudio();

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main>
	<Hero title="Emmanuel"></Hero>
	<!-- <StackedCards></StackedCards> -->
	<audio controls src={audioUrl}></audio>
</main>
