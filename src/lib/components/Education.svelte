<script>
	import { education, continuingEducation } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';
</script>

<section class="section education-section" id="education">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">Education</p>
			<h2 class="section-heading">Academic Background</h2>
		</ScrollReveal>

		<div class="education-grid">
			{#each education as edu, i}
				<ScrollReveal animation={i === 0 ? 'slide-left' : 'slide-right'} delay={i * 120} fullHeight>
					<div class="education-card">
						<div class="card-accent"></div>
						<div class="card-body">
							<h3 class="degree">{edu.degree}</h3>
							{#if edu.concentration}
								<p class="concentration">{edu.concentration}</p>
							{/if}
							<p class="institution">{edu.institution}</p>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<ScrollReveal delay={200}>
			<div class="continuing-ed">
				<h3 class="continuing-ed-heading">Continuing Education</h3>
				<div class="ce-grid">
					{#each continuingEducation as course, i}
						<div class="ce-item" style="transition-delay: {i * 60}ms">
							<span class="ce-title">{course.title}</span>
							<span class="ce-source">{course.source}</span>
						</div>
					{/each}
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<style>
	.education-section {
		background: var(--bg-secondary);
	}

	.education-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	.education-card {
		display: flex;
		height: 100%;
		background: var(--bg-tertiary);
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
		overflow: hidden;
		transition: border-color 0.3s ease, transform 0.3s ease;
	}

	.education-card:hover {
		border-color: var(--border-accent);
		transform: translateY(-2px);
	}

	.card-accent {
		width: 4px;
		background: var(--accent-primary);
		flex-shrink: 0;
	}

	.card-body {
		padding: var(--space-6) var(--space-8);
	}

	.degree {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.concentration {
		font-size: var(--text-sm);
		color: var(--accent-primary);
		margin-bottom: var(--space-2);
		font-weight: 500;
	}

	.institution {
		font-size: var(--text-base);
		color: var(--text-secondary);
	}

	.continuing-ed {
		margin-top: var(--space-12);
	}

	.continuing-ed-heading {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
	}

	.ce-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-3);
	}

	.ce-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		background: var(--bg-tertiary);
		border-radius: 8px;
		border: 1px solid var(--border-subtle);
		transition: border-color 0.2s ease;
	}

	.ce-item:hover {
		border-color: var(--border-accent);
	}

	.ce-title {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		flex: 1;
	}

	.ce-source {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-primary);
		white-space: nowrap;
		flex-shrink: 0;
	}

	@media (max-width: 1024px) {
		.ce-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.education-grid {
			grid-template-columns: 1fr;
		}

		.ce-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
