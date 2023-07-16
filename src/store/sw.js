import { apiClient } from '../services/api'

export default {
  state: {
    giInfo: {},
    giAllChars: {},
    resultSearch: []
  },
  mutations: {
    SET_GI_INFO (state, payload) {
      state.giInfo = payload.data
    },
    SET_ALL_CHARS (state, payload) {
      state.giAllChars = payload.data
    },
    SET_RESULT_SEARCH (state, payload) {
      state.resultSearch = payload
    }
  },
  actions: {
    search ({commit}) {
      let data = [
        {
          id: 1,
          name: 'Игрок1',
          units: [
            {
              id: 1,
              external_id: 'pl1',
              rel: 1,
              name: 'Имя перс452а1'
            },
            {
              id: 3,
              external_id: 'pl123',
              rel: 3,
              name: 'Имя 452перса1'
            }
          ]
        },
        {
          id: 2,
          name: 'Игрок2',
          units: [
            {
              id: 1,
              external_id: 'pl1',
              rel: 1,
              name: 'Имя пе452452рса1'
            },
            {
              id: 4,
              external_id: 'pl123',
              rel: 4,
              name: 'Имя п45245ерса1'
            },
            {
              id: 5,
              external_id: 'pl123dsf',
              rel: 5,
              name: 'Имя45245 перса1'
            }
          ]
        },
        {
          id: 3,
          name: 'Игрок3',
          units: [
            {
              id: 1,
              external_id: 'pl1',
              rel: 1,
              name: 'Имя перс4545а1'
            },
            {
              id: 4,
              external_id: 'pl123',
              rel: 2,
              name: 'Имя перса4452'
            },
            {
              id: 5,
              external_id: 'pl123dsf',
              rel: 6,
              name: 'Имя перса453534'
            },
            {
              id: 7,
              external_id: 'pl123123112',
              rel: 1,
              name: 'Имя перса53553'
            },
            {
              id: 9,
              external_id: 'pl123dsf12312',
              rel: 6,
              name: 'Имя перса889'
            }
          ]
        }
      ]
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
