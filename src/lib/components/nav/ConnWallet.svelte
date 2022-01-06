<script>
	import { selectedAccount, defaultChainStore } from 'svelte-web3';
	import { redusedAddress } from '$lib/functions/helperFuncs';
	import { fade, slide } from 'svelte/transition';

	function handleKey(event) {
		if (event.key == 'Escape') {
			dropdown = false;
		}
	}
	function closeDropdown() {
		if (dropdown) {
			dropdown = false;
		}
	}
	let dropdown = false;
	$: account = $selectedAccount || '0x0000000000000000000000000000000000000000';
</script>

<svelte:window on:keydown={handleKey} on:click={closeDropdown} />

<div in:fade class="relative flex items-center justify-end space-x-4">
	<a class="mr-5 btn-rounded" href="/create">create</a>
	<img
		on:click|stopPropagation={() => (dropdown = !dropdown)}
		class="cursor-pointer border-2 border-green object-cover inline h-12 w-12 rounded-full"
		src="https://avatars.dicebear.com/api/jdenticon/${account}.svg"
		alt=""
	/>
	<span class="hidden md:inline-block text-lg text-gray-light font-sans"
		>{redusedAddress(account)}</span
	>

	{#if dropdown}
		<div
			transition:slide={{ duration: 200 }}
			class="absolute z-20 shadow-md w-56 rounded-xl bg-gray top-16 p-5"
		>
			<div class="text-xl font-medium border-b-2 border-gray-light w-full mb-4 pb-4">
				<a href="/feeders">Feeders</a>
			</div>
			<button class="text-xl text-red font-medium" on:click={() => defaultChainStore.close()}
				>Disconnect</button
			>
		</div>
	{/if}
</div>
