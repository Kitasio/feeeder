<script>
    let links = [
        { link: '/#', name: 'about' },
        { link: '/#', name: 'features' },
        { link: '/#', name: 'roadmap' },
        { link: '/#', name: 'team' },
    ]
</script>

<div class="hidden lg:flex justify-end space-x-16 text-green-dark">
    {#each links as i}
        <a href={i.link} alt={i.name} class="uppercase hover:font-extrabold transition-all duration-300 hover:text-green">{i.name}</a>
    {/each}
</div>