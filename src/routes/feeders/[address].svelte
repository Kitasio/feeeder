<script>
    import {page} from "$app/stores"
    import FeederCard from "../../components/feeders/FeederCard.svelte";
    import UserCard from "../../components/feeders/UserCard.svelte";
    import Nav from "../../components/nav/Nav.svelte";
</script>
<!-- {$page.params.address}
<a href={`/withdraw/${$page.params.address}`}>Withdraw</a> -->

<div class="p-5">
    <Nav></Nav>
    <div class="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:w-9/12 mx-auto">
        <FeederCard></FeederCard>
        <UserCard></UserCard>
    </div>
</div>