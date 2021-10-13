<script>
    import { web3, selectedAccount, connected } from 'svelte-web3'
    import { getBalance, getName, getUser, feederABI, getTotalFunded } from '../functions/feederFuncs'
    import { ethusdABI, ethusdContract, ethusdContractRinkeby, ethusdABIRinkeby } from '../functions/priceFeedFuncs'
    import { redusedAddress } from '../functions/helperFuncs'

    export let address

    $: account = $connected ? $selectedAccount : ''
    $: feeder = $connected ? new $web3.eth.Contract(feederABI, address) : ''

    $: priceFeedContract = $connected ? new $web3.eth.Contract(ethusdABIRinkeby, ethusdContractRinkeby) : ''

    const getUsdPrice = async () => {
        const price = await priceFeedContract.methods.latestAnswer().call()
        const balance = await currentBalance()

        const currentBalanceUsd = price * balance
        return parseInt((currentBalanceUsd / 10**8).toString())
 
    }

    async function currentBalance() {
        const total = await getTotalFunded(feeder)
        const user = await getUser(feeder, account)
        let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
        return parseFloat((balance/10**18).toFixed(4))
    }
</script>

<a href={`/feeders/${address}`} class="bg-gray font-medium rounded-2xl flex flex-col justify-between border border-gray hover:border-green transition duration-200 h-64 p-5">
    <div>
        <div class="flex space-x-2 items-center">
            <p class="text-white text-lg cursor-pointer">{redusedAddress(address)}</p>
            <svg class="z-20" on:click={e => navigator.clipboard.writeText(address)} width="14" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".8" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2.5v9A1.5 1.5 0 0 0 5.5 13h6a1.5 1.5 0 0 0 1.5-1.5V4.931a1.5 1.5 0 0 0-.451-1.072l-2.487-2.431A1.5 1.5 0 0 0 9.014 1H5.5A1.5 1.5 0 0 0 4 2.5v0Z"/><path d="M10 13v1.5A1.5 1.5 0 0 1 8.5 16h-6A1.5 1.5 0 0 1 1 14.5V6.25a1.5 1.5 0 0 1 1.5-1.5H4"/></g></svg>
        </div>
        <div class="text-light-purple mt-1">
            {#await getName(feeder)}
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
        {#await getUsdPrice()}
            Waiting...
        {:then value} 
            <div>~${value}</div>
        {/await}
    </div>

    <div>
        <div class="text-2xl text-white">
            <p class="text-sm font-normal">Total account Balance</p>
            {#await getBalance(feeder)}
                Waiting...
            {:then value} 
                ETH {value/10**18}
            {/await}
        </div>
    </div>
</a>