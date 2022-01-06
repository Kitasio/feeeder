<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { selectedAccount, connected, defaultChainStore } from 'svelte-web3';
	import { createFeeder } from '$lib/functions/feederFuncs';
	import { isEthAddress } from '$lib/functions/helperFuncs';
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/nav/Nav.svelte';

	onMount(async () => {
		await defaultChainStore.setBrowserProvider();
		if ($connected) {
			await $selectedAccount;
			const member = {
				id: id++,
				username: 'You',
				address: $selectedAccount,
				allocation: 0
			};
			members = [...members, member];
			activeMember = 0;
		}
	});

	let feederName;
	let id = 0;
	let members = [];
	let activeMember = 0;

	const changeActiveMember = (index) => {
		activeMember = index;
	};

	let remainingAllocation = 100;
	let allocationSum = 0;

	function resetValue(id) {
		if (allocationSum > 100) {
			let overflow = allocationSum - 100;
			members[id].allocation -= overflow;
		}
	}
	$: {
		feederNameErr = false;
		feederName;
	}
	$: {
		allocationSum = 0;
		allocationErr = false;
		members.map((e) => (allocationSum += parseInt(e.allocation)));
		remainingAllocation = 100 - allocationSum;
	}

	function newAddress() {
		if (!members[members.length - 1].username) {
			usernameErr = true;
			return;
		}
		usernameErr = false;
		if (!isEthAddress(members[members.length - 1].address)) {
			return;
		}
		const member = { id: id++, username: '', address: '', allocation: 0 };
		members = [...members, member];
	}
	function removeAddress(id) {
		activeMember = id - 1;
		members = members.filter((t) => t !== members[id]);
	}

	let inProgress = false;
	let allocationErr = false;
	let feederNameErr = false;
	let usernameErr = false;
	async function create() {
		if (!feederName) {
			feederNameErr = true;
			return;
		}
		if (remainingAllocation > 0) {
			allocationErr = true;
			return;
		}
		for (let i = 0; i < members.length; i++) {
			if (!members[i].username) {
				return;
			}
			const addr = members[i].address;
			if (isEthAddress(addr) === false) {
				return;
			}
		}
		if ($connected) {
			inProgress = true;
			let addresses = members.map((e) => e.address);
			let allocations = members.map((e) => e.allocation);
			let usernames = members.map((e) => e.username);

			if (addresses.length !== allocations.length) {
				console.log('not equal lengths');
				return;
			}
			await createFeeder(usernames, addresses, allocations, feederName, $selectedAccount);
			inProgress = false;
			goto('/feeders');
		}
	}
</script>

<div class="p-5 h-screen overflow-auto">
	<Nav />
	<!-- <h1 class="text-center text-4xl text-green uppercase 2xl:mt-10">create your feeder</h1> -->
	<div
		id="container"
		class="sm:p-5 mx-auto max-w-2xl mt-5"
	>
		<div>
			<h1 class="text-2xl font-medium">Feeder name</h1>
			<div class="flex mt-5 items-center space-x-5 border-b border-green pb-7">
				<p class="text-sm font-light">Enter the name of your shared wallet.</p>
				<input
					bind:value={feederName}
					class={feederNameErr
						? 'w-full border-red border bg-transparent rounded-full px-6 h-12 focus:ring-0 focus:border-red'
						: 'w-full border-gray-light border bg-transparent rounded-full px-6 h-12 focus:ring-0 focus:border-green'}
					type="text"
					placeholder="Feeder Name"
				/>
			</div>

			<div class="mt-5 border-b border-green pb-5">
				<div class="flex justify-between gap-x-10">
					<h1 class="text-2xl font-medium">Members</h1>
					<h2 class="text-2xl font-medium text-right">Allocation remaining</h2>
				</div>
				<div class="flex justify-between">
					<p class="w-1/2 text-sm font-light sm:text-sm mt-2 sm:w-1/3">
						Add members by their wallet address and set their allocations
					</p>
					{#key remainingAllocation}
						<p
							in:fly={{ y: -5, duration: 500, opacity: 0.7 }}
							class={allocationErr
								? 'text-red text-2xl mt-3 font-semibold font-sans'
								: 'text-green font-sans text-2xl mt-3 font-semibold'}
						>
							{remainingAllocation}%
						</p>
					{/key}
				</div>
			</div>

			<div class="flex flex-wrap mt-5 gap-x-5 gap-y-3">
				{#each members as member, index (index)}
					<div class="space-y-1 self-end cursor-pointer">
						<p class={member.id == members[activeMember]['id'] ? 'text-xs' : 'text-xs opacity-80'}>
							{member.username}
						</p>
						<div class="flex items-center gap-x-4">
							<div
								on:click={() => changeActiveMember(index)}
								class={member.id == members[activeMember]['id']
									? 'flex self-end p-[3px] items-center space-x-3 pr-3 border border-green rounded-full'
									: 'flex self-end p-[3px] items-center space-x-3 pr-3 border border-gray-light rounded-full'}
							>
								<img
									class="w-7 h-7 -m-1 rounded-full border border-green"
									src="https://avatars.dicebear.com/api/jdenticon/{member.address.toLowerCase()}.svg"
									alt=""
								/>
								<p class="font-sans text-xs -m-0.5">{member.allocation}%</p>
							</div>
							{#if member.id == members[activeMember]['id'] && members[activeMember]['id'] != 0}
								<img
									on:click={() => removeAddress(index)}
									in:fade
									class="w-2.5 h-2.5 mt-0.5"
									src="/x.svg"
									alt=""
								/>
							{/if}
						</div>
					</div>
				{/each}

				<button on:click={newAddress} class="flex self-end space-x-3">
					<img class="w-7 h-7" src="/plus.svg" alt="" />
					<span class="text-xs text-green self-center">Add new</span>
				</button>
			</div>

			<div class="mt-5 space-y-5">
				{#if members[activeMember]}
					<div class="bg-gray relative rounded-xl p-4 sm:p-7">
						<div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-7">
							<div class="sm:w-2/3">
								<img
									in:fade
									class="object-cover absolute h-12 w-12 border border-green rounded-full"
									src="https://avatars.dicebear.com/api/jdenticon/{members[
										activeMember
									].address.toLowerCase()}.svg"
									alt=""
								/>
								<input
									bind:value={members[activeMember].address}
									type="text"
									placeholder="Wallet"
									class={isEthAddress(members[activeMember].address)
										? 'pl-14 pr-4 text-sm bg-transparent focus:ring-0 focus:border-green rounded-full h-12 w-full border border-gray-light font-sans'
										: 'pl-14 pr-4 text-sm bg-transparent focus:ring-0 focus:border-red rounded-full h-12 w-full border border-red font-sans'}
								/>
							</div>
							<input
								bind:value={members[activeMember].username}
								type="text"
								maxlength="20"
								placeholder="Name"
								class={usernameErr && !members[activeMember].username
									? 'sm:w-1/3 px-4 text-sm bg-transparent focus:ring-0 focus:border-red rounded-full h-12 w-full border border-red font-sans'
									: 'sm:w-1/3 px-4 text-sm bg-transparent focus:ring-0 focus:border-green rounded-full h-12 w-full border border-gray-light font-sans'}
							/>
						</div>
						<div class="flex items-center gap-x-2 mt-4 sm:mt-7">
							<p class="mb-1 text-sm italic opacity-80">Allocation</p>
							<input
								bind:value={members[activeMember].allocation}
								on:change={() => resetValue(members[activeMember].id)}
								class="w-full"
								type="range"
							/>
						</div>
					</div>
				{/if}
			</div>

			{#if inProgress}
				<div
					in:fly={{ y: 10, delay: 500 }}
					class="flex justify-center my-5 space-x-3 items-center text-green font-medium text-xl uppercase"
				>
					<img class="animate-spin" src="/spinner.svg" alt="" />
					<p>creating feeder</p>
					<p />
				</div>
			{:else}
				<div out:fly={{ y: -10 }} class="flex justify-center my-5">
					<button on:click={create} class="uppercase btn">create</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	input[type='range'] {
		height: 24px;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
		background-color: transparent;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		animate: 0.2s;
		box-shadow: 0px 0px 0px #000000;
		background: #636e80;
		border-radius: 1px;
		border: 0px solid #000000;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #b2ff65;
		height: 18px;
		width: 18px;
		border-radius: 24px;
		background: #b2ff65;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -8px;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #636e80;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		animate: 0.2s;
		box-shadow: 0px 0px 0px #000000;
		background: #636e80;
		border-radius: 1px;
		border: 0px solid #000000;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #b2ff65;
		height: 18px;
		width: 18px;
		border-radius: 24px;
		background: #b2ff65;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #636e80;
		border: 0px solid #000000;
		border-radius: 2px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-fill-upper {
		background: #636e80;
		border: 0px solid #000000;
		border-radius: 2px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #b2ff65;
		height: 18px;
		width: 18px;
		border-radius: 24px;
		background: #b2ff65;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #636e80;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #636e80;
	}
</style>
