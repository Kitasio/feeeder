<script>
    import Nav from "/src/components/nav/Nav.svelte";
    import WalletCard from "/src/components/walletCard.svelte";
    import { goto } from "$app/navigation";
    import { fade } from "svelte/transition";
    import { web3, selectedAccount, connected } from "svelte-web3"
    import { getAddresses, factoryABI, factoryContract } from "../../functions/feederFuncs";

    $: feederFactory = $connected ? new $web3.eth.Contract(factoryABI, factoryContract) : ''
</script>

<div class="p-5">
    <Nav></Nav>

    <div class="w-9/12 mx-auto mt-20">
    {#if $connected}
        {#await getAddresses(feederFactory, $selectedAccount)}
            waiting...
        {:then feeders} 
            <div in:fade class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {#each feeders as feeder}
                <WalletCard address={feeder}></WalletCard>
            {/each}
            </div>
        {/await}
    {/if}
    </div>
</div>