<script>
	import { personal } from '$lib/data/content.js';
</script>

<section class="hero" id="top">
	<div class="hero-inner">
		<div class="hero-text">
			<p class="hero-label hero-animate hero-animate-delay-1">{personal.title}</p>
			<h1 class="hero-name hero-animate hero-animate-delay-2">{personal.name}</h1>
			<p class="hero-location hero-animate hero-animate-delay-3">{personal.location}</p>
			<p class="hero-tagline hero-animate hero-animate-delay-4">{personal.tagline}</p>
			<div class="hero-actions hero-animate hero-animate-delay-5">
				<a href="#about" class="btn btn-primary">Learn More</a>
				<a href="#experience" class="btn btn-outline">Experience</a>
			</div>
		</div>
		<div class="hero-photo-wrapper hero-animate hero-animate-delay-3">
			<img
				src={personal.photo}
				alt="Robert McFarlin"
				class="hero-photo"
				loading="eager"
			/>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding-inline: var(--space-6);
		padding-top: var(--nav-height);
		background:
			radial-gradient(ellipse at 20% 50%, rgba(0, 212, 170, 0.04) 0%, transparent 60%),
			var(--bg-primary);
	}

	.hero-inner {
		max-width: var(--max-width);
		margin-inline: auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-16);
		align-items: center;
	}

	.hero-label {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--accent-primary);
		margin-bottom: var(--space-4);
	}

	.hero-name {
		font-size: var(--text-5xl);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: var(--tracking-tight);
		margin-bottom: var(--space-3);
	}

	.hero-location {
		font-size: var(--text-base);
		color: var(--text-muted);
		margin-bottom: var(--space-6);
	}

	.hero-tagline {
		font-size: var(--text-lg);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-8);
		max-width: 480px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-sm);
		font-weight: 600;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.btn-primary {
		background: var(--accent-primary);
		color: var(--bg-primary);
	}

	.btn-primary:hover {
		background: var(--accent-secondary);
		color: var(--bg-primary);
		transform: translateY(-1px);
	}

	.btn-outline {
		border: 1.5px solid var(--border-accent);
		color: var(--accent-primary);
	}

	.btn-outline:hover {
		background: var(--accent-glow);
		transform: translateY(-1px);
	}

	.hero-photo-wrapper {
		display: flex;
		justify-content: center;
	}

	.hero-photo {
		width: 340px;
		height: 340px;
		object-fit: cover;
		border-radius: 16px;
		border: 2px solid var(--border-accent);
		box-shadow: 0 0 60px rgba(0, 212, 170, 0.08);
	}

	@media (max-width: 768px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: var(--space-10);
			text-align: center;
		}

		.hero-photo-wrapper {
			order: -1;
		}

		.hero-photo {
			width: 220px;
			height: 220px;
		}

		.hero-name {
			font-size: var(--text-4xl);
		}

		.hero-tagline {
			max-width: 100%;
		}

		.hero-actions {
			justify-content: center;
		}
	}
</style>
