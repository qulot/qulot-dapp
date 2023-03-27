<template>
  <div class="container mx-auto pt-16 pb-4 lg:pb-14">
    <div class="rounded-lg shadow-default mt-4 lg:mt-6 p-2 lg:p-4 dark:bg-block">
      <div class="text-[17px] font-bold text-title mb-4">{{ $t('ticket.labels.listTicket') }}</div>
      <div class="list-ticket space-y-4">
        <TicketItem v-for="(ticket, index) in listTicket" :key="`ticket-${index}`" :data="ticket" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MyTicketPage',
  components: {
    TicketItem: () => import('@/components/ticket/TicketItem.vue'),
  },
  data() {
    return {
      listTicket: [
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-11-30'),
          status: 1,
          win: false,
        },
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-10-29'),
          status: 2,
          win: false,
        },
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-10-28'),
          status: 3,
          win: false,
        },
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-10-25'),
          status: 4,
          win: true,
        },
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-10-25'),
          status: 4,
          win: false,
        },
        {
          name: 'MegaQ Jackpot',
          image: '',
          numbers: [86, 29, 73, 80, 47, 78],
          time: new Date('2022-10-25'),
          status: 4,
          win: true,
        },
      ],
    }
  },
  created() {
    this.getListCurrency()
  },
  methods: {
    ...mapActions({
      getListCurrency: 'crypto/currency/getCurrencies',
    }),
  },
}
</script>
