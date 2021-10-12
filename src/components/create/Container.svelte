<script>
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { beforeUpdate, afterUpdate } from 'svelte'

    let name
    let id = 0;
    let members = [
        { id: id++, address: 'test1', allocation: '20' },
        { id: id++, address: 'test2', allocation: '80' },
    ]

    function newAddress() {
        const member = {
            id: id++,
            address: '',
            allocation: '',
        }

        members = [...members, member]
    }
    function removeAddress(member) {
        members = members.filter(t => t !== member)
    }

    let div
    let autoscroll;

    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });
</script>

<div id="container" class="rounded-xl sm:bg-gray sm:p-5 lg:p-10 md:w-7/12 lg:w-1/2 2xl:w-4/12 md:mx-auto mt-10 lg:h-5/6 flex flex-col justify-between">
    <div bind:this={div} class="overflow-auto">
        <h1 class="text-2xl font-medium">Feeder name</h1>
        <div class="flex mt-7 items-center space-x-5 border-b-2 border-green pb-12">
            <p class="w-5/12 text-xs sm:text-sm">Enter the name of your shared account. It will be visible to you and everyone else.</p>
            <input bind:value={name} class="w-7/12 input border-green border" type="text" placeholder="Gill Bates..">
        </div>

        <div class="mt-10">
            <div class="flex justify-between">
                <h1 class="text-2xl font-medium">Birds</h1>
                <h2 class="text-2xl font-semibold text-green">3/5</h2>
            </div>
            <p class="w-5/12 text-xs sm:text-sm mt-2">Add members by their wallet address and set their allocations</p>

            {#each members as member (member.id)}
            <div transition:fade animate:flip="{{duration: 200}}" class="grid grid-cols-12 mt-5 gap-3">
                <div class="col-span-2 flex flex-col justify-between">
                    <p class="text-xs sm:text-sm">You</p>
                    <img class="object-cover inline h-12 w-12 rounded-full mb-1" src="https://avatars.dicebear.com/api/jdenticon/${member.address}.svg" alt="">
                </div>
                <div class="col-span-7 space-y-1">
                    <p class="text-xs sm:text-sm">Wallet address</p>
                    <input bind:value={member.address} type="text" class="input w-full border border-gray-light">
                </div>
                <div class="col-span-2 space-y-1">
                    <p class="text-xs sm:text-sm">Allocation</p>
                    <input bind:value={member.allocation} type="text" class="input w-full border border-gray-light">
                </div>
                <div on:click={() => removeAddress(member)} class="col-span-1 mt-6 cursor-pointer justify-center items-center flex">
                    <img class="w-4" src="/trash.svg" alt="">
                </div>
            </div>
            {/each}

            <div class="mt-5">
                <button on:click={e => newAddress()}>add</button>
            </div>
        </div>
    </div>

    <div class="flex justify-center">
        <button class="uppercase mt-5 btn">create</button>
    </div>
</div>
