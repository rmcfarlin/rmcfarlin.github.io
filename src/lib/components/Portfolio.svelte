<script>
	import { portfolio } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section" id="portfolio">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">Portfolio</p>
			<h2 class="section-heading">Selected Work</h2>
		</ScrollReveal>

		<div class="portfolio-grid">
			{#each portfolio as item, i}
				<ScrollReveal delay={i * 100}>
					<a href={item.link} class="portfolio-card" target="_blank" rel="noopener noreferrer">
						<div class="card-top">
							<span class="card-type">{item.type}</span>
							<svg class="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<h3 class="card-title">{item.title}</h3>
						<p class="card-desc">{item.description}</p>
					</a>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	.portfolio-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-6);
		background: var(--bg-secondary);
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
		transition: border-color 0.3s ease, transform 0.3s ease;
		color: inherit;
		height: 100%;
	}

	.portfolio-card:hover {
		border-color: var(--accent-primary);
		transform: translateY(-2px);
		color: inherit;
	}

	.portfolio-card:hover .arrow-icon {
		transform: translate(2px, -2px);
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
	}

	.card-type {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--accent-primary);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	.arrow-icon {
		color: var(--text-muted);
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.portfolio-card:hover .arrow-icon {
		color: var(--accent-primary);
	}

	.card-title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.card-desc {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: var(--leading-normal);
		flex: 1;
	}

	@media (max-width: 768px) {
		.portfolio-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
