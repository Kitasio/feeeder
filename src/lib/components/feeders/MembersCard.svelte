<script>
	import { fade } from 'svelte/transition';
	import { selectedAccount } from 'svelte-web3';
	import { redusedAddress } from '$lib/functions/helperFuncs';
	import Copy from '../copy.svelte';
	import { getAllMembers } from '$lib/functions/feederFuncs';
	import { page } from '$app/stores';
	import { getUser } from '$lib/functions/feederFuncs';

	const listOfUsers = async () => {
		let users = [];
		const addresses = await getAllMembers($page.params.address);
		for (let i = 0; i < addresses.length; i++) {
			const element = addresses[i];
			let obj = await getUser($page.params.address, element);
			obj['address'] = element;
			users = [...users, obj];
		}
		return users;
	};
</script>

<div class="">
	{#await listOfUsers()}
		Loading...
	{:then members}
		<div in:fade class="space-y-5">
			{#each members as member}
				<div class="space-x-16 flex flex-nowrap">
					<div class="flex space-x-3 items-center flex-none w-32">
						<img
							class="w-9 h-9 rounded-full border-2 border-green"
							src="https://avatars.dicebear.com/api/jdenticon/${member.address.toLowerCase()}.svg"
							alt=""
						/>
						{#await getUser($page.params.address, member.address)}
							<p>Loading...</p>
						{:then user}
							<p>{user['username']}</p>
						{/await}
					</div>
					<div class="flex space-x-3 items-center flex-none w-40">
						<p class="font-sans opacity-80">{redusedAddress(member.address.toLowerCase())}</p>
						<Copy address={member.address} />
					</div>
                    <div class="flex space-x-3 items-center flex-none w-64 min-w-max">
                        <div class="w-full bg-gray-light rounded-full h-1">
                            <div class={$selectedAccount.toLowerCase() === member.address.toLowerCase() ? "bg-green h-1 rounded-full" : "bg-white h-1 rounded-full"} style="width: {member.allocation}%;" />
                        </div>
                        <p class="font-sans opacity-80">{member.allocation}%</p>
                    </div>
				</div>
			{/each}
		</div>
	{/await}
</div>
