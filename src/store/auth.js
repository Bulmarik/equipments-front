import { apiClient } from '../services/api'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default {
  state: {
    user: null
  },
  mutations: {
    UPDATE_USER_DATA (state, userData) {
      state.user = userData
    },
    SET_USER_DATA (state, userData) {
      const token = userData.token
      state.user = userData
      // console.log(userData, 'userData')
      apiClient.defaults.headers.common.Authorization = `Bearer ${userData.token}`
      delete userData.token
      window.localStorage.setItem('user_data', JSON.stringify(userData))
      state.user.token = token
    }
  },
  actions: {
    async login ({
      commit,
      dispatch
    }, credentials) {
      const { data } = await apiClient.post('/login', credentials)
      commit('SET_USER_DATA', data.data)
      return data
    },
    async logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      if (state.user) {
        return state.user.user_data
      }
    },
    token (state) {
      if (state.user) {
        return state.user.token
      }
      return null
    }
  }
}
