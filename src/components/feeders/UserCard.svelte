<script>
    import { selectedAccount, connected } from 'svelte-web3'
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { getTotalFunded, getUser } from '../../functions/feederFuncs'
    import { getUsdPrice } from '../../functions/priceFeedFuncs'
    import { redusedAddress } from "../../functions/helperFuncs"
    import Copy from "../copy.svelte";
    
    $: account = $connected ? $selectedAccount : ''
    let statistics = false
    
    const usdPrice = async () => {
        const price = await getUsdPrice()
        const balance = await currentBalance()

        const currentBalanceUsd = price * balance
        return parseInt((currentBalanceUsd / 10**8).toString())
 
    }
    const currentBalance = async () => {
        const total = await getTotalFunded($page.params.address)
        const user = await getUser($page.params.address, account)
        let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
        return parseFloat((balance/10**18).toFixed(4))
    }
    const totalIncome = async () => {
        const total = await getTotalFunded($page.params.address)
        const user = await getUser($page.params.address, account)
        let balance = ((parseInt(total) * parseInt(user.allocation)) / 100)
        return parseFloat((balance/10**18).toFixed(4))
    }
</script>

{#if statistics}
<div in:fade class="w-full flex flex-col justify-between rounded-xl bg-gray p-5">
    <div>
        <p class="text-sm opacity-80">Your allocation</p>
        {#await getUser($page.params.address, account)}
            Waiting...
        {:then user} 
            <span class="font-sans text-2xl font-medium">{user.allocation}%</span>
        {/await}
    </div>
    <div class="mt-6">
        <p class="text-sm opacity-80">Total income</p>
        {#await totalIncome()}
            Waiting...
        {:then value} 
            <span class="font-sans text-2xl font-medium text-green">{value}<span class="text-sm"> ETH</span></span>
        {/await}
    </div>
    <div class="mt-6 flex justify-between">
        <div>
            <p class="text-sm opacity-80">Total withdrawn</p>
            {#await getUser($page.params.address, account)}
                Waiting...
            {:then user} 
                <span class="font-sans text-2xl font-medium text-red">{parseFloat((user.withdrawn / 10**18).toFixed(4))}<span class="text-sm"> ETH</span></span>
            {/await}
        </div>
        <button on:click={() => statistics = false} class="text-sm mr-2 opacity-80 uppercase hover:text-green transition duration-200">balance</button>
    </div>
</div>
{:else} 
<div in:fade class="w-full flex flex-col rounded-xl bg-gray p-5">
    <div>
        <div class="flex space-x-4">
            <img class="w-14 h-14 rounded-full border border-green" src="https://avatars.dicebear.com/api/jdenticon/${account}.svg" alt="">
            <div class="flex space-x-2">
                <p class="font-sans">{redusedAddress(account)}</p>
                <Copy address={account}></Copy>
            </div>
        </div>
        <div class="mt-5">
            <p class="text-sm opacity-80">Your current balance</p>
            {#await currentBalance()}
                <div class="text-3xl text-green font-mono">Waiting...</div>
            {:then balance}
                <div class="text-3xl text-green font-sans">{balance}<span class="text-sm ml-2">ETH</span></div>
            {/await}
        </div>
        <div class="mb-3">
            {#await usdPrice()}
                <span>Waiting...</span>
            {:then price}
                <span class="font-sans">~${price}</span>
            {/await}
        </div>
    </div>
    <div class="flex justify-between">
        <a class="rounded-full font-medium px-5 py-2 border hover:border-green hover:bg-green hover:text-gray-dark transition duration-200" href={`/withdraw/${$page.params.address}`}>Withdraw</a>
        <button on:click={() => statistics = true} class="text-sm mr-2 opacity-80 uppercase hover:text-green transition duration-200">statistics</button>
    </div>
</div>
{/if}