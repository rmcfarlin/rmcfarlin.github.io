<script>
	import { inview } from '$lib/actions/inview.js';

	let { animation = 'fade-up', delay = 0, threshold = 0.2, fullHeight = false, children } = $props();
</script>

<div
	class="scroll-reveal {animation}"
	class:full-height={fullHeight}
	style="transition-delay: {delay}ms"
	use:inview={{ threshold }}
>
	{@render children()}
</div>

<style>
	.full-height {
		height: 100%;
	}
</style>
