<script lang="ts">
	import { onMount } from 'svelte';
	let deferredPrompt: any = null;
	let showInstallButton = false;
	let showIOSPrompt = false;

	let isIOS = false;
	let isStandalone = false;

	onMount(() => {
		console.log('here');
		const userAgent = window.navigator.userAgent.toLowerCase();
		isIOS = /iphone|ipad|ipod/.test(userAgent);
		isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone === true;

		// ✅ iOS prompt logic
		if (isIOS && !isStandalone) {
			showIOSPrompt = true;
		}

		// ✅ Android/Windows/Mac logic
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			console.log('beforeinstallprompt event fired');
			deferredPrompt = e;
			showInstallButton = true;
		});

		// ✅ Hide button once installed
		window.addEventListener('appinstalled', () => {
			showInstallButton = false;
			showIOSPrompt = false;
			deferredPrompt = null;
		});
	});

	const installApp = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			console.log('PWA installed');
			showInstallButton = false;
		}
		deferredPrompt = null;
	};
</script>

<!-- ✅ Install button for Android, Windows, macOS -->
{#if showInstallButton}
	<button
		on:click={installApp}
		class="fixed bottom-4 right-4 rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg"
	>
		📲 Install App
	</button>
{/if}

<!-- ✅ Manual prompt for iOS -->
{#if showIOSPrompt}
	<div class="fixed inset-x-4 bottom-4 rounded bg-yellow-100 p-4 text-sm text-gray-900 shadow-lg">
		Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install the app.
	</div>
{/if}
