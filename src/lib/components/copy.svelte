<script>
	import { fly } from 'svelte/transition';

	export let address;

	function copy() {
		navigator.clipboard.writeText(address);
		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 500);
	}
	let showCopied = false;
</script>

<div class="flex space-x-2 relative">
	<svg
		class="stroke-current stroke-1 transition duration-300 hover:rotate-6 hover:text-green w-6 h-6 cursor-pointer"
		on:click|stopPropagation={copy}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
		/>
	</svg>
	{#if showCopied}
		<p
			in:fly={{ y: 10, duration: 200 }}
			out:fly={{ y: -10, duration: 200 }}
			class="text-xs text-green absolute left-5"
		>
			Copied!
		</p>
	{/if}
</div>
