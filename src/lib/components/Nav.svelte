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

	// Lock body scroll when menu is open
	$effect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	});

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

		const onKeydown = (e) => {
			if (e.key === "Escape" && menuOpen) {
				menuOpen = false;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("keydown", onKeydown);
		onScroll();

		sections.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("keydown", onKeydown);
			observer.disconnect();
			document.body.style.overflow = "";
		};
	});

	function handleNavClick(id) {
		menuOpen = false;
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	}

	function handleOverlayClick(e) {
		if (e.target === e.currentTarget) {
			menuOpen = false;
		}
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

		<ul class="nav-links-desktop">
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="mobile-menu-overlay" class:open={menuOpen} onclick={handleOverlayClick}>
	<ul class="mobile-menu-links">
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

	.nav-links-desktop {
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

	.mobile-menu-overlay {
		display: none;
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

		.nav-links-desktop {
			display: none;
		}

		.mobile-menu-overlay {
			display: block;
			position: fixed;
			top: var(--nav-height);
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
			background: rgba(10, 10, 15, 0.98);
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 0.3s ease,
				visibility 0.3s ease;
			overscroll-behavior: contain;
		}

		.mobile-menu-overlay.open {
			opacity: 1;
			visibility: visible;
		}

		.mobile-menu-links {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			list-style: none;
			gap: var(--space-4);
			height: 100%;
		}

		.mobile-menu-overlay.open li {
			animation: menuFadeIn 0.3s ease forwards;
			opacity: 0;
		}

		.mobile-menu-overlay.open li:nth-child(1) { animation-delay: 0.05s; }
		.mobile-menu-overlay.open li:nth-child(2) { animation-delay: 0.1s; }
		.mobile-menu-overlay.open li:nth-child(3) { animation-delay: 0.15s; }
		.mobile-menu-overlay.open li:nth-child(4) { animation-delay: 0.2s; }
		.mobile-menu-overlay.open li:nth-child(5) { animation-delay: 0.25s; }

		.mobile-menu-overlay .nav-link {
			font-size: var(--text-xl);
			padding: var(--space-3) var(--space-6);
		}
	}

	@keyframes menuFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
