<script>
    import { onMount } from 'svelte';

    function textToSpan(text) {
        let words = ''
        let counter = 2
        for (let i = 0; i < text.length; i++) {
            const element = text[i];
            if (element != ' ' && i < 9) {
                words += `<span class="animate-fat-${counter*100}">${element}</span>`
                counter++
            } else {
                words += `<span class="animate-fat-900">${element}</span>`
            }
        }
        return words
    }

    export let words = 'go to wallet'
    let ready = false
    onMount(() => {
        words = textToSpan(words)
        ready = true
    })
</script>

<div class="flex items-center justify-end">
    {#if ready}
    <a href="/" class="text-green text-2xl whitespace-nowrap font-thin md:text-4xl uppercase">
        {@html words}
        <!-- <div class="animate-fat-100"></div>
        <div class="animate-fat-200"></div>
        <div class="animate-fat-300"></div>
        <div class="animate-fat-400"></div>
        <div class="animate-fat-500"></div>
        <div class="animate-fat-600"></div>
        <div class="animate-fat-700"></div>
        <div class="animate-fat-800"></div> -->
    </a>
    {/if}
</div>
