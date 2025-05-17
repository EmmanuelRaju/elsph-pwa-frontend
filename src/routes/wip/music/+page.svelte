<script lang="ts">
	import { PUBLIC_SUPABASE_STORAGE_BUCKET } from '$env/static/public';
	import { hidePageLoader } from '$lib/utils/common';
	import { supabase } from '$lib/utils/supabaseClient';
	import { onMount } from 'svelte';

	let musicFiles: string[] = [];

	const loadMusicFiles = async () => {
		const { data, error } = await supabase.storage
			.from(PUBLIC_SUPABASE_STORAGE_BUCKET)
			.list('music', {
				limit: 100,
				offset: 100,
				sortBy: { column: 'name', order: 'asc' }
			});

		console.log('Music files:', data);

		if (error) {
			console.error('Error loading music files:', error.message);
			return;
		}

		musicFiles = data.map(
			(item) =>
				supabase.storage.from(PUBLIC_SUPABASE_STORAGE_BUCKET).getPublicUrl(`music/${item.name}`)
					.data.publicUrl
		);
	};

	loadMusicFiles();

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<h1 class="mb-4 text-2xl font-bold">Sermons</h1>

{#if musicFiles.length > 0}
	<ul class="space-y-4">
		<!-- {#each musicFiles as url}
			<li class="rounded-lg border p-4 shadow">
				<audio controls src={url} class="w-full"></audio>
			</li>
		{/each} -->
	</ul>
{:else}
	<p>No music files found.</p>
{/if}
