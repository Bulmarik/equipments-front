import { apiClient } from '../services/api'
import moment from 'moment'

export default {
  state: {
    allUnits: {},
    selectedUnits: [],
    searchChar: {
      ids: [],
      rel: null
    },
    searchShip: {
      ids: [],
      rel: 0
    },
    searchResult: [],
    selections: {},
    selectedSelections: [],
    allCategories: [],
    generalCategories: ['Galactic Legend', 'Leader', 'Healer', 'Attacker', 'Support', 'Tank', 'Capital Ship', 'Cargo Ship', 'Fleet Commander'],
    preloaderVisibility: false,
    lastUpdateInfo: ''
  },

  mutations: {
    // Полный список персонажей в алфавитном порядке
    SET_ALL_UNITS (state, payload) {
      state.allUnits = payload.data.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
      const categories = payload.data.reduce((acc, item) => {
        item.categories.forEach((category) => {
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
    },

    // Выбранные юниты
    SET_SELECTED_UNITS (state, payload) {
      if (payload === 'clear') {
        state.selectedUnits = []
      } else {
        const index = state.selectedUnits.findIndex((c) => c.id === payload.id)
        if (index !== -1) {
          state.selectedUnits.splice(index, 1)
        } else {
          state.selectedUnits.push(payload)
        }
      }
      state.selectedUnits.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
    },

    // Искомые юниты
    SET_SEARCH_UNIT (state, payload) {
      if (payload === 'clear') {
        state.searchChar.ids = []
        state.searchShip.ids = []
      } else {
        if (payload.type === 'char') {
          const index = state.searchChar.ids.findIndex((c) => c === payload.id)
          if (index !== -1) {
            state.searchChar.ids.splice(index, 1)
          } else {
            state.searchChar.ids.push(payload.id)
          }
        } else {
          const index = state.searchShip.ids.findIndex((c) => c === payload.id)
          if (index !== -1) {
            state.searchShip.ids.splice(index, 1)
          } else {
            state.searchShip.ids.push(payload.id)
          }
        }
      }
    },

    // Уровень реликтов искомых персонажей
    SET_SEARCH_REL (state, payload) {
      state.searchChar.rel = payload
    },

    // Результаты поиска
    SET_SEARCH_RESULT (state, payload) {
      state.searchResult = payload.sort((a, b) => {
        if (a.name_ru.toLowerCase() < b.name_ru.toLowerCase()) return -1
        if (a.name_ru.toLowerCase() > b.name_ru.toLowerCase()) return 1
        return 0
      })
      state.searchResult.forEach(el => el.info.sort((a, b) => {
        if (a.name_ru.toLowerCase() < b.name_ru.toLowerCase()) return -1
        if (a.name_ru.toLowerCase() > b.name_ru.toLowerCase()) return 1
        return 0
      }))
    },

    // Подборки
    SET_SELECTIONS (state, payload) {
      state.selections = payload.data
    },

    // Выбранные подборки
    SET_SELECTED_SELECTION (state, payload) {
      const checkedSelections = state.selections.filter(selection => payload.includes(selection.id))
      checkedSelections.forEach(checkedSelection => {
        checkedSelection.chars.forEach(char => {
          const charExists = state.selectedUnits.find(selectedChar => selectedChar.id * 1 === char.id * 1)
          if (!charExists) {
            state.selectedUnits.push(char)
            if (char.type === 'char') {
              const index = state.searchChar.ids.findIndex((c) => c === char.id)
              if (index === -1) {
                state.searchChar.ids.push(char.id)
              }
            } else {
              const index = state.searchShip.ids.findIndex((c) => c === char.id)
              if (index === -1) {
                state.searchShip.ids.push(char.id)
              }
            }
          }
        })
      })
      state.selectedUnits.sort((a, b) => {
        if (a.name_ru < b.name_ru) return -1
        if (a.name_ru > b.name_ru) return 1
        return 0
      })
    },

    SET_STATUS_UPDATE_INFO (state, payload) {
      state.lastUpdateInfo = moment(payload.updated_at).format('DD.MM.YYYY в hh:mm:ss')
      if (payload.status === 'start') {
        state.preloaderVisibility = true
      } else {
        state.preloaderVisibility = false
      }
    }
  },

  actions: {
    clearList ({ commit }) {
      commit('SET_SELECTED_UNITS', 'clear')
      commit('SET_SEARCH_UNIT', 'clear')
      commit('SET_SEARCH_RESULT', [])
    },

    // Получение списка всех юнитов
    async getAllUnits ({ commit }) {
      const { data } = await apiClient.get('/list-chars')
      commit('SET_ALL_UNITS', data)
    },

    // Поиск по игрокам
    async searchByMembers ({ commit, state }) {
      let charParam = JSON.stringify(state.searchChar)
      let shipParam = JSON.stringify(state.searchShip)
      const charData = await apiClient.post('/search-data', charParam)
      const shipData = await apiClient.post('/search-data', shipParam)
      charData.data.data.forEach(item => {
        const elem = shipData.data.data.find(el => el.name === item.name)
        if (elem) {
          item.info = item.info.concat(elem.info)
        }
      })
      commit('SET_SEARCH_RESULT', charData.data.data)
    },

    // Поиск по персонажам
    async searchByUnits ({ commit, state }) {
      let charParam = JSON.stringify(state.searchChar)
      let shipParam = JSON.stringify(state.searchShip)
      const charData = await apiClient.post('/search-data-by-char', charParam)
      const shipData = await apiClient.post('/search-data-by-char', shipParam)
      const data = [...charData.data.data, ...shipData.data.data]
      commit('SET_SEARCH_RESULT', data)
    },

    // Сохранение подборки
    async saveSelection ({ state }, param) {
      let selection = {
        name: param,
        ids: state.selectedUnits.map(el => el.id)
      }
      const { data } = await apiClient.post('/group', JSON.stringify(selection))
      return data
    },

    // Получение списка созданных подборок
    async getAllSelections ({ commit }) {
      const { data } = await apiClient.get('/group')
      commit('SET_SELECTIONS', data)
    },

    // Удаление подборки
    async deleteSelection ({ state }, param) {
      const { data } = await apiClient.delete('/group/' + param)
      return data
    },

    // Запрос статуса обновления инфы
    async statusUpdateInfo ({ commit }) {
      const { data } = await apiClient.get('/status-last-update')
      commit('SET_STATUS_UPDATE_INFO', data.data)
    },

    // Обновление инфы гильды
    async updateInfo ({ commit }) {
      const statusUpdate = {
        status: 'start'
      }
      commit('SET_STATUS_UPDATE_INFO', statusUpdate)
      const { data } = await apiClient.post('/load-data')
      commit('SET_STATUS_UPDATE_INFO', data.data)
    }
  },

  getters: {
    GET_ALL_UNITS (state) {
      return state.allUnits
    },
    GET_SELECTED_UNITS (state) {
      return state.selectedUnits
    },
    GET_SEARCH_UNITS (state) {
      const searchUnits = {
        ids: [...state.searchChar.ids, ...state.searchShip.ids],
        rel: state.searchChar.rel
      }
      return searchUnits
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
