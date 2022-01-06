<script>
	import { connected } from 'svelte-web3';
	import FeederCard from '$lib/components/feeders/FeederCard.svelte';
	import UserCard from '$lib/components/feeders/UserCard.svelte';
	import MembersCard from '$lib/components/feeders/MembersCard.svelte';
	import Nav from '$lib/components/nav/Nav.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Incoming from '$lib/components/feeders/info/Incoming.svelte';
	import { fade } from 'svelte/transition';

	// let items = ['Incoming', 'Withdrawals', 'Statistics', 'Members']
	let items = ['Members'];
	let activeItem = 'Members';
	const tabChange = (e) => {
		activeItem = e.detail;
	};
</script>

<section class="p-7 h-screen grid grid-rows-feeder">
	<Nav />
	{#if $connected}
		<div class="sm:flex space-y-7 sm:space-y-0 sm:space-x-7 mt-8 md:mx-20">
			<div class="bg-gray rounded-2xl w-full xl:w-2/3"><UserCard /></div>
			<div class="bg-gray rounded-2xl w-full xl:w-1/3"><FeederCard /></div>
		</div>
		<div class="bg-gray h-64 rounded-2xl md:mx-20 mt-7 mb-10 p-7 overflow-x-scroll">
			<Tabs {activeItem} {items} on:tabChange={tabChange} />
			<div class="mt-7">
				{#if activeItem === 'Incoming'}
					<div in:fade>
						<Incoming />
					</div>
				{:else if activeItem === 'Withdrawals'}
					<div in:fade>Withdrawals</div>
				{:else if activeItem === 'Statistics'}
					<div in:fade>Statistics</div>
				{:else}
					<div in:fade><MembersCard /></div>
				{/if}
			</div>
		</div>
	{/if}
</section>


