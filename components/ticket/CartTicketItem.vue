<template>
  <div class="relative text-sm text-title-nodark">
    <div
      class="
        overflow-hidden
        box-border
        relative
        before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white
        dark:before:bg-block
        before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid
        after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white
        dark:after:bg-block
        after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid
        before:border-white
        after:border-white
      "
    >
      <div
        class="
          bg-[#F3EFFF]
          rounded
          lg:rounded-lg
          py-3
          px-3
          lg:px-4
          border border-solid border-[#F3EFFF]
          flex flex-wrap
          items-center
          space-x-2
          lg:space-y-0
        "
      >
        <span class="cursor-pointer" @click="handleSelectTicket">
          <svg-icon
            :name="dataItem.isChecked ? 'checkbox' : 'uncheck'"
            class="w-4 h-4"
            :class="dataItem.isChecked ? 'text-title-nodark' : 'text-disable'"
          />
        </span>
        <div class="flex items-center space-x-1 lg:space-x-2 flex-1 px-2">
          <div v-for="(num, i) in dataItem.pickNumbers" :key="i">
            <CircleItem :number="num" />
          </div>
        </div>
        <div
          v-if="currencySelected"
          class="
            w-full
            lg:w-auto
            mt-3
            !mr-2
            lg:!mr-0 lg:mt-0
            text-sm text-title-nodark
            space-x-2
            order-last
            lg:order-none
            flex
            justify-center
          "
        >
          <div class="flex items-center space-x-2 border border-[#D8D8D8] p-2 rounded">
            <span>{{ priceTicket | formatMoney(4) }}</span>
            <span class="w-px h-3 bg-[#D8D8D8]"></span>
            <div class="w-4 h-4 overflow-hidden rounded-full">
              <img class="max-w-full h-auto" :src="currencySelected.icon" :alt="currencySelected.symbol" />
            </div>
          </div>
        </div>
        <div class="actions flex items-center space-x-2">
          <span class="cursor-pointer"><svg-icon name="reload" class="h-4 w-4 text-title-nodark" /></span>
          <span class="cursor-pointer" @click="deleteTicket(dataItem)"
            ><svg-icon name="trash" class="h-4 w-3 text-[#FF228C]"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartTicketItem',
  components: {
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
  },
  props: {
    currencySelected: {
      type: Object,
      default: () => {},
    },
    dataItem: {
      type: Object,
      default: null,
    },
    priceTicket: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selected: true,
    }
  },
  methods: {
    handleSelectTicket() {
      const item = { ...this.dataItem, isChecked: !this.dataItem.isChecked }
      this.$store.commit('lottery/ticket/UPDATE_TICKET', item)
    },
    deleteTicket(item) {
      this.$store.commit('lottery/ticket/DELETE_TICKET', item)
    },
  },
}
</script>
