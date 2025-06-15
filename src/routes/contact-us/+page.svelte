<script lang="ts">
	import { EmailIcon, PhoneIcon, WhatsappIcon } from '$lib/assets/icons';
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	const contactMethods = [
		{
			link: 'mailto:elshaddai.ph@gmail.com',
			icon: EmailIcon,
			label: 'Email',
			value: 'elshaddai.ph@gmail.com'
		},
		{
			link: 'tel:+9104027793655',
			icon: PhoneIcon,
			label: 'Phone',
			value: '+91 040 27793655'
		},
		{
			link: 'https://wa.me/+919440880615',
			icon: WhatsappIcon,
			label: 'Whatsapp',
			value: '+91 94408 80615'
		}
	];

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<svelte:head>
	<title>ELSPH | Contact us</title>
	<meta name="description" content="Contact El Shaddai Prayer House" />
	<meta property="og:title" content="ELSPH | Contact us" />
	<meta property="og:description" content="Contact El Shaddai Prayer House" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:url" content="https://elshaddaiprayerhouse.in/contact-us" />
</svelte:head>

<main class="">
	<Hero title="Contact Us"></Hero>

	<section class="content-bg p-10 pt-0">
		<div class="mx-auto flex max-w-7xl flex-col gap-20 text-2xl">
			<div class="flex flex-col gap-10">
				<p class="text-center">
					If you have any questions, suggestions, prayer requests or would like to get in touch with
					us, please feel free to reach out using the provided options. Click on the cards to
					redirect -
				</p>
				<ul class="flex flex-wrap justify-center gap-5">
					{#each contactMethods as item (item.label)}
						{@render contactCard({
							link: item.link,
							icon: item.icon,
							label: item.label,
							value: item.value
						})}
					{/each}
				</ul>
			</div>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.919297265528!2d78.52502177492121!3d17.477838400193658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98480eaaaaab%3A0xfba6f24cf12d2224!2sEl-Shaddai%20Prayer%20House!5e1!3m2!1sen!2sin!4v1749984491725!5m2!1sen!2sin"
				style="border:0;"
				allowfullscreen={true}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				title="El-Shaddai Prayer House Location"
				class="h-96 w-full rounded-lg shadow-lg"
			></iframe>
		</div>
	</section>
</main>

{#snippet contactCard(props: { link: string; icon: any; label: string; value: string })}
	<li
		class="w-full flex-1 shrink-0 place-content-center rounded-2xl border bg-white px-5 py-5 shadow-xl duration-200 hover:scale-110 hover:invert"
	>
		<a href={props.link} class="flex items-center gap-5" target="_blank" rel="noopener noreferrer">
			<div class="size-10 duration-1000">
				<props.icon></props.icon>
			</div>
			<div class="flex flex-col">
				<p>{props.label}:</p>
				<p class="font-semibold">{props.value}</p>
			</div>
		</a>
	</li>
{/snippet}
