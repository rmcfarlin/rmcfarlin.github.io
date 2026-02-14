<script>
	import { skills } from '$lib/data/content.js';
	import ScrollReveal from './ScrollReveal.svelte';

	const categories = [
		{ key: 'accounting', label: 'Accounting', icon: '📊' },
		{ key: 'software', label: 'Software', icon: '💻' },
		{ key: 'programming', label: 'Programming', icon: '⚡' }
	];
</script>

<section class="section" id="skills">
	<div class="section-inner">
		<ScrollReveal>
			<p class="section-label">Skills</p>
			<h2 class="section-heading">Expertise</h2>
		</ScrollReveal>

		<div class="skills-grid">
			{#each categories as category, ci}
				<ScrollReveal delay={ci * 120} fullHeight>
					<div class="skill-category">
						<h3 class="category-label">{category.label}</h3>
						<div class="category-divider"></div>

						{#if category.key === 'programming'}
							<div class="tag-list">
								{#each skills[category.key] as skill, si}
									<span class="skill-tag" style="transition-delay: {si * 50}ms">{skill}</span>
								{/each}
							</div>
						{:else}
							<ul class="skill-list">
								{#each skills[category.key] as skill}
									<li class="skill-item">{skill}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.skill-category {
		padding: var(--space-6);
		height: 100%;
		background: var(--bg-secondary);
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
	}

	.category-label {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
	}

	.category-divider {
		width: 32px;
		height: 2px;
		background: var(--accent-primary);
		margin-top: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.skill-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.skill-item {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		padding: var(--space-2) var(--space-3);
		border-left: 2px solid var(--border-subtle);
		transition: border-color 0.2s ease, color 0.2s ease;
	}

	.skill-item:hover {
		border-left-color: var(--accent-primary);
		color: var(--text-primary);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.skill-tag {
		display: inline-flex;
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--accent-primary);
		background: var(--accent-glow);
		border: 1px solid var(--border-accent);
		border-radius: 4px;
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.skill-tag:hover {
		background: rgba(0, 212, 170, 0.25);
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
