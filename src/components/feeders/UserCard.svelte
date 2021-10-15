<script>
    import { selectedAccount, connected } from 'svelte-web3'
    import { page } from "$app/stores";
    import { getBalance, getName, getTotalFunded, getUser } from '../../functions/feederFuncs'
    import { getUsdPrice } from '../../functions/priceFeedFuncs'
    import { redusedAddress } from "../../functions/helperFuncs"
    import Copy from "../copy.svelte";
    
    $: account = $connected ? $selectedAccount : ''
    
    const usdPrice = async () => {
        const price = await getUsdPrice()
        const balance = await currentBalance()

        const currentBalanceUsd = price * balance
        return parseInt((currentBalanceUsd / 10**8).toString())
 
    }
    async function currentBalance() {
        const total = await getTotalFunded($page.params.address)
        const user = await getUser($page.params.address, account)
        let balance = ((parseInt(total) * parseInt(user.allocation)) / 100) - parseInt(user.withdrawn)
        return parseFloat((balance/10**18).toFixed(4))
    }
</script>

<div class="w-full flex flex-col rounded-xl bg-gray sm:mt-10 p-5">
    <div>
        <div class="flex space-x-4">
            <img class="w-14 h-14 rounded-full border border-green" src="https://avatars.dicebear.com/api/jdenticon/${account}.svg" alt="">
            <div class="flex space-x-2">
                <p>{redusedAddress(account)}</p>
                <Copy address={account}></Copy>
            </div>
        </div>
        <div class="mt-5">
            <p class="text-sm opacity-80">Your current balance</p>
            {#await currentBalance() then balance}
                <div class="text-3xl text-green">{balance}<span class="text-sm ml-2">ETH</span></div>
            {/await}
        </div>
        <div class="mb-5">
            {#await usdPrice() then price}
                <span>~${price}</span>
            {/await}
        </div>
    </div>
    <div class="flex">
        <a class="rounded-full font-medium px-7 py-3 border hover:border-green hover:bg-green hover:text-gray-dark transition duration-200" href={`/withdraw/${$page.params.address}`}>Withdraw</a>
    </div>
</div>