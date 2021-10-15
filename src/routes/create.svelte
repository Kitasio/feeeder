<script>
    import { beforeUpdate, afterUpdate, onMount } from 'svelte'
    import { fade, fly } from 'svelte/transition';
    import { selectedAccount, connected, defaultChainStore } from "svelte-web3"
    import { flip } from 'svelte/animate';
    import { createFeeder } from '../functions/feederFuncs'
    import { isEthAddress } from '../functions/helperFuncs';
    import { goto } from '$app/navigation'

    onMount(async () => {
        await defaultChainStore.setBrowserProvider()
        if ($connected) {
            await $selectedAccount
            const member = {
                id: id++,
                address: $selectedAccount,
                allocation: 0,
            }
            members = [...members, member]
        }
    })

    let div
    let autoscroll;

    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    let feederName
    let id = 0;
    let members = []

    let remainingAllocation = 100
    let allocationSum = 0

    function resetValue(id) {
        if (allocationSum > 100) {
            let overflow = allocationSum - 100
            members[id].allocation -= overflow
        }
    }
    $: {
        feederNameErr = false
        feederName
    }
    $: {
        allocationSum = 0
        allocationErr = false
        members.map(e => allocationSum += parseInt(e.allocation))
        remainingAllocation = 100 - allocationSum
    }

    function newAddress() {
        const member = { id: id++, address: '', allocation: 0 }
        members = [...members, member]
    }
    function removeAddress(member) {
        members = members.filter(t => t !== member)
    }

    let inProgress = false
    let allocationErr = false
    let feederNameErr = false
    async function create() {
        if (!feederName) {
            feederNameErr = true
            return
        }
        if (remainingAllocation > 0) {
            allocationErr = true
            return
        }
        for (let i = 0; i < members.length; i++) {
            const addr = members[i].address;
            if (isEthAddress(addr) === false) {
                return
            }
        }
        if ($connected) {
            inProgress = true
            let addresses = members.map(e => e.address)
            let allocations = members.map(e => e.allocation)

            if (addresses.length !== allocations.length) {
                console.log('not equal lengths')
                return
            }
            await createFeeder(addresses, allocations, feederName, $selectedAccount)
            inProgress = false
            goto('/feeders')
        }
    }
</script>

<div bind:this={div} class="p-5 h-screen overflow-auto">
    <h1 class="text-center text-4xl text-green uppercase mt-10">create your feeder</h1>
    <div id="container" class="sm:p-5 lg:p-10 md:w-7/12 lg:w-1/2 2xl:w-4/12 md:mx-auto mt-10 lg:h-5/6 flex flex-col justify-between">
        <div>
            <h1 class="text-2xl font-medium">Feeder name</h1>
            <div class="flex mt-7 items-center space-x-5 border-b-2 border-green pb-12">
                <p class="w-5/12 text-xs sm:text-sm">Enter the name of your shared account. It will be visible to you and everyone else.</p>
                <input bind:value={feederName} class="{feederNameErr ? 'w-7/12 border-red border bg-transparent rounded-xl h-14 focus:ring-0 focus:border-red': 'w-7/12 border-green border bg-transparent rounded-xl h-14 focus:ring-0 focus:border-green'}" type="text" placeholder="Gill Bates..">
            </div>

            <div class="mt-10">
                <div class="flex justify-between">
                    <h1 class="text-2xl font-medium">Members</h1>
                    <h2 class="text-2xl font-medium">Allocation</h2>
                </div>
                <div class="flex justify-between">
                    <p class="w-5/12 text-xs sm:text-sm mt-2">Add members by their wallet address and set their allocations</p>
                    {#key remainingAllocation}
                    <p in:fly={{ y: -5, duration: 500, opacity: 0.7 }} class="{allocationErr ? 'text-red text-2xl mt-3 font-semibold': 'text-green text-2xl mt-3 font-semibold'}">{remainingAllocation}%</p>
                    {/key}
                </div>
            </div>

            <div class="mt-5 space-y-5">
            {#each members as member, key (member.id)}
                <div in:fade out:fade|local animate:flip="{{duration: 200}}" class="bg-gray relative w-full grid gap-3 grid-cols-12 py-8 px-5 rounded-xl">
                    <img on:click={() => removeAddress(member)} class="absolute top-5 right-5 cursor-pointer" src="/x.svg" alt="x">
                    <div class="col-span-2 flex flex-col justify-between items-center">
                        <p class="text-xs sm:text-sm text-center mr-1">You</p>
                        <img in:fade class="object-cover inline h-12 w-12 rounded-full mb-1" src="https://avatars.dicebear.com/api/jdenticon/${member.address}.svg" alt="">
                    </div>

                    <div class="col-span-10 space-y-1 mr-7">
                        <p class="text-xs sm:text-sm">Wallet address</p>
                        <input bind:value={member.address} type="text" class="{isEthAddress(member.address) ? 'bg-transparent focus:ring-0 focus:border-green rounded-xl h-14 w-full border border-gray-light' : 'bg-transparent focus:ring-0 focus:border-red rounded-xl h-14 w-full border'}">
                    </div>

                    <div class="col-start-3 col-end-13 mt-3">
                        <p>Allocation: {member.allocation}%</p>
                        <input bind:value={member.allocation} on:change={() => resetValue(key)} class="w-full" type="range">
                    </div>
                </div>
            {/each}
            </div>
            <div class="mt-10 cursor-pointer flex space-x-3 items-center text-green" on:click={newAddress}>
                <img src="/plus.svg" alt="">
                <p>Add another member</p>
            </div>

            {#if inProgress}
            <div in:fly={{y: 10, delay: 500}} class="flex justify-center my-5 space-x-3 items-center text-green font-medium text-xl uppercase">
                <img class="animate-spin" src="/spinner.svg" alt="">
                <p>creating feeder<p>
            </div>
            {:else}
            <div out:fly={{y: -10}} class="flex justify-center my-5">
                <button on:click={create} class="uppercase btn">create</button>
            </div>
            {/if}

        </div>
    </div>
</div>

<style>
input[type=range] {
  height: 24px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background-color: transparent;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #636E80;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #B2FF65;
  height: 18px;
  width: 18px;
  border-radius: 24px;
  background: #B2FF65;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #636E80;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #636E80;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #B2FF65;
  height: 18px;
  width: 18px;
  border-radius: 24px;
  background: #B2FF65;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #636E80;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #636E80;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #B2FF65;
  height: 18px;
  width: 18px;
  border-radius: 24px;
  background: #B2FF65;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #636E80;
}
input[type=range]:focus::-ms-fill-upper {
  background: #636E80;
}
</style>