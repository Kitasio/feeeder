<script>
    import { getAllMembers } from '../../functions/feederFuncs'
    import { page } from '$app/stores';
</script>
<div class="w-full rounded-xl bg-gray p-5">
{#await getAllMembers($page.params.address)}
    Waiting...
{:then members} 
    <div class="flex space-x-4">
    {#each members as member}
        <img class="w-10 h-10 rounded-full border border-green" src="https://avatars.dicebear.com/api/identicon/${member.toLowerCase()}.svg" alt="">
    {/each}
    </div>
{/await}
</div>