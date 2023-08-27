import { apiClient } from '../services/api'

export default {
  state: {
    allChars: {},
    selectedChars: [],
    searchParam: {
      ids: [],
      rel: null
    },
    searchResult: [],
    selections: {},
    selectedSelections: [],
    charCount: {},
    allCategories: [],
    generalCategories: ['Galactic Legend', 'Leader', 'Healer', 'Attacker', 'Support', 'Tank', 'Capital Ship', 'Cargo Ship', 'Fleet Commander']
  },

  mutations: {
    // Полный список персонажей в алфавитном порядке
    SET_ALL_CHARS (state, payload) {
      state.allChars = payload.data.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
      // function cat (c) {
      //   c.forEach((el) => {
      //     return el
      //   })
      // }
      // console.log(cat(state.disableCategories))
      const categories = payload.data.reduce((acc, item) => {
        item.categories.forEach((category) => {
          // state.disableCategories.forEach((el) => {
          //   console.log(el)
          // })
          if (!state.generalCategories.some(cat => cat === category)) {
            if (!acc.includes(category)) {
              acc.push(category)
            }
          }
        })
        return acc
      }, [])
      state.allCategories = categories.sort((a, b) => {
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
      // console.log(state.allCategories)
    },

    // Выбранные персонажи
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
      state.selectedChars = state.selectedChars.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
    },

    // Искомые персонажи
    SET_SEARCH_PARAM_CHARS (state, payload) {
      if (payload === 'clear') {
        state.searchParam.ids = []
      } else {
        // console.log(state.searchParam.ids)
        // console.log(payload)
        const index = state.searchParam.ids.findIndex((c) => c === payload)
        if (index !== -1) {
          state.searchParam.ids.splice(index, 1)
        } else {
          state.searchParam.ids.push(payload)
        }
      }
    },

    // Уровень реликтов искомых персонажей
    SET_SEARCH_PARAM_REL (state, payload) {
      state.searchParam.rel = payload
    },

    // Результаты поиска
    SET_SEARCH_RESULT (state, payload) {
      state.searchResult = payload.data
    },

    // Подборки
    SET_SELECTIONS (state, payload) {
      // console.log('payload.data в мутации')
      state.selections = payload.data
      // console.log(state.selections)
    },

    // Выбранные подборки
    SET_SELECTED_SELECTION (state, payload) {
      const checkedSelections = state.selections.filter(selection => payload.includes(selection.id))
      checkedSelections.forEach(checkedSelection => {
        checkedSelection.chars.forEach(char => {
          const charExists = state.selectedChars.find(selectedChar => selectedChar.id * 1 === char.id * 1)
          if (!charExists) {
            state.selectedChars.push(char)
            state.searchParam.ids.push(char.id)
          }
        })
      })
      state.selectedChars = state.selectedChars.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
    },

    SET_ALL_CATEGORIES (state, payload) {
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
    },
    async saveSelection ({state}, param) {
      let selection = {
        name: param,
        ids: state.selectedChars.map(el => el.id)
      }
      const { data } = await apiClient.post('/group', JSON.stringify(selection))
      // console.log(data)
      return data
    },
    async selections ({commit}) {
      // console.log('пошел запрос')
      const { data } = await apiClient.get('/group')
      commit('SET_SELECTIONS', data)
    },
    async deleteSelection ({state}, param) {
      // console.log('асинк ' + param)
      const { data } = await apiClient.delete('/group/' + param)
      return data
    }
  },

  getters: {
    GET_ALL_CHARS (state) {
      return state.allChars
    },
    GET_SELECTED_CHARS (state) {
      return state.selectedChars
    },
    GET_SEARCH_PARAM (state) {
      return state.searchParam
    },
    GET_SEARCH_RESULT (state) {
      return state.searchResult
    },
    GET_SELECTIONS (state) {
      return state.selections
    },
    ALL_CATEGORIES (state) {
      return state.allCategories
    },
    GENERAL_CATEGORIES (state) {
      return state.generalCategories
    }
  }
}
