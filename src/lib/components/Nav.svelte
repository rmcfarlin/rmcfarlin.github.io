<script>
	import { personal } from "$lib/data/content.js";

	const sections = [
		{ id: "about", label: "About" },
		{ id: "experience", label: "Experience" },
		{ id: "education", label: "Education" },
		{ id: "skills", label: "Skills" },
		{ id: "values", label: "Values" },
	];

	let scrolled = $state(false);
	let activeSection = $state("");
	let menuOpen = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 20;
		};

		const observerOptions = {
			rootMargin: "-20% 0px -70% 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		sections.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => {
			window.removeEventListener("scroll", onScroll);
			observer.disconnect();
		};
	});

	function handleNavClick(id) {
		menuOpen = false;
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	}
</script>

<nav class="nav" class:scrolled aria-label="Main navigation">
	<div class="nav-inner">
		<a
			href="#top"
			class="nav-logo"
			onclick={(e) => {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
		>
			Robert McFarlin
		</a>

		<button
			class="nav-toggle"
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="hamburger" class:open={menuOpen}></span>
		</button>

		<ul class="nav-links" class:open={menuOpen}>
			{#each sections as { id, label }}
				<li>
					<button
						class="nav-link"
						class:active={activeSection === id}
						onclick={() => handleNavClick(id)}
					>
						{label}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-height);
		display: flex;
		align-items: center;
		background: rgba(10, 10, 15, 0.6);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid transparent;
		transition:
			background 0.3s ease,
			border-color 0.3s ease;
	}

	.nav.scrolled {
		background: rgba(10, 10, 15, 0.9);
		border-bottom-color: var(--border-subtle);
	}

	.nav-inner {
		max-width: var(--max-width);
		width: 100%;
		margin-inline: auto;
		padding-inline: var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}

	.nav-logo:hover {
		color: var(--accent-primary);
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: var(--space-1);
	}

	.nav-link {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-secondary);
		padding: var(--space-2) var(--space-3);
		border-radius: 6px;
		transition:
			color 0.2s ease,
			background 0.2s ease;
		position: relative;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.nav-link.active {
		color: var(--accent-primary);
	}

	.nav-link.active::after {
		content: "";
		position: absolute;
		bottom: 2px;
		left: var(--space-3);
		right: var(--space-3);
		height: 2px;
		background: var(--accent-primary);
		border-radius: 1px;
	}

	.nav-toggle {
		display: none;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
	}

	.hamburger {
		display: block;
		width: 20px;
		height: 2px;
		background: var(--text-primary);
		position: relative;
		transition: background 0.2s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: "";
		position: absolute;
		width: 20px;
		height: 2px;
		background: var(--text-primary);
		left: 0;
		transition: transform 0.3s ease;
	}

	.hamburger::before {
		top: -6px;
	}

	.hamburger::after {
		top: 6px;
	}

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		transform: translateY(6px) rotate(45deg);
	}

	.hamburger.open::after {
		transform: translateY(-6px) rotate(-45deg);
	}

	@media (max-width: 768px) {
		.nav-toggle {
			display: flex;
		}

		.nav-links {
			position: fixed;
			top: var(--nav-height);
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(10, 10, 15, 0.98);
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--space-4);
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 0.3s ease,
				visibility 0.3s ease;
		}

		.nav-links.open {
			opacity: 1;
			visibility: visible;
		}

		.nav-link {
			font-size: var(--text-xl);
			padding: var(--space-3) var(--space-6);
		}
	}
</style>
