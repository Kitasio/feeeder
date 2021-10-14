<script>
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import { getName, avaliableBalance, withdrawInETH } from "../../functions/feederFuncs";
    import { connected, selectedAccount } from "svelte-web3"

    $: account = $connected ? $selectedAccount : ''

    let eth
</script>

<div class="p-5 h-screen">
    <h1 class="text-center text-4xl text-green uppercase">withdraw</h1>

    <div class="rounded-xl sm:bg-gray sm:p-5 lg:p-10 md:w-7/12 lg:w-1/2 2xl:w-4/12 md:mx-auto mt-10 lg:h-5/6 flex flex-col justify-between">
        <div class="overflow-hidden">

            <div>
                <h1 class="text-2xl font-medium">From</h1>
                <div class="flex space-x-4 mt-5 border-b border-green pb-10">
                    <img in:fade class="object-cover inline h-12 w-12 rounded-full mb-1" src="https://avatars.dicebear.com/api/jdenticon/${$page.params.address}.svg" alt="">
                    <div>
                        <p class="-mt-1">{$page.params.address}</p>
                        {#await getName($page.params.address)}
                        ... 
                        {:then name} 
                        <p class="mt-3" in:fade>{name}</p>
                        {/await}
                    </div>
                </div>
            </div>

            <div>
                <h1 class="text-2xl font-medium mt-10">To</h1>
                <div class="flex items-center space-x-4 mt-5 border-b border-green pb-10">
                    <img in:fade class="object-cover inline h-12 w-12 rounded-full mb-1" src="https://avatars.dicebear.com/api/jdenticon/${account}.svg" alt="">
                    <p class="">{account}</p>
                </div>
            </div>

            <div class="border-b border-green pb-10">
                <h1 class="text-2xl font-medium mt-10">Value</h1>
                <div class="flex items-center mt-5 space-x-4">
                    <input bind:value={eth} type="text" class="input border">
                    <p>ETH</p>
                </div>
                <div class="mt-2">
                    {#await avaliableBalance($page.params.address, account) then balance}
                        <p in:fade>Avaliable {balance} ETH</p>
                    {/await}
                </div>
            </div>

            <div class="flex items-center justify-center mt-10">
                <button on:click={() => withdrawInETH(eth, $page.params.address, account)} class="btn">send</button>
            </div>
        </div>
    </div>
</div>