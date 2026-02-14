<script>
	import { experience } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section" id="experience">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">Experience</p>
			<h2 class="section-heading">Career Timeline</h2>
		</ScrollReveal>

		<div class="timeline">
			{#each experience as company, ci}
				<div class="timeline-company">
					<ScrollReveal delay={ci * 100}>
						<div class="company-header">
							<h3 class="company-name">{company.company}</h3>
							{#if company.industry}
								<span class="company-industry">{company.industry}</span>
							{/if}
						</div>
					</ScrollReveal>

					{#each company.roles as role, ri}
						<ScrollReveal delay={(ci * 100) + (ri * 80)}>
							<div class="timeline-entry" class:current={role.current}>
								<div class="timeline-dot"></div>
								<div class="timeline-content">
									<div class="role-header">
										<h4 class="role-title">{role.title}</h4>
										<span class="role-period">{role.period}</span>
									</div>
									{#if role.highlights && role.highlights.length > 0}
										<ul class="role-highlights">
											{#each role.highlights as highlight}
												<li>{highlight}</li>
											{/each}
										</ul>
									{/if}
								</div>
							</div>
						</ScrollReveal>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.timeline {
		position: relative;
		padding-left: var(--space-8);
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 7px;
		top: var(--space-8);
		bottom: var(--space-4);
		width: 2px;
		background: var(--border-subtle);
	}

	.timeline-company {
		margin-bottom: var(--space-10);
	}

	.company-header {
		padding-left: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.company-name {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
	}

	.company-industry {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-primary);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
	}

	.timeline-entry {
		position: relative;
		padding-left: var(--space-4);
		padding-bottom: var(--space-6);
	}

	.timeline-dot {
		position: absolute;
		left: calc(-1 * var(--space-8) + 3px);
		top: 6px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--bg-tertiary);
		border: 2px solid var(--border-subtle);
		transition: all 0.3s ease;
	}

	.timeline-entry.current .timeline-dot {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
		box-shadow: 0 0 12px var(--accent-glow);
	}

	.timeline-content {
		background: var(--bg-secondary);
		padding: var(--space-4) var(--space-6);
		border-radius: 10px;
		border: 1px solid var(--border-subtle);
		transition: border-color 0.3s ease;
	}

	.timeline-content:hover {
		border-color: var(--border-accent);
	}

	.role-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.role-title {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-primary);
	}

	.timeline-entry.current .role-title {
		color: var(--accent-primary);
	}

	.role-period {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.role-highlights {
		list-style: none;
		margin-top: var(--space-3);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.role-highlights li {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: var(--leading-normal);
		padding-left: var(--space-4);
		position: relative;
	}

	.role-highlights li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--accent-primary);
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.role-header {
			flex-direction: column;
			gap: var(--space-1);
		}
	}
</style>
