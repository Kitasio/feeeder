<script>
    import { fade } from 'svelte/transition';
    import { redusedAddress } from '../../functions/helperFuncs';
    import Copy from '../copy.svelte';
    import { getAllMembers } from '../../functions/feederFuncs'
    import { page } from '$app/stores';
    import { getUser } from '../../functions/feederFuncs';

    const listOfUsers = async () => {
        let users = []
        const addresses = await getAllMembers($page.params.address)
        for (let i = 0; i < addresses.length; i++) {
            const element = addresses[i];
            let obj = await getUser($page.params.address, element)
            obj["address"] = element
            users = [...users, obj]
        }
        return users
    }

</script>
<div class="">
{#await listOfUsers()}
    Waiting...
{:then members} 
    <div in:fade class="space-y-3">
    {#each members as member}
        <div class="grid grid-cols-3 gap-5 lg:w-1/2">
            <div class="flex space-x-3 items-center">
                <img class="w-9 h-9 rounded-full border-2 border-green" src="https://avatars.dicebear.com/api/jdenticon/${member.address.toLowerCase()}.svg" alt="">
                <p>Frederico</p>
            </div>
            <div class="flex space-x-3 items-center">
                <p>{redusedAddress(member.address.toLowerCase())}</p>
                <Copy address={member.address} />
            </div>
            <div class="flex items-center">
                <progress class="block w-full" value={(parseInt(member.allocation) * 0.01)}></progress>
            </div>
        </div>
    {/each}
    </div>
{/await}
</div>