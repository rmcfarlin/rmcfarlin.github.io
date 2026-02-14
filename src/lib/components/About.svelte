<script>
	import { about, personal } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section about-section" id="about">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">About</p>
			<h2 class="section-heading">Background</h2>
		</ScrollReveal>

		{#each about.paragraphs as paragraph, i}
			<ScrollReveal delay={i * 100}>
				<p class="about-text">{paragraph}</p>
			</ScrollReveal>
		{/each}

		<ScrollReveal delay={300}>
			<div class="about-badge">
				<span class="badge">{personal.certifications[0]}</span>
			</div>
		</ScrollReveal>
	</div>
</section>

<style>
	.about-section {
		background: var(--bg-secondary);
	}

	.about-text {
		font-size: var(--text-lg);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin-bottom: var(--space-6);
		max-width: 720px;
	}

	.about-badge {
		margin-top: var(--space-8);
	}

	.badge {
		display: inline-flex;
		align-items: center;
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--accent-primary);
		background: var(--accent-glow);
		border: 1px solid var(--border-accent);
		border-radius: 6px;
	}
</style>
