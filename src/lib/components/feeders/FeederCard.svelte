<script>
    import { fade } from "svelte/transition";
    import { page } from "$app/stores";
    import { getBalance, getName } from '$lib/functions/feederFuncs'
    import { getUsdPrice } from '$lib/functions/priceFeedFuncs'
    import { redusedAddress } from "$lib/functions/helperFuncs"
    import Copy from "../copy.svelte";
    
    $: feederBalance = getBalance($page.params.address) || ''
    const usdPrice = async () => {
        const price = await getUsdPrice()
        let balance = await feederBalance
        balance = balance / 10**18
        const currentBalanceUsd = price * balance
        return parseInt((currentBalanceUsd / 10**8).toString())
    }
</script>

<div in:fade class="w-full flex flex-col rounded-xl bg-gray p-7">
    <div>
        <div class="flex space-x-4 items-center">
            <img class="w-16 h-16 rounded-full border-2 border-green" src="https://avatars.dicebear.com/api/identicon/${$page.params.address}.svg" alt="">
            <div>
                {#await getName($page.params.address) then name}
                    <p class="opacity-80 text-xs font-medium">{name}</p>
                {/await}
                <div class="flex space-x-2 md:text-lg">
                    <p class="font-sans">{redusedAddress($page.params.address)}</p>
                    <Copy address={$page.params.address}></Copy>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <p class="text-xs font-medium opacity-80">Total account balance</p>
            <div class="text-5xl font-sans font-bold">
            {#await getBalance($page.params.address)}
                Waiting...
            {:then balance}
                {parseFloat((balance/10**18).toFixed(4))}<span class="text-base font-sans ml-1">ETH</span>
            {/await}
            </div>
        </div>
        <div class="font-sans font-medium text-xs">
        {#await usdPrice()}
            Waiting...
        {:then price}
            ~${price}
        {/await}
        </div>
    </div>
</div>