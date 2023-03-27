export const state = () => ({
  tickets: [],
});

export const mutations = {
  /**
   *
   * @param {{
   *  lotteryProductId: string;
   *  lotterySessionId: number;
   *  pickNumbers: array<string>;
   *  isChecked: boolean;
   * }} payload
   * @returns
   */
  ADD_TICKET(state, payload) {
    state.tickets.push(payload)
  },
  /**
   *
   * @param {{
   *  lotteryProductId: string;
   *  lotterySessionId: number;
   *  pickNumbers: array<string>;
   *  isChecked: boolean;
   * }} payload
   * @returns
   */
  DELETE_TICKET(state, payload) {
    const index = state.tickets.findIndex((item) => item.pickNumbers.toString() === payload.pickNumbers.toString())
    if (index !== -1)
      state.tickets.splice(index, 1)
  },
  UPDATE_TICKET(state, payload) {
    const index = state.tickets.findIndex((item) => item.pickNumbers.toString() === payload.pickNumbers.toString())
    if (index !== -1)
      state.tickets.splice(index, 1, payload)
  }
};

export const getters = {
  tickets(state) {
    return state.tickets
  },
};

export const actions = {}
