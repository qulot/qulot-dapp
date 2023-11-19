<template>
  <!-- Print lottery round result -->
  <div class="flex flex-col space-y-8">
    <!-- Header -->
    <div class="w-full h-8 text-center bg-main">
      <h1 class="text-title">Kết quả xổ số Mega ngày 25/5/2023</h1>
    </div>

    <!-- Draw results -->
    <div class="flex flex-col items-center w-full space-y-4">
      <!-- Lucky numbers -->
      <div class="flex items-center space-x-2">
        <div v-for="num in round.winningNumbers" :key="num">
          <BallItem :number="num" />
        </div>
      </div>

      <!-- Total reward amount -->
      <Button rounded variant="primary" type="link">
        Tổng giải thưởng 10.00 USDT
      </Button>
    </div>

    <!-- Reward breakdown table -->
    <table class="table-auto w-full">
      <thead class="text-left text-content font-normal">
        <tr>
          <th class="font-normal">Giải thưởng</th>
          <th class="font-normal">Trùng khớp</th>
          <th class="font-normal">Số giải thưởng</th>
          <th class="font-normal">Giá trị giải</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="py-2 border-b border-default last:border-none text-content font-bold"
        >
          <td class="py-3">Jackpot</td>
          <td class="py-3">3</td>
          <td class="py-3">1</td>
          <td class="py-3">10000</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { Round } from '~~/types/lottery'
const props = defineProps<{ round: Round }>()
</script>
