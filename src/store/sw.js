import { apiClient } from '../services/api'

export default {
  state: {
    selectedChars: [],
    giAllChars: {},
    resultSearch: [],
    paramResult: {
      ids: [],
      rel: null
    },
    searchByChar: [],
    popupState: 'invisible'
  },

  mutations: {
    SET_SELECTED_CHARS (state, payload) {
      if (payload === 'clear') {
        state.selectedChars = []
      } else {
        const index = state.selectedChars.findIndex((c) => c.id === payload.id)
        if (index !== -1) {
          state.selectedChars.splice(index, 1)
        } else {
          state.selectedChars.push(payload)
        }
      }
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
    },
    SET_PARAM_RESULT_REL (state, payload) {
      state.paramResult.rel = payload
    },
    SET_PARAM_RESULT_CHARS (state, payload) {
      if (payload === 'clear') {
        state.paramResult.ids = []
      } else {
        const index = state.paramResult.ids.findIndex((c) => c === payload)
        if (index !== -1) {
          state.paramResult.ids.splice(index, 1)
        } else {
          state.paramResult.ids.push(payload)
        }
      }
      console.log(state.paramResult.ids)
    },
    SEARCH_BY_CHAR (state, payload) {
      state.resultSearch = payload.data
    },
    SET_POPUP_STATE (state, payload) {
      state.popupState = payload
    }
  },

  actions: {
    async searchByChar ({commit, state}) {
      let param = JSON.stringify(state.paramResult)
      const { data } = await apiClient.post('/search-data-by-char', param)
      commit('SEARCH_BY_CHAR', data)
    },
    async search ({commit, state}) {
      let param = JSON.stringify(state.paramResult)
      const { data } = await apiClient.post('/search-data', param)
      commit('SET_RESULT_SEARCH', data)
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
