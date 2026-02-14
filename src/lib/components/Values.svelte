<script>
	import { values } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section values-section" id="values">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">Values</p>
			<h2 class="section-heading">Guiding Principles</h2>
		</ScrollReveal>

		<div class="values-grid">
			{#each values as value, i}
				<ScrollReveal animation="scale-in" delay={i * 80} fullHeight>
					<div class="value-card">
						<span class="value-number">{String(i + 1).padStart(2, '0')}</span>
						<p class="value-text">{value}</p>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.values-section {
		background: var(--bg-secondary);
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--space-4);
	}

	.value-card {
		position: relative;
		padding: var(--space-6) var(--space-4);
		height: 100%;
		background: var(--bg-tertiary);
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
		border-bottom: 2px solid var(--accent-primary);
		text-align: center;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		overflow: hidden;
	}

	.value-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 212, 170, 0.1);
	}

	.value-number {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--text-4xl);
		font-weight: 700;
		color: var(--accent-primary);
		opacity: 0.15;
		line-height: 1;
		margin-bottom: var(--space-3);
	}

	.value-text {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: var(--leading-normal);
		font-style: italic;
	}

	@media (max-width: 1024px) {
		.values-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.values-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.values-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
