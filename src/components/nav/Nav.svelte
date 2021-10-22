<script>
    import NavLinks from "./NavLinks.svelte"
    import ConnLinks from "./ConnLinks.svelte"
    import ConnWallet from "./ConnWallet.svelte";
    import GoWallet from "./GoWallet.svelte"
    import { goto } from '$app/navigation';
    import { page } from "$app/stores";
    import { onMount, tick } from "svelte";
    import { connected, defaultChainStore } from "svelte-web3"

    onMount(() => {
        if ($page.path !== '/') {
            defaultChainStore.setBrowserProvider()
        }
    })

    const connect = async () => {
        await tick()
        await defaultChainStore.setBrowserProvider()
        goto('/feeders')
    }

</script>

<div class="flex justify-between leading-none">
    <a href="/" class="text-green text-lg sm:text-2xl font-black uppercase animate-fatten">Feeder</a>
    <div class="flex">
        <div class="flex items-center">
            {#if $connected}
            <ConnLinks></ConnLinks>
            {:else}    
            <NavLinks></NavLinks>
            {/if}
        </div>

        <div class="md:ml-32">
            {#if $connected}
            <ConnWallet></ConnWallet>
            {:else}
            <div on:click={connect}>
                <GoWallet></GoWallet>
            </div>
            {/if}
        </div>
    </div>
</div>
<!-- 
<div class="grid grid-cols-2 lg:grid-cols-nav">
    <div class="flex items-center justify-start">
        <a href="/" class="text-green text-2xl md:text-4xl font-black uppercase animate-fatten">Feeder</a>
    </div>

    {#if $connected}
    <ConnLinks></ConnLinks>
    {:else}    
    <NavLinks></NavLinks>
    {/if}

    {#if $connected}
    <ConnWallet></ConnWallet>
    {:else}
    <div on:click={connect}>
        <GoWallet></GoWallet>
    </div>
    {/if}
</div> -->