<script>
    import {page} from "$app/stores"
</script>
{$page.params.address}
<a href={`/withdraw/${$page.params.address}`}>Withdraw</a>