import { NuxtAxiosInstance } from '@nuxtjs/axios'
import LotteryProduct from '@/models/lottery/product'

const products = [
  new LotteryProduct({
    id: "liteq",
    picture: "https://cdn.qulot.io/img/product-powerq.png",
    verboseName: "LiteQ",
    numberOfItems: 3,
    minValuePerItem: 1,
    maxValuePerItem: 66,
    usdPricePerTicket: 1,
    lastSessionId: 1,
    lastSessionDrawDatetime: "2023-10-05T14:48:00.000Z",
    lastSessionWinningNumbers: [1, 2, 3, 4, 5],
    nextSessionId: 2,
    nextSessionDrawDatetime: "2023-10-05T14:48:00.000Z",
    nextSessionEstimatedJackpot: 1000000,
    isActive: true,
    isMro: false
  }),
  new LotteryProduct({
    id: "megaq",
    picture: "https://cdn.qulot.io/img/product-powerq.png",
    verboseName: "MegaQ",
    numberOfItems: 3,
    minValuePerItem: 1,
    maxValuePerItem: 66,
    usdPricePerTicket: 1,
    lastSessionId: 1,
    lastSessionDrawDatetime: "2023-10-05T14:48:00.000Z",
    lastSessionWinningNumbers: [1, 2, 3, 4, 5],
    nextSessionId: 2,
    nextSessionDrawDatetime: "2023-10-05T14:48:00.000Z",
    nextSessionEstimatedJackpot: 1000000,
    isActive: true,
    isMro: false
  })
]

class LotteryProductRepository {
  /**
   *
   * @param {NuxtAxiosInstance} $axios
   */
  constructor($axios) {
    this.$axios = $axios
  }

  /**
   *
   * @returns
   */
  getAll() {
    return Promise.resolve({
      status: 200,
      data: products
    });
  }

  /**
   *
   * @param {string} id
   * @returns
   */
  getById(id) {
    return Promise.resolve({
      status: 200,
      data: products.find(p => p.id === id)
    });
  }

  getAssets(params) {
    return Promise.resolve([])
  }

}

export default LotteryProductRepository
