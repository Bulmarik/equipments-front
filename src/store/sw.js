import { apiClient } from '../services/api'

export default {
  state: {
    giInfo: {},
    giAllChars: {},
    resultSearch: [],
    paramResult: {
      ids: [],
      rel: null
    },
    searchByChar: []
  },
  mutations: {
    SET_GI_INFO (state, payload) {
      state.giInfo = payload.data
    },
    SET_ALL_CHARS (state, payload) {
      let charname = payload.data
      charname.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
      state.giAllChars = charname
    },
    SET_RESULT_SEARCH (state, payload) {
      state.resultSearch = payload.data
      // console.log(payload.data)
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
    },
    SEARCH_BY_CHAR (state, payload) {
      state.searchByChar = payload.data
      // let charname = payload.data
      // charname.sort((a, b) => {
      //   if (a.name_ru < b.name_ru) return -1
      //   if (a.name_ru > b.name_ru) return 1
      //   return 0
      // })
      // state.searchByChar = charname
      console.log(payload.data)
    }
  },
  actions: {
    async searchByChar ({commit}) {
      const { data } = await apiClient.post('/search-data-by-char')
      commit('SEARCH_BY_CHAR', data)
    },
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
