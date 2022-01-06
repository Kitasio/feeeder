<script>
    let links = [
        // { link: '/create', name: 'create' },
    ]
</script>

<div class="hidden lg:flex items-center justify-end mx-5 space-x-10 text-green-dark text-lg">
    {#each links as i}
        <a href={i.link} alt={i.name} class="uppercase hover:font-extrabold transition-all duration-300 hover:text-green">{i.name}</a>
    {/each}
</div>