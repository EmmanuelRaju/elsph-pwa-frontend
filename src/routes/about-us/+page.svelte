<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<svelte:head>
	<title>ELSPH | About us</title>
	<meta name="description" content="About El Shaddai Prayer House" />
	<meta property="og:title" content="ELSPH | About us" />
	<meta property="og:description" content="About El Shaddai Prayer House" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:url" content="https://elshaddaiprayerhouse.in/about-us" />
</svelte:head>

<main class="">
	<Hero title="About us"></Hero>

	<section class="content-bg p-10 pt-0">
		<div class="mx-auto max-w-7xl">
			<p>
				Our assembly is one of the sister assemblies of the Indigenous Churches of India in the
				pattern established through the labour & ministry of <a
					href="https://www.brotherbakhtsingh.com/"
					target="_blank"
					class="underline">Brother Bakht Singh, India</a
				>
			</p>

			<p>
				Our desire is to put into practice and hold the tradition which we have been taught by our
				spiritual fathers through their life, teaching and ministry. (2 Thessalonians 2:15)
			</p>
			<p>
				On the Lord's Day (Sunday), our ministry encourages individual worship by saints,
				encompassed around the Lord's Table, and exhortation through the Word of God for salvation
				and spiritual growth. Children & youth have exclusive sessions on the Lord's Day. We have
				dedicated & responsible counsellors/ teachers who support this ministry.
			</p>
			<p>
				Added to this, we have Weekly Bible Study, Church Prayer, Sister's Ministry, Prayers Cells,
				Fasting & Prayers, Cottage meetings in various homes. Saints with specific burdens come to
				take part for Daily Morning Prayers. As a Church we witness in the neighbourhood and go
				out-stations as well for gospel once a month, with the Lord's enablement.
			</p>
			<p>
				Our goal is to reach the un-reached in many ways like Personal Evangelism, Literature
				Evangelism, and Open - Air Evangelism Etc. With His grace we endeavour to encourage our
				youth to be grounded in the Word and thus investing in the future.
			</p>
			<p>
				Saints trained and prepared by the Lord through this fellowship have been strong and
				steadfast in faith and are serving the Lord within the subcontinent (specially in the army
				units around the borders) & abroad (Saudi Arabia, Dammam, Iraq, United States, Australia,
				Botswana, Bahamas & Afghanistan).
			</p>
			<p>
				Therefore, we would like to share what we have and what we receive, and would appreciate if
				you please follow up the updates on messages, ministries and resources for your spiritual
				enlightenment and blessing.
			</p>
			<p>
				We covet your earnest prayer on our behalf that we may be found faithful to his heavenly
				calling.
			</p>
			<p>May the Lord richly bless you and make you fruitful in every good work.</p>
			<p>Yours in Christ,</p>
			<p class="font-bold">Church at El - Shaddai</p>
		</div>
	</section>
</main>

<style lang="postcss">
	p {
		@apply my-5 text-2xl md:text-justify;
	}
</style>
