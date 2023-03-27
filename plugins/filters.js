import { formatUSD } from '@/utils/currency';
import Vue from 'vue'

Vue.filter('hidePhone', (value) => {
  if (!value) return ''
  return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
})

Vue.filter('sessionId', (value) => {
  if (!value) return ''
  return value.toString().padStart(6, "0");
})

Vue.filter('formatMoney', (value, fixed = 2, currency) => {
  return currency ? `${Number(value.toFixed(fixed))} ${currency}` : Number(value.toFixed(fixed))
})

Vue.filter('formatUSD', (value, digits = 2) => {
  if (!value) return formatUSD(0, digits)
  return formatUSD(value, digits)
})
