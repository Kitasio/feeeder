<script>
    import NavLinks from "./NavLinks.svelte"
    import GoWallet from "./GoWallet.svelte"
</script>

<div class="grid grid-cols-2 lg:grid-cols-nav">
    <div class="flex items-center justify-start">
        <a href="/" class="text-green text-2xl md:text-4xl font-black uppercase animate-fatten">Feeder</a>
    </div>
    <NavLinks></NavLinks>
    <GoWallet></GoWallet>
</div>