<template>
  <div class="bg-white dark:bg-block shadow-default rounded-lg flex flex-col">
    <div
      class="
        flex flex-col flex-wrap
        lg:flex-row lg:flex-wrap lg:items-center
        justify-between
        px-4
        py-4
        border-b border-solid border-default
      "
    >
      <h2 class="text-[17px] font-bold text-title my-1 mr-3">{{ $t('session.labels.lastDrawing') }}</h2>
      <div class="my-1 flex-1 w-full lg:w-auto filter text-sm text-black flex items-center space-x-4">
        <div class="w-1/2 flex-1 lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2">
          <span class="mb-1 lg:mb-0 whitespace-nowrap">{{ $t('session.labels.periodDrawing') }}</span>
          <FormulateInput
            v-model="sessionId"
            type="text"
            class="flex-1"
            :input-class="'!h-8 border border-default px-2 pl-4 rounded !w-full'"
            :element-class="({ context, classes }) => ['relative w-full'].concat(classes)"
          >
            <template #prefix>
              <span class="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"> # </span>
            </template>
          </FormulateInput>
        </div>
        <div class="w-1/2 lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2">
          <span class="mb-1 lg:mb-0 whitespace-nowrap">{{ $t('session.labels.dayDrawing') }}</span>
          <FormulateInput
            v-model="drawDatetimeDate"
            type="datetime"
            name=""
            placeholder="Chọn ngày"
            :input-class="'!h-8 !w-full lg:!w-36 border border-default px-2 pr-5 rounded appearance-none'"
            :element-class="(context, classes) => ['relative'].concat(classes)"
          >
            <template #suffix>
              <span class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg-icon name="calendar" class="w-4 h-4" />
              </span>
            </template>
          </FormulateInput>
        </div>
      </div>
    </div>
    <div class="overflow-hidden flex-1">
      <VuePerfectScrollbar class="h-full">
        <div class="p-4 space-y-4">
          <SessionItem
            v-for="(session, index) in allSessions"
            :key="`session-item-${index}`"
            :data-session="session"
            :maxValuePerItem="product.maxValuePerItem"
            :numberOfItems="product.numberOfItems"
          />
        </div>
        <infinite-loading spinner="spiral" @infinite="handlerLoadMore" ref="infiniteLoading">
          <div slot="no-more"></div>
        </infinite-loading>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import LotteryProduct from '@/models/lottery/product'
import { debounce } from 'lodash'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'InfiniteScrollSession',
  components: {
    SessionItem: () => import('@/components/session/SessionItem.vue'),
  },
  props: {
    product: {
      type: [LotteryProduct, Object],
      default: () => {},
      required: true,
    },
  },
  watch: {
    sessionId() {
      this.debounceOnInputChanged()
    },
    drawDatetimeDate() {
      this.debounceOnInputChanged()
    },
  },
  computed: {
    ...mapState({
      searchParams: (state) => state.lottery.session.searchParams,
    }),
    ...mapGetters({
      allSessions: 'lottery/session/allSessions',
      isNoMore: 'lottery/session/isNoMore',
      isLoaded: 'lottery/session/isLoaded',
    }),
    sessionId: {
      set(sessionId) {
        this.setSearchParams({ sessionId })
      },
      get() {
        return this.searchParams.sessionId
      },
    },
    drawDatetimeDate: {
      set(drawDatetimeDate) {
        this.setSearchParams({ drawDatetimeDate })
      },
      get() {
        return this.searchParams.drawDatetimeDate
      },
    },
  },
  created() {
    this.setSearchParams({
      productId: this.product.id,
    })
    this.debounceOnInputChanged = debounce(() => {
      this.clear()
    }, 500)
  },
  methods: {
    ...mapActions({
      fetchMore: 'lottery/session/fetchMore',
      resetPaginate: 'lottery/session/resetPaginate',
      setSearchParams: 'lottery/session/setSearchParams',
    }),
    handlerLoadMore($state) {
      this.fetchMore()
        .then(() => {
          if (this.isLoaded) {
            $state.loaded()
          }

          if (this.isNoMore) {
            $state.complete()
          }
        })
        .catch((error) => {
          console.log(error)
          $state.complete()
        })
    },
    clear() {
      this.resetPaginate()
      this.$refs.infiniteLoading.stateChanger.reset()
    },
  },
}
</script>
