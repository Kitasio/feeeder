<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()

    export let items = ['tab 1', 'tab 2', 'tab 3']
    export let activeItem = 'tab 1'
</script>

<div class="flex space-x-4 text-sm sm:text-base sm:space-x-5 lg:space-x-8 w-full font-medium border-gray-light border-b-2">
{#each items as item}
    <p on:click={() => dispatch('tabChange', item)} class="{item === activeItem ? 'cursor-pointer transition pb-3 border-b-2 border-white' : 'cursor-pointer opacity-80'}">{item}</p>
{/each}
</div>