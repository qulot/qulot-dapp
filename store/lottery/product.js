import LotteryProduct from "@/models/lottery/product";
import Repositories from "@/repositories";
import { isOkResponse } from "@/utils/http";
import isEmpty from "lodash.isempty";

const SET_LIST_PRODUCT = "SET_LIST_PRODUCT"
const SET_PRODUCT = "SET_PRODUCT"

export const state = () => ({
  /** @type {Array<LotteryProduct>} */
  products: [],
  product: null
});

export const mutations = {
  [SET_LIST_PRODUCT](state, products) {
    state.products = products
  },
  [SET_PRODUCT](state, product) {
    state.product = product
  }
};

export const getters = {
  getAvailableProducts(state) {
    return state.products.filter(p => p.isActive && !p.isMro)
  },
  getProduct(state) {
    return state.product
  }
};

/**
 * @type {{$repositories: Repositories}}
 */
export const actions = {
  async getAllProducts({ commit }) {
    const resp = await this.$repositories.lotteryProduct.getAll()

    let products = []
    if (isOkResponse(resp) && !isEmpty(resp.data)) {
      products = resp.data.map(p => new LotteryProduct(p))
    }

    commit(SET_LIST_PRODUCT, products)
  },
  /**
   * 
   * @param {*} param0 
   * @param {string} productId 
   */
  async getProduct({ commit }, productId) {
    const resp = await this.$repositories.lotteryProduct.getById(productId)

    if (isOkResponse(resp)) {
      commit(SET_PRODUCT, new LotteryProduct(resp.data))
    }
  }
}
