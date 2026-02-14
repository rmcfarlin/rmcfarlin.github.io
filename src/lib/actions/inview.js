export function inview(node, params = {}) {
	const { threshold = 0.2, rootMargin = '0px', once = true } = params;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					if (once) observer.unobserve(node);
				} else if (!once) {
					node.classList.remove('in-view');
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
