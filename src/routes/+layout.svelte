<script>
	import '$lib/styles/typography.css';
	import '$lib/styles/global.css';
	import '$lib/styles/animations.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<Nav />
<main>
	{@render children()}
</main>
<Footer />
