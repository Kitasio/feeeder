<script>
    import { selectedAccount, connected } from 'svelte-web3'
    import { getBalance, getName, getUser, getTotalFunded } from '../functions/feederFuncs'
    import { getUsdPrice } from '../functions/priceFeedFuncs'
    import { redusedAddress } from '../functions/helperFuncs'
    import { goto } from '$app/navigation';
    import Copy from '../components/copy.svelte'

    export let feederAddress

    $: account = $connected ? $selectedAccount : ''

    const usdPrice = async () => {
        const price = await getUsdPrice()
        const balance = await currentBalance()

        const currentBalanceUsd = price * balance
        return parseInt((currentBalanceUsd / 10**8).toString())
 
    }

    async function currentBalance() {
        const total = await getTotalFunded(feederAddress)
        const user = await getUser(feederAddress, account)
        let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
        return parseFloat((balance/10**18).toFixed(4))
    }
</script>

<div on:click={() => goto(`/feeders/${feederAddress}`)} class="bg-gray cursor-pointer relative font-medium rounded-2xl flex flex-col justify-between border border-gray hover:border-green transition duration-200 h-64 p-5">
    <div>
        <div class="flex space-x-2 items-center">
            <p class="text-white text-lg cursor-pointer">{redusedAddress(feederAddress)}</p>
            <Copy address={feederAddress}></Copy>
        </div>
        <div class="text-light-purple mt-1">
            {#await getName(feederAddress)}
                Waiting...
            {:then name} 
                <span>{name}</span>
            {/await}
        </div>
    </div>

    <div>
        <p class="text-sm font-normal">Your current Balance</p>
        {#await currentBalance()}
            Waiting...
        {:then value} 
            <div class="text-green text-3xl">{value}<span class="ml-2 text-sm">ETH</span></div>
        {/await}
        {#await usdPrice()}
            Waiting...
        {:then value} 
            <div>~${value}</div>
        {/await}
    </div>

    <div>
        <div class="text-2xl text-white">
            <p class="text-sm font-normal">Total account Balance</p>
            {#await getBalance(feederAddress)}
                Waiting...
            {:then value} 
                ETH {parseFloat((value/10**18).toFixed(4))}
            {/await}
        </div>
    </div>
</div>