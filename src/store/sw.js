import { apiClient } from '../services/api'

export default {
  state: {
    allChars: {},
    searchParam: {
      ids: [],
      rel: null
    },
    searchResult: [],
    selectedChars: [],
    popupState: 'invisible'
  },

  mutations: {
    SET_ALL_CHARS (state, payload) {
      state.allChars = payload.data.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
    },
    SET_SEARCH_PARAM_CHARS (state, payload) {
      if (payload === 'clear') {
        state.searchParam.ids = []
      } else {
        const index = state.searchParam.ids.findIndex((c) => c === payload)
        if (index !== -1) {
          state.searchParam.ids.splice(index, 1)
        } else {
          state.searchParam.ids.push(payload)
        }
      }
    },

    SET_SEARCH_PARAM_REL (state, payload) {
      state.searchParam.rel = payload
    },
    SET_SEARCH_RESULT (state, payload) {
      state.searchResult = payload.data
    },
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
      // console.log(state.selectedChars)
    },
    SET_POPUP_STATE (state, payload) {
      state.popupState = payload
    }
  },

  actions: {
    async getAllChars ({commit}) {
      const { data } = await apiClient.get('/list-chars')
      commit('SET_ALL_CHARS', data)
    },
    async searchByMembers ({commit, state}) {
      let param = JSON.stringify(state.searchParam)
      const { data } = await apiClient.post('/search-data', param)
      commit('SET_SEARCH_RESULT', data)
    },
    async searchByChars ({commit, state}) {
      let param = JSON.stringify(state.searchParam)
      const { data } = await apiClient.post('/search-data-by-char', param)
      commit('SET_SEARCH_RESULT', data)
    }
  },

  getters: {
    GET_ALL_CHARS (state) {
      return state.allChars
    },
    GET_SELECTED_CHARS (state) {
      return state.selectedChars
    }
  }
}
