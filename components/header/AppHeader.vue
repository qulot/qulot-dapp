<template>
  <header>
    <nav class="w-full fixed z-50 py-2.5 lg:py-0 transition" :class="classNavigation">
      <div class="container mx-auto">
        <div class="flex justify-between w-full">
          <div class="flex items-center">
            <div class="cursor-pointer md:hidden mr-4" @click="handleShowSidebarMobile(true)">
              <svg-icon name="menubar" class="w-4 h-4 text-menu" />
            </div>
            <!-- app icon -->
            <nuxt-link to="/" class="w-[90px] lg:w-[120px]">
              <img src="~/static/logo-text.svg" height="48" alt="Logo" class="max-w-full" />
            </nuxt-link>
          </div>

          <div class="flex justify-end items-center space-x-3.5 lg:space-x-8">
            <div class="hidden lg:block">
              <Menu class="text-menu" :items="menuItems" horizontal />
            </div>
            <!-- lang dropdown button -->
            <LangDropdown />

            <!-- theme switcher button -->
            <ThemeSwitcher />

            <client-only>
              <!-- cart dropdown button -->
              <nuxt-link class="cursor-pointer text-menu" to="/cart">
                <svg-icon name="cart" class="w-5 h-5" />
              </nuxt-link>

              <!-- user dropdown button -->
              <!-- <LoggedInUserDropdown :user="loggedInUser" v-if="isAuthenticated" /> -->
            </client-only>
          </div>
        </div>
      </div>
    </nav>
    <div class="fixed transition duration-150 ease-out top-0 left-0 w-screen h-screen z-50 md:hidden"
      :class="showSidebarMobile ? 'translate-x-0' : '-translate-x-full'">
      <div style="background: rgba(27, 40, 71, 0.5); backdrop-filter: blur(2px)" class="absolute top-0 h-screen w-screen"
        @click="handleShowSidebarMobile(false)"></div>
      <div class="py-4 space-y-6 relative z-50 h-full bg-[#6135E9] w-[300px]">
        <div class="cursor-pointer ml-4" @click="handleShowSidebarMobile(false)">
          <svg-icon name="menubar" class="w-4 h-4 text-[#BABABA]" />
        </div>
        <div v-if="menuItems">
          <Menu class="text-[#BABABA]" :items="menuItems" vertical />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    LangDropdown: () => import('@/components/dropdown/Lang.vue'),
    ThemeSwitcher: () => import('@/components/switcher/Theme.vue'),
    // LoggedInUserDropdown: () => import('@/components/dropdown/LoggedInUser.vue'),
    BNavbar: () => import('@/components/menu/BNavbar.vue'),
    Menu: () => import('@/components/menu/Menu.vue'),
  },
  data() {
    return {
      view: {
        atTopOfPage: true,
      },
    }
  },
  computed: {
    ...mapGetters(['showSidebarMobile']),
    menuItems() {
      const items = [
        {
          text: this.$t('menu.title.homePage'),
          href: '/',
        },
        {
          text: this.$t('menu.title.product'),
          href: '/products',
        },
        {
          text: this.$t('menu.title.introduce'),
          href: '/about-us',
        },
      ]

      return items
    },
    classNavigation() {
      if (this.$route.name !== 'index' && this.$route.name !== 'product-id') {
        return 'bg-gradient-to-r from-[#2E115F] to-[#7A0FE6]'
      }
      if (!this.view.atTopOfPage) {
        return `bg-gradient-to-r from-[#2E115F] to-[#7A0FE6] duration-100 shadow-lg`
      }
    },
  },
  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 50) {
        // user is scrolled
        if (this.view.atTopOfPage) this.view.atTopOfPage = false
      } else {
        // user is at top of page
        if (!this.view.atTopOfPage) this.view.atTopOfPage = true
      }
    },
    handleShowSidebarMobile(status) {
      this.$store.commit('setShowSidebarMobile', status)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>
