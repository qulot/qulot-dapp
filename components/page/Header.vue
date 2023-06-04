<template>
  <header>
    <nav
      class="fixed w-full z-50 py-2.5 lg:py-0 transition"
      :class="classNavigation"
    >
      <div class="container mx-auto">
        <div class="flex justify-between w-full">
          <div class="flex items-center">
            <div
              class="cursor-pointer lg:hidden mr-4"
              @click="showSidebar = true"
            >
              <svg-icon name="menubar" class="w-4 h-4 text-white" />
            </div>
            <!-- app icon -->
            <nuxt-link to="/" class="w-[90px] lg:w-[120px]">
              <img
                src="/logo-text.svg"
                height="48"
                alt="Logo"
                class="max-w-full"
              />
            </nuxt-link>
          </div>

          <div class="flex justify-end items-center">
            <div class="hidden lg:block">
              <Menu class="text-white" horizontal>
                <MenuItem
                  horizontal
                  :item="{
                    text: $t('menu.title.homePage'),
                    href: '/',
                  }"
                />
                <MenuItemDropdown
                  class="h-fit my-auto"
                  :item="{
                    text: $t('lottery.play'),
                    subitems: playMenuSubItems,
                  }"
                />
                <MenuItem
                  v-if="isConnected"
                  horizontal
                  :item="{
                    text: $t('menu.title.myTicket'),
                    href: '/my-ticket',
                  }"
                />
              </Menu>
            </div>

            <!-- lang dropdown button -->
            <div class="hidden lg:block">
              <LangSelect />
            </div>

            <!-- theme switcher button -->
            <div class="hidden lg:block">
              <ThemeSelect />
            </div>

            <!-- cart dropdown button -->
            <nuxt-link
              class="cursor-pointer text-white flex items-center p-2 lg:px-3"
              to="/cart"
            >
              <svg-icon name="cart" class="w-5 h-5" />
            </nuxt-link>

            <!-- network select -->
            <NetworkSelect />

            <!-- button connect wallet -->
            <ButtonConnectWallet />
          </div>
        </div>
      </div>
    </nav>
    <div
      class="fixed transition duration-150 ease-out top-0 left-0 w-screen h-screen z-50 lg:hidden"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <div
        style="background: rgba(27, 40, 71, 0.5); backdrop-filter: blur(2px)"
        class="absolute top-0 h-screen w-screen"
        @click="showSidebar = false"
      ></div>
      <div
        class="py-4 space-y-6 relative z-50 h-full bg-[#6135E9] w-[300px] text-white"
      >
        <div class="cursor-pointer ml-4" @click="showSidebar = false">
          <svg-icon name="menubar" class="w-4 h-4" />
        </div>
        <Menu>
          <MenuItem
            :item="{
              text: $t('menu.title.homePage'),
              href: '/',
            }"
          />
          <MenuItemCollapse
            :item="{
              text: $t('lottery.play'),
              subitems: playMenuSubItems,
            }"
          />
          <MenuItem
            :item="{
              text: $t('ticket.listTicket'),
              href: '/my-ticket',
            }"
          />
          <MenuItem
            :item="{
              text: $t('footer.linkAboutUs'),
              href: '/about-us',
            }"
          />
          <div class="flex flex-row items-center justify-between">
            <MenuItem
              :item="{
                text: $t('menu.title.language'),
              }"
            />
            <LangSelect class="py-0" arrow />
          </div>
          <div class="flex flex-row items-center justify-between">
            <MenuItem
              :item="{
                text: $t('menu.title.theme'),
              }"
            />
            <ThemeSelect class="py-0" arrow />
          </div>
        </Menu>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()
const { t } = useI18n()
const { showSidebar } = useSidebar()
const { scrollAtTop } = useScrollTop(50)
const { isConnected } = useAccount()
const lotteryStore = useLotteryStore()
const { lotteries } = storeToRefs(lotteryStore)

const playMenuSubItems = computed(() =>
  lotteries.value.map((lottery) => ({
    text: `${lottery.verboseName} ${lottery.numberOfItems}/${lottery.maxValuePerItem}`,
    href: `/lottery/${lottery.id}/`,
    subitems: [
      {
        text: t('lottery.introduction'),
        href: `/lottery/${lottery.id}/about#introduction`,
      },
      {
        text: t('lottery.howToPlay'),
        href: `/lottery/${lottery.id}/about#how-to-play`,
      },
    ],
  }))
)

const classNavigation = computed(() => {
  if (route.name !== 'index' && route.name !== 'lottery-id') {
    return 'bg-gradient-to-r from-[#2E115F] to-[#7A0FE6]'
  }
  if (scrollAtTop.value) {
    return `bg-gradient-to-r from-[#2E115F] to-[#7A0FE6] duration-100 shadow-lg`
  }
})
</script>
