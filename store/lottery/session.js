import LotterySession from "@/models/lottery/session";
import Repositories from "@/repositories";
import { isOkResponse } from "@/utils/http";
import isEmpty from "lodash.isempty";


const SET_LIST_SESSION = "SET_LIST_SESSION"
const SET_ADD_LIST_SESSION = "SET_ADD_LIST_SESSION"
const SET_IS_NO_MORE = "SET_IS_NO_MORE"
const SET_IS_LOADED = "SET_IS_LOADED"
const SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS"

export const state = () => ({
  isNoMore: false,
  isLoaded: false,
  sessions: [],
  newSessions: [],
  searchParams: {
    productId: null,
    sessionId: null,
    drawDatetimeDate: null,
    page: 1
  },
  defaultParams: {
    pageSize: 10,
    status: 'completed',
    sortBy: 'draw_datetime',
    orderBy: 'desc',
  }
})

export const mutations = {
  [SET_LIST_SESSION](state, payload) {
    state.sessions = payload
  },
  [SET_ADD_LIST_SESSION](state, payload) {
    state.sessions = [...state.sessions, ...payload]
  },
  [SET_IS_NO_MORE](state, payload) {
    state.isNoMore = payload
  },
  [SET_IS_LOADED](state, payload) {
    state.isLoaded = payload
  },
  [SET_SEARCH_PARAMS](state, payload) {
    state.searchParams = { ...state.searchParams, ...payload }
  },
}

export const getters = {
  allSessions(state) {
    return state.sessions
  },
  isNoMore(state) {
    return state.isNoMore
  },
  isLoaded(state) {
    return state.isLoaded
  },
  searchParams(state) {
    return state.searchParams
  },
  defaultParams(state) {
    return state.defaultParams
  },
  mergeSearchParams(state) {
    return { ...state.defaultParams, ...state.searchParams }
  },
}

/**
 * @type {{$repositories: Repositories}}
 */
export const actions = {
  resetPaginate({ commit }) {
    commit(SET_LIST_SESSION, [])
    commit(SET_IS_NO_MORE, false)
    commit(SET_IS_LOADED, false)
    commit(SET_SEARCH_PARAMS, { page: 1 })
  },
  /**
   * 
   * @param {*} context 
   * @param {{
   *  productId: string;
   *  sessionId: string;
   *  drawDatetimeDate: string;
   *  page: string;
   * }} searchParams 
   */
  setSearchParams({ commit }, searchParams) {
    commit(SET_SEARCH_PARAMS, searchParams)
  },
  /**
   * 
   * @param {*} context 
   * @param {*} params 
   */
  async fetchMore({ commit, getters }) {
    commit(SET_IS_LOADED, false)
    const res = await this.$repositories.lotterySession.getList(getters.mergeSearchParams)
    let sessions = []
    if (isOkResponse(res)) {
      if (!isEmpty(res.data)) {
        // set current page to next page
        commit(SET_SEARCH_PARAMS, {
          page: getters.searchParams.page + 1
        })
        // mask is loaded
        sessions = res.data.map(p => new LotterySession(p))
        commit(SET_IS_LOADED, true)
      } else {

        // no more data
        commit(SET_IS_NO_MORE, true)
      }
    }

    commit(SET_ADD_LIST_SESSION, sessions)
  },
}
