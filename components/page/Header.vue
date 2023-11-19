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
              <svg-icon name="menubar" class="w-4 h-4 text-menu" />
            </div>
            <!-- app icon -->
            <nuxt-link :to="localePath('/')" class="w-[90px] lg:w-[120px]">
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
              <Menu class="text-menu" horizontal>
                <MenuItem
                  horizontal
                  :item="{
                    text: $t('menu.title.homePage'),
                    href: localePath('/'),
                  }"
                />
                <MenuItemDropdown
                  class="h-fit my-auto"
                  arrow-class="[&>svg>path]:stroke-menu"
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
                    href: localePath({
                      name: 'eth-tickets',
                      params: { eth: address?.toLowerCase() },
                    }),
                  }"
                />
                <MenuItem
                  v-if="isConnected"
                  horizontal
                  :item="{
                    text: $t('menu.title.myOrder'),
                    href: localePath({
                      name: 'eth-orders',
                      params: { eth: address?.toLowerCase() },
                    }),
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
              class="cursor-pointer text-menu flex items-center p-2 lg:px-3 relative"
              :to="localePath({ name: 'cart' })"
            >
              <svg-icon name="cart" class="w-5 h-5" />

              <!-- Cart dot -->
              <div
                v-show="hasTickets"
                class="absolute top-2 right-1 w-2 h-2 rounded bg-error ring-offset ring"
              ></div>
            </nuxt-link>

            <!-- network select -->
            <NetworkSelect />

            <!-- button connect wallet -->
            <AccountSelect />
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
        class="py-4 space-y-6 relative z-50 h-full bg-[#6135E9] w-[300px] text-menu"
      >
        <div class="cursor-pointer ml-4" @click="showSidebar = false">
          <svg-icon name="menubar" class="w-4 h-4" />
        </div>
        <Menu>
          <MenuItem
            :item="{
              text: $t('menu.title.homePage'),
              href: localePath('/'),
            }"
          />
          <MenuItemCollapse
            arrow-class="[&>svg>path]:stroke-menu"
            :item="{
              text: $t('lottery.play'),
              subitems: playMenuSubItems,
            }"
          />
          <MenuItem
            v-if="isConnected"
            :item="{
              text: $t('ticket.listTicket'),
              href: localePath({
                name: 'eth-tickets',
                params: { eth: address?.toLowerCase() },
              }),
            }"
          />
          <MenuItem
            v-if="isConnected"
            :item="{
              text: $t('order.myOrders'),
              href: localePath({
                name: 'eth-orders',
                params: { eth: address?.toLowerCase() },
              }),
            }"
          />
          <MenuItem
            :item="{
              text: $t('footer.linkAboutUs'),
              href: localePath('/about-us'),
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
const localePath = useLocalePath()
const { showSidebar } = useSidebar()
const { scrollAtTop } = useScrollTop(50)
const { isConnected, address } = useAccount()
const cartStore = useCartStore()
const { hasTickets } = storeToRefs(cartStore)
const lotteryStore = useLotteryStore()
const { lotteries } = storeToRefs(lotteryStore)

const playMenuSubItems = computed(() =>
  lotteries.value.map((lottery) => ({
    text: `${lottery.verboseName} ${lottery.numberOfItems}/${lottery.maxValuePerItem}`,
    href: localePath({
      name: 'lottery-id',
      params: { id: lottery.id },
    }),
    subitems: [
      {
        text: t('lottery.introduction'),
        href: localePath({
          name: 'lottery-id-about',
          params: { id: lottery.id },
          hash: '#introduction',
        }),
      },
      {
        text: t('lottery.howToPlay'),
        href: localePath({
          name: 'lottery-id-about',
          params: { id: lottery.id },
          hash: '#how-to-play',
        }),
      },
    ],
  }))
)

const classNavigation = computed(() => {
  const routeName = (route.name?.toString() || '').split('___')[0]
  if (routeName !== 'index' && routeName !== 'lottery-id') {
    return 'bg-gradient-to-r from-[#2E115F] to-[#7A0FE6]'
  }
  if (scrollAtTop.value) {
    return `bg-gradient-to-r from-[#2E115F] to-[#7A0FE6] duration-100 shadow-lg`
  }
})
</script>
