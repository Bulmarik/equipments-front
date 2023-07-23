import { apiClient } from '../services/api'

export default {
  state: {
    giInfo: {},
    giAllChars: {},
    resultSearch: [],
    paramResult: {
      ids: [],
      rel: null
    }
  },
  mutations: {
    SET_GI_INFO (state, payload) {
      state.giInfo = payload.data
    },
    SET_ALL_CHARS (state, payload) {
      state.giAllChars = payload.data
    },
    SET_RESULT_SEARCH (state, payload) {
      state.resultSearch = payload.data
    },
    SET_PARAM_RESULT_REL (state, payload) {
      state.paramResult.rel = payload
    },
    SET_PARAM_RESULT_CHARS (state, payload) {
      const index = state.paramResult.ids.findIndex((c) => c === payload)
      if (index !== -1) {
        state.paramResult.ids.splice(index, 1)
      } else {
        state.paramResult.ids.push(payload)
      }
    }
  },
  actions: {
    async search ({commit, state}) {
      let param = JSON.stringify(state.paramResult)
      const { data } = await apiClient.post('/search-data', param)
      commit('SET_RESULT_SEARCH', data)
    },
    async giInfo ({
      commit
    }) {
      const { data } = await apiClient.get('/gi')
      commit('SET_GI_INFO', data)
    },
    async giAllChars ({
      commit
    }) {
      const { data } = await apiClient.get('/list-chars')
      commit('SET_ALL_CHARS', data)
    }
  },
  getters: {}
}
