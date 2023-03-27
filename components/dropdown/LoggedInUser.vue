<template>
  <BDropdown :items="menuItems" @item-click="menuItemOnClick">
    <AvatarImage size="32px" :src="avatar" :border="border">
      <template slot="default">
        <svg-icon name="user" class="w-5 h-5 text-white inline-block" />
      </template>
    </AvatarImage>
  </BDropdown>
</template>
<script>
import User from '@/models/auth/user'

export default {
  components: {
    AvatarImage: () => import('@/components/image/Avatar.vue'),
    BMenu: () => import('@/components/menu/BMenu.vue'),
    BDropdown: () => import('@/components/dropdown/BDropdown.vue'),
  },
  props: {
    user: {
      type: [User, Object],
      require: true,
      default: null,
    },
  },
  computed: {
    avatar() {
      return this.user && this.user.picture ? this.user.picture : null
    },
    border() {
      return this.user ? 'primary' : null
    },
  },
  data() {
    return {
      menuItems: [
        {
          text: this.$t('menu.title.myTicket'),
          icon: 'ticket',
          href: '/account/my-ticket',
        },
        {
          text: this.$t('menu.title.myWallet'),
          icon: 'wallet',
          href: '/account/mywallet/deposit',
        },
        {
          text: this.$t('user.labels.account'),
          icon: 'person',
          href: '/account/settings',
        },
        {
          id: 'logout',
          text: this.$t('auth.labels.logout'),
          icon: 'log-out',
        },
      ],
    }
  },
  methods: {
    menuItemOnClick(item) {
      if (item.id === 'logout') {
        this.$auth.logout()
      }
    },
  },
}
</script>
