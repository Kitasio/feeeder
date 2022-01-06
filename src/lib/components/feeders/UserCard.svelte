<script lang="ts">
	import { selectedAccount, connected } from 'svelte-web3';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { getTotalFunded, getUser } from '$lib/functions/feederFuncs';
	import { getUsdPrice } from '$lib/functions/priceFeedFuncs';
	import { redusedAddress } from '$lib/functions/helperFuncs';
	import Copy from '../copy.svelte';

	$: account = $connected ? $selectedAccount : '';
	let statistics = false;

	const usdPrice = async () => {
		const price = await getUsdPrice();
		const balance = await currentBalance();

		const currentBalanceUsd = price * balance;
		return parseInt((currentBalanceUsd / 10 ** 8).toString());
	};
	const currentBalance = async () => {
		const total = await getTotalFunded($page.params.address);
		const user = await getUser($page.params.address, account);
		let balance = (parseInt(total) * parseInt(user.allocation)) / 100 - parseInt(user.withdrawn);
		return parseFloat((balance / 10 ** 18).toFixed(4));
	};
	const totalIncome = async () => {
		const total = await getTotalFunded($page.params.address);
		const user = await getUser($page.params.address, account);
		let balance = (parseInt(total) * parseInt(user.allocation)) / 100;
		return parseFloat((balance / 10 ** 18).toFixed(4));
	};
</script>

<div in:fade class="w-full flex rounded-2xl bg-gray p-7 space-x-32">
	<div>
		<div>
			<div class="flex space-x-4 items-center">
				<img
					class="w-16 h-16 rounded-full border-2 border-green"
					src="https://avatars.dicebear.com/api/jdenticon/${account.toLowerCase()}.svg"
					alt=""
				/>
				<div>
					{#await getUser($page.params.address, account)}
						Waiting...
					{:then user}
                        <p class="text-xs font-medium opacity-80">{user['username']}</p>
					{/await}
					<div class="flex space-x-2 md:text-lg">
						<p class="font-sans">{redusedAddress(account)}</p>
						<Copy address={account} />
					</div>
				</div>
			</div>
			<div class="mt-2">
				<p class="text-xs font-medium opacity-80">Your current balance</p>
				{#await currentBalance()}
					<div class="text-5xl text-green font-mono">Waiting...</div>
				{:then balance}
					<div class="text-5xl text-green font-sans font-bold">
						{balance}<span class="text-base font-sans ml-1">ETH</span>
					</div>
				{/await}
			</div>
			<div class="font-sans font-medium text-xs">
				{#await usdPrice()}
					<span>Waiting...</span>
				{:then price}
					<span>~${price}</span>
				{/await}
			</div>
		</div>
		<div class="flex justify-between mt-3">
			<a
				class="rounded-3xl font-medium px-5 py-2 border hover:border-green hover:bg-green hover:text-gray-dark transition duration-200"
				href={`/withdraw/${$page.params.address}`}>Withdraw</a
			>
		</div>
	</div>

	<div class="py-2 hidden xl:flex flex-col justify-between">
		<div>
			<p class="text-xs opacity-80">Your allocation</p>
			{#await getUser($page.params.address, account)}
				Waiting...
			{:then user}
				<span class="font-sans text-lg font-bold">{user.allocation}%</span>
			{/await}
		</div>
		<div>
			<p class="text-xs opacity-80">Total income</p>
			{#await totalIncome()}
				Waiting...
			{:then value}
				<span class="font-sans text-lg font-bold text-green"
					>{value}<span class="text-sm ml-1">ETH</span></span
				>
			{/await}
		</div>
		<div>
			<p class="text-sm opacity-80">Total withdrawn</p>
			{#await getUser($page.params.address, account)}
				Waiting...
			{:then user}
				<span class="font-sans text-lg font-bold text-red"
					>{parseFloat((user.withdrawn / 10 ** 18).toFixed(4))}<span class="text-sm ml-1">ETH</span
					></span
				>
			{/await}
		</div>
	</div>
</div>
