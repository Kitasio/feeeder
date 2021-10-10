<script>
    let links = [
        { link: '/#', name: 'about' },
        { link: '/#', name: 'features' },
        { link: '/#', name: 'roadmap' },
        { link: '/#', name: 'team' },
    ]
</script>

<div class="hidden lg:flex items-center justify-end mx-20 space-x-10 text-green-dark text-lg">
    {#each links as i}
        <a href={i.link} alt={i.name} class="uppercase hover:font-bold transition-all duration-300">{i.name}</a>
    {/each}
</div>