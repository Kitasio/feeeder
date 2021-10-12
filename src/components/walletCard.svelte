<script>
    import { web3, selectedAccount, connected } from 'svelte-web3'
    import {getBalance, getName, feederABI} from '../functions/feederFuncs'
    import {redusedAddress} from '../functions/helperFuncs'

    export let address

    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000'
    $: feeder = $connected ? new $web3.eth.Contract(feederABI, address) : ''
</script>

<a href={`/feeders/${address}`} class="bg-gray rounded-2xl flex flex-col justify-between border border-gray hover:border-green transition duration-200 h-64 p-5">
    <div>
        <p class="text-white text-lg cursor-pointer" on:click|self={e => navigator.clipboard.writeText(address)}>{redusedAddress(address)}</p>
        <div class="text-light-purple">
            {#await getName(feeder)}
                Waiting...
            {:then value} 
                <span>{value}</span>
            {/await}
        </div>
    </div>
    <div>
        <div class="text-2xl text-white font-bold">
            {#await getBalance(feeder)}
                Waiting...
            {:then value} 
                ETH {value/10**18}
            {/await}
        </div>
    </div>
</a>