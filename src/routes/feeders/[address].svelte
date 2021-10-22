<script>
    import { connected } from 'svelte-web3'
    import FeederCard from "../../components/feeders/FeederCard.svelte";
    import UserCard from "../../components/feeders/UserCard.svelte";
    import MembersCard from '../../components/feeders/MembersCard.svelte';
    import Nav from "../../components/nav/Nav.svelte";
    import Tabs from '../../components/Tabs.svelte';
    import Incoming from '../../components/feeders/info/Incoming.svelte'
    import { fade } from "svelte/transition"

    let items = ['Incoming', 'Withdrawals', 'Statistics']
    let activeItem = 'Incoming'
    const tabChange = (e) => {
        activeItem = e.detail    
    }
</script>

<div class="p-5 h-screen">
    <Nav></Nav>
    {#if $connected}
    <div class="grid grid-rows-2 sm:grid-rows-6 mt-10">
        <div class="sm:row-span-2 grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:w-9/12 mx-auto">
            <UserCard></UserCard>
            <FeederCard></FeederCard>
            <MembersCard></MembersCard>
        </div>
        <div class="bg-gray  sm:row-span-4 p-5 pt-7 rounded-xl my-10 lg:w-9/12 mx-auto">
            <Tabs {activeItem} {items} on:tabChange={tabChange}/>
            <div class="mt-5">
            {#if activeItem === 'Incoming'}
                <div in:fade>
                    <Incoming />
                </div>
            {:else if activeItem === 'Withdrawals'}
                <div in:fade>Withdrawals</div>
            {:else}
                <div in:fade>Statistics</div>
            {/if}
            </div>
        </div>
    </div>
    {/if}
</div>