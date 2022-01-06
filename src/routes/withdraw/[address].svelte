<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { getName, avaliableBalance, withdrawInETH, getUser } from '$lib/functions/feederFuncs';
	import Nav from '$lib/components/nav/Nav.svelte';
	import { redusedAddress } from '$lib/functions/helperFuncs';
	import { connected, selectedAccount } from 'svelte-web3';
	import Copy from '$lib/components/copy.svelte';
	import { getUsdPrice } from '$lib/functions/priceFeedFuncs';
	import { onMount } from 'svelte';

	$: account = $connected ? $selectedAccount : '';

	let eth;

	let avaliableETH = 0;
	$: avaliableUSD = ((parseInt(usdPrice) * eth) / 10 ** 8).toString();
	$: usdPrice = '';
	onMount(async () => {
		usdPrice = await getUsdPrice();
		const acc = await $selectedAccount;
		avaliableETH = await avaliableBalance($page.params.address, acc);
		// avaliableUSD = ((parseInt(usdPrice) * avaliableETH) / 10 ** 8).toString();
	});
</script>

<div class="p-5 h-screen">
	<Nav />
	<div class="sm:p-5 mx-auto max-w-2xl mt-6">
		<div class="overflow-hidden">
			<div>
				<h1 class="text-2xl font-medium">From</h1>
				<div class="flex gap-x-4 mt-5 border-b border-green pb-6">
					<img
						in:fade
						class="object-cover border-2 border-slate-200 inline h-16 w-16 rounded-full mb-1"
						src="https://avatars.dicebear.com/api/identicon/${$page.params.address}.svg"
						alt=""
					/>
					<div class="flex flex-col justify-center">
						{#await getName($page.params.address)}
							<p class="text-xs opacity-80" in:fade>Loading...</p>
						{:then name}
							<p class="text-xs opacity-80" in:fade>{name}</p>
						{/await}
						<div class="flex space-x-2">
							<p class="font-sans">{redusedAddress($page.params.address)}</p>
							<Copy address={$page.params.address} />
						</div>
					</div>
				</div>
			</div>

			<div>
				<h1 class="text-2xl font-medium mt-6">To</h1>
				<div class="flex items-center space-x-4 mt-5 border-b border-green pb-10">
					<img
						in:fade
						class="object-cover border-2 border-slate-200 inline h-16 w-16 rounded-full mb-1"
						src="https://avatars.dicebear.com/api/jdenticon/${account}.svg"
						alt=""
					/>
					<div class="flex flex-col justify-center">
						{#await getUser($page.params.address, account)}
							<p class="text-xs opacity-80" in:fade>Loading...</p>
						{:then user}
							<p class="text-xs opacity-80" in:fade>{user['username']}</p>
						{/await}
						<div class="flex space-x-2">
							<p class="font-sans">{redusedAddress(account)}</p>
							<Copy address={account} />
						</div>
					</div>
				</div>
			</div>

			<div class="border-b border-green pb-6">
				<h1 class="text-2xl font-medium mt-6">Value</h1>
				<div class="mt-2 font-sans text-xs">
					{#await avaliableBalance($page.params.address, account) then balance}
						<p in:fade>Avaliable {balance} ETH</p>
					{/await}
				</div>
				<div class="flex items-center mt-4 gap-x-2">
					<input
						bind:value={eth}
						type="text"
						placeholder="Amount"
						class="border font-sans w-44 border-white rounded-full px-5 bg-transparent h-12 focus:ring-0 focus:border-green"
					/>
					<img class="w-5 h-5" src="/eth.svg" alt="" />
				</div>
				{#if avaliableUSD != 'NaN'}
					<p class="font-sans text-xs opacity-80 mt-4">~${parseInt(avaliableUSD) || ''}</p>
				{/if}
			</div>

			<div class="flex items-center justify-center mt-6">
				<button on:click={() => withdrawInETH(eth, $page.params.address, account)} class="btn"
					>confirm</button
				>
			</div>
		</div>
	</div>
</div>
