<script>
	import { social, personal } from '$lib/data/content.js';
</script>

<footer class="footer" id="contact">
	<div class="footer-inner">
		<div class="footer-cta">
			<h3 class="cta-heading">Let's Connect</h3>
			<p class="cta-text">Interested in discussing finance, technology, or leadership? I'd love to hear from you.</p>
			<a href={social.linkedin} target="_blank" rel="noopener noreferrer" class="cta-button">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
				Connect on LinkedIn
			</a>
		</div>

		<div class="footer-bottom">
			<div class="social-links">
				<a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
					</svg>
				</a>
			</div>
			<p class="copyright">&copy; {new Date().getFullYear()} {personal.name}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: var(--space-16) var(--space-6) var(--space-12);
		background: var(--bg-secondary);
		border-top: 1px solid var(--border-subtle);
	}

	.footer-inner {
		max-width: var(--max-width);
		margin-inline: auto;
	}

	.footer-cta {
		text-align: center;
		padding-bottom: var(--space-12);
		margin-bottom: var(--space-8);
		border-bottom: 1px solid var(--border-subtle);
	}

	.cta-heading {
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.cta-text {
		font-size: var(--text-base);
		color: var(--text-secondary);
		margin-bottom: var(--space-6);
		max-width: 480px;
		margin-inline: auto;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--bg-primary);
		background: var(--accent-primary);
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.cta-button:hover {
		background: var(--accent-secondary);
		color: var(--bg-primary);
		transform: translateY(-1px);
	}

	.footer-bottom {
		text-align: center;
	}

	.social-links {
		display: flex;
		justify-content: center;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	.social-links a {
		color: var(--text-muted);
		transition: color 0.2s ease, transform 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 10px;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-subtle);
	}

	.social-links a:hover {
		color: var(--accent-primary);
		transform: translateY(-2px);
		border-color: var(--border-accent);
	}

	.copyright {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}
</style>
