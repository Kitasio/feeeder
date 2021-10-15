<script>
    import { page } from "$app/stores";
    import { getBalance, getName } from '../../functions/feederFuncs'
    import { getUsdPrice } from '../../functions/priceFeedFuncs'
    import { redusedAddress } from "../../functions/helperFuncs"
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

<div class="w-full rounded-xl bg-gray mt-10 p-5">
    <div class="flex space-x-4 items-center">
        <img class="w-14 h-14 rounded-full border border-green" src="https://avatars.dicebear.com/api/identicon/${$page.params.address}.svg" alt="">
        <div class="space-y-1">
            <div class="flex space-x-2">
                <p>{redusedAddress($page.params.address)}</p>
                <Copy address={$page.params.address}></Copy>
            </div>
            {#await getName($page.params.address) then name}
                <p class="opacity-80">{name}</p>
            {/await}
        </div>
    </div>
    <div class="mt-5">
        <p class="text-sm opacity-80">Total account balance</p>
        {#await getBalance($page.params.address) then balance}
            <div class="text-3xl">{parseFloat((balance/10**18).toFixed(4))}<span class="text-sm ml-2">ETH</span></div>
        {/await}
    </div>
    <div>
        {#await usdPrice() then price}
            <span>~${price}</span>
        {/await}
    </div>
</div>