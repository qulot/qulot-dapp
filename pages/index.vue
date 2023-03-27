<template>
  <div class="space-y-8">
    <AppTopFeature id="summary" />
    <LandingPrize :products="products" />
    <LandingLuckiest />
    <LandingHowWork />
    <LandingFeature />
    <LandingPlatform />
    <LandingTeamPartner />
    <LandingPaymentCard />
  </div>
</template>

<script>
import AppTopFeature from '@/components/section/AppTopFeature.vue'
import LandingPrize from '@/components/section/LandingPrize.vue'
import LandingLuckiest from '@/components/section/LandingLuckiest.vue'
import LandingHowWork from '@/components/section/LandingHowWork.vue'
import LandingFeature from '@/components/section/LandingFeature.vue'
import LandingPlatform from '@/components/section/LandingPlatform.vue'
import LandingTeamPartner from '@/components/section/LandingTeamPartner.vue'
import LandingPaymentCard from '@/components/section/LandingPaymentCard.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  auth: false,
  components: {
    AppTopFeature,
    LandingPrize,
    LandingLuckiest,
    LandingHowWork,
    LandingFeature,
    LandingPlatform,
    LandingTeamPartner,
    LandingPaymentCard,
  },
  async fetch({ store }) {
    await Promise.all([store.dispatch('lottery/product/getAllProducts')])
  },
  computed: {
    ...mapGetters({
      products: 'lottery/product/getAvailableProducts',
    }),
  },
}
</script>
