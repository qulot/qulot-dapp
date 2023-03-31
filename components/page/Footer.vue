<template>
  <footer
    class="pt-6 pb-6 lg:pt-32 lg:pb-20 bg-[#231E36] text-disable font-normal text-[17px]"
  >
    <div
      class="container mx-auto lg:flex lg:space-x-20 xl:space-x-[147px] justify-between"
    >
      <div
        class="mb-4 pb-4 border-b border-solid border-[#C5C5C5] lg:border-b-0 lg:pb-0 lg:mb-0"
      >
        <div class="inline-flex text-2xl mb-4 lg:mb-6">
          <img
            src="/logo-text.svg"
            class="w-[90px] lg:w-[120px] h-auto"
            alt="logo"
          />
        </div>
        <p class="text-sm lg:text-[17px] lg:w-[220px] text-[#5A5A5A]">
          QulotNFT.com is an NFT marketplace focused on GameFi and collectibles,
          rebranded from SCV’s NFT market. Enjoy exploring & trading with your
          buddies!
        </p>
      </div>
      <div
        class="min-w-[1px] w-px h-[205px] bg-[#C5C5C5] hidden lg:block"
      ></div>
      <div class="grid grid-cols-2 gap-4 w-full md:grid-cols-3">
        <div>
          <h2 class="mb-4 font-bold text-[17px] text-white">MARKETPLACE</h2>
          <ul class="space-y-4">
            <li class="hover:text-main">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">Discover</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">Activities</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">NFT Ranking</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 font-bold text-[17px] text-white">RESOURCES</h2>
          <ul class="space-y-4">
            <li class="hover:text-main">
              <nuxt-link to="/">Help Center</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">Trader's Guide</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">Features</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">FAQ</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">Press kit</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/">NFT Validator</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 font-bold text-[17px] text-white">LINKS</h2>
          <ul class="space-y-4">
            <li class="hover:text-main">
              <nuxt-link to="/terms-of-service">Privacy Policy</nuxt-link>
            </li>
            <li class="hover:text-main">
              <nuxt-link to="/terms-of-service">Terms of Service</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
