import { NuxtAxiosInstance } from '@nuxtjs/axios'

class SessionRepository {
  /**
   *
   * @param {NuxtAxiosInstance} $axios
   */
  constructor($axios) {
    this.$axios = $axios
  }

  /**
   *
   * @param {{
   *  productId: string;
   *  sessionId: number;
   *  status: string;
   *  drawDatetimeDate: string;
   *  page: number;
   *  pageSize: number
   * }} args
   * @returns
   */
  getList({ productId, sessionId, status, drawDatetimeDate, page, pageSize, sortBy, orderBy }) {
    return this.$axios.get('/api/v1/lottery/session', { params: { productId, sessionId, status, drawDatetimeDate, page, pageSize, sortBy, orderBy } })
  }

  /**
   *
   * @param {string} id
   * @returns
   */
  getById(id) {
    return this.$axios.get(`/api/v1/lottery/session/${id}`)
  }

}

export default SessionRepository
