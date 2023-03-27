import { NuxtAxiosInstance } from '@nuxtjs/axios'
import LotteryProductRepository from './lottery-product-repository'
import SessionRepository from './session-repository'
class Repositories {
  /**
   *
   * @param {NuxtAxiosInstance} $axios
   */
  constructor($axios) {
    this.lotteryProduct = new LotteryProductRepository($axios)
    this.lotterySession = new SessionRepository($axios)
  }
}

export default Repositories
