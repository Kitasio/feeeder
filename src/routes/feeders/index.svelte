<script>
    import Nav from "/src/components/nav/Nav.svelte";
    import WalletCard from "/src/components/walletCard.svelte";
    import { fade } from "svelte/transition";
    import { selectedAccount, connected } from "svelte-web3"
    import { getAddresses } from "../../functions/feederFuncs";
</script>

<div class="p-5">
    <Nav></Nav>

    <div class="w-80 sm:w-10/12 xl:w-9/12 mx-auto mt-20">
    {#if $connected}
        {#await getAddresses($selectedAccount)}
            waiting...
        {:then feeders} 
            <div in:fade class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {#each feeders as feeder}
                <WalletCard feederAddress={feeder}></WalletCard>
            {/each}
            </div>
        {/await}
    {/if}
    </div>
</div>