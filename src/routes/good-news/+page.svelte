<script lang="ts">
	import Hero from '$lib/components/common/Hero.svelte';
	import { hidePageLoader } from '$lib/utils/common';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pageLoaded = await hidePageLoader();
	});
</script>

<main class="">
	<Hero title="Good News"></Hero>

	<section class="content-bg p-10">
		<div class="mx-auto max-w-4xl">
			<p>
				Psychologists have long known that every person has two great longings and inward needs. The
				first is to be loved, and the second is to love. But when pressures and heartaches come into
				our lives, many give up any hope of ever finding love.
			</p>

			<p>
				The tragedy is that we often look in the wrong places to fill this deep, deep need and
				longing. Some substitute lust for love. Others pursue material things or superficial
				relationships - all in the futile attempt to fill a God-shaped vacuum in the human heart.
			</p>

			<p>
				But there is good news! There is a love worth finding and a love worth sharing. The Bible
				says, "For God so loved the world, that He gave His only begotten Son, that whosoever
				believeth in Him should not perish, but have everlasting life" (John 3:16). On the cross of
				Christ, God's mighty love was revealed and offered unconditionally to all who would be
				saved. Do you long to know this mighty love? Then I need to ask you the most important
				question you'll ever be asked: Do you know beyond a shadow of a doubt that God loves you,
				that your sins are forgiven, and that you are saved and on your way to heaven? The great
				news is, you can know! Let me share with you how to discover the greatest love worth
				finding.
			</p>

			<p>
				<strong>Admit Your Sin</strong><br />
				First, you must admit that you are a sinner. The Bible says, "There is none righteous, no, not
				one" (Romans 3:10). "For all have sinned, and come short of the glory of God" (Romans 3:23).
				It is our sin that separates us from God and from fulfilling our deepest needs and longings.
				Sin is an offense against God that carries a serious penalty. According to Romans 6:23, "The
				wages of sin is death [eternal separation from the love and mercy of God]."
			</p>

			<p>
				<strong>Abandon Your Efforts</strong><br />
				Second, you must abandon any efforts to save yourself. If we could save ourselves, Jesus' death
				would have been unnecessary! Even "getting religion" cannot get you to heaven. The Bible says
				it is "not by works of righteousness which we have done, but according to His [God's] mercy He
				saved us" (Titus 3:5). Salvation is by God's grace, "not of works, lest any man should boast"
				(Ephesians 2:8-9).
			</p>

			<p>
				<strong>Acknowledge Christ's Payment</strong><br />
				What you cannot do for yourself, Jesus Christ has done for you! "But God commendeth His love
				toward us, in that, while we were yet sinners, Christ died for us" (Romans 5:8). He died on the
				cross for you and then rose from the dead to prove that His payment was acceptable to God. But
				you must acknowledge and believe this fact. "Believe on the Lord Jesus Christ, and thou shalt
				be saved" (Acts 16:31).
			</p>

			<p>
				<strong>Accept Christ as Your Savior</strong><br />
				Salvation is God's gift to you. "The gift of God is eternal life through Jesus Christ our Lord"
				(Romans 6:23). When someone offers you a priceless gift, the wisest thing you can do is accept
				it! This very moment, you can receive Christ's gift of salvation by sincerely praying this simple
				prayer from your heart: Dear God, I know that I am a sinner. I know that You love me and want
				to save me. Jesus, I believe You are the Son of God, who died on the cross to pay for my sins.
				I believe God raised You from the dead. I now turn from my sin and, by faith, receive You as
				my personal Lord and Savior. Come into my heart, forgive my sins, and save me, Lord Jesus. In
				Your name I pray, Amen.
			</p>
			<p>
				Friend, if you have not yet made a decision for Christ, I urge you to receive Him today.
			</p>

			<p><strong>Contact Email ID: pgdevadass@gmail.com or enoch.ephraim@gmail.com</strong></p>
		</div>
	</section>
</main>

<style lang="postcss">
	p {
		@apply my-5 text-justify text-2xl;
	}
</style>
