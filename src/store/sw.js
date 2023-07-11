import { apiClient } from '../services/api'

export default {
  state: {
    giInfo: {}
  },
  mutations: {
    SET_GI_INFO (state, payload) {
      state.giInfo = payload.data
    }
  },
  actions: {
    async giInfo ({
      commit
    }) {
      const { data } = await apiClient.get('/gi')
      console.log(data)
      commit('SET_GI_INFO', data)
    }
  },
  getters: {}
}
