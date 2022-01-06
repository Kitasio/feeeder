<script>
	import Nav from '$lib/components/nav/Nav.svelte'
</script>
<div class="p-7">
   <Nav></Nav> 
   <div class="md:flex justify-center md:text-center">
   <div class="mt-10 space-y-3 max-w-xs md:max-w-lg md:mt-40">
      <h1 class="text-4xl md:text-6xl font-bold">Crypto account for collectives</h1>
      <p class="font-light md:text-2xl">Distributing financial flows between participants</p>
      <button class="btn px-5 py-2 text-base md:text-lg md:py-3 md:px-6">
         <a href="/create">create</a>
      </button>
   </div>
   </div>

   <div class="mt-10 md:mt-32 space-y-5 flex flex-col md:flex-row items-center justify-evenly md:space-y-0">
      <div class="flex flex-col max-w-xs items-center justify-center space-y-2">
         <img src="/contract.svg" alt="">
         <p class="font-semibold text-center">All transactions occur using smart-contracts</p>
      </div>
      <div class="flex flex-col max-w-xs items-center justify-center space-y-2">
         <img src="/alloc.svg" alt="">
         <p class="font-semibold text-center">Allocation settings for each account participant</p>
      </div>
   </div>
</div>
