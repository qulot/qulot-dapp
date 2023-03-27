<template>
  <modal
    name="find-number"
    :click-to-close="false"
    :width="1130"
    height="auto"
    :min-width="343"
    :max-width="1130"
    :adaptive="true"
    class="modal-find-number"
    @before-open="handleOpen"
  >
    <div v-if="maxValuePerItem > 0" class="p-3 lg:p-6 bg-white rounded-lg shadow-default flex flex-col">
      <div class="flex justify-between pb-4 bg-white border-b border-default">
        <h2 class="font-bold text-[17px] text-title-nodark">{{ $t('product.labels.selectTicket') }}</h2>
        <div class="w-5 h-5 flex items-center justify-center hover:text-error cursor-pointer" @click="closeModal()">
          <svg-icon class="w-5 h-5" name="close-circle" />
        </div>
      </div>

      <div class="flex justify-center w-full flex-1 max-h-[460px] lg:max-h-[500px] overflow-hidden flex-col">
        <VuePerfectScrollbar :settings="{ suppressScrollX: true }" class="h-full pb-1 pt-4 lg:pb-2 lg:pt-8">
          <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-15 gap-4 lg:gap-6">
            <div v-for="(num, i) in maxValuePerItem" :key="i" @click="selectNumber(num)" class="w-full">
              <CircleItem
                :number="num"
                :disable="ticket.length > 0 ? ticket.indexOf(num) === -1 : true"
                class="w-10 h-10 cursor-pointer"
              />
            </div>
          </div>
        </VuePerfectScrollbar>
      </div>

      <div
        class="
          modal-footer
          flex
          items-center
          justify-center
          space-x-3
          lg:space-x-4
          pt-3
          lg:pt-6
          pb-2
          z-10
          bg-white
          relative
          w-full
        "
      >
        <div class="w-1/2 lg:w-auto">
          <BButton
            class="
              w-full
              rounded
              border-title
              text-title
              bg-transparent
              hover:text-main hover:bg-transparent hover:border-main
            "
            @click="generateRandom"
          >
            {{ $t('product.labels.random') }}
          </BButton>
        </div>
        <div class="w-1/2 lg:w-auto">
          <BButton
            variant="primary"
            class="w-full rounded text-white"
            @click="handleAddTicket()"
            :disabled="ticket.length < numberOfItems"
            >{{ $t('product.labels.selectTicket') }}</BButton
          >
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { bulkRandomRange } from '@/utils/number'

export default {
  name: 'FindNumberModal',
  components: {
    BButton: () => import('@/components/button/BButton.vue'),
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
  },
  data() {
    return {
      minValuePerItem: 0,
      maxValuePerItem: 0,
      numberOfItems: 0,
      lotteryProductId: '',
      lotterySessionId: 0,
      ticket: [],
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      addCart: 'user/cart/addCart',
    }),
    handleAddTicket() {
      const params = {
        lotteryProductId: this.lotteryProductId,
        lotterySessionId: this.lotterySessionId,
        pickNumbers: this.ticket,
        isChecked: true,
      }
      this.$store.commit('lottery/ticket/ADD_TICKET', params)
      this.closeModal()
    },
    closeModal() {
      this.$modal.hide('find-number')
      this.ticket = []
    },
    handleOpen(event) {
      if (event.params) {
        this.maxValuePerItem = event.params.maxValuePerItem
        this.numberOfItems = event.params.numberOfItems
        this.lotteryProductId = event.params.lotteryProductId
        this.lotterySessionId = event.params.lotterySessionId
        // this.ticket = event.params.winningNumbers
      }
    },
    generateRandom() {
      this.ticket = bulkRandomRange(this.numberOfItems, this.minValuePerItem, this.maxValuePerItem)
    },
    selectNumber(num) {
      const index = this.ticket.length > 0 ? this.ticket.indexOf(num) : -1
      if (index > -1) {
        this.ticket.splice(index, 1)
      } else if (this.ticket.length < this.numberOfItems) {
        this.ticket.push(num)
      } else {
        return
      }
    },
  },
}
</script>

<style>
.vm--modal {
  height: auto !important;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  padding-left: 16px;
  padding-right: 16px;
}
.vm--overlay {
  background: rgba(90, 90, 90, 0.7);
  backdrop-filter: blur(7.5px);
}
</style>
