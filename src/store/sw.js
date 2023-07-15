import { apiClient } from '../services/api'

export default {
  state: {
    giInfo: {},
    giAllChars: {}
  },
  mutations: {
    SET_GI_INFO (state, payload) {
      state.giInfo = payload.data
    },
    SET_ALL_CHARS (state, payload) {
      state.giAllChars = payload.data
    }
  },
  actions: {
    async giInfo ({
      commit
    }) {
      const { data } = await apiClient.get('/gi')
      // console.log(data)
      commit('SET_GI_INFO', data)
    },
    async giAllChars ({
      commit
    }) {
      const { data } = await apiClient.get('/list-chars')
      console.log(data)
      commit('SET_ALL_CHARS', data)
    }
  },
  getters: {}
}
