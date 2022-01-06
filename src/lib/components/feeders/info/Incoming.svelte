<script>
    import { page } from '$app/stores';
    import { getEtherscanHistory } from '$lib/functions/etherscanFuncs'
</script>

<div>
    {#await getEtherscanHistory($page.params.address)}
        Waiting...
    {:then data} 
        {console.log(data)}
        {#each data.result as tx (tx.blockHash)}
            <div>{tx.value}</div>
            {console.log(tx)}
        {/each}
    {/await}
</div>