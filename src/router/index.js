import Vue from 'vue'
import Router from 'vue-router'
import Main from '../page/Main'
import CharList from '../page/CharList'
import SelectionList from '../page/SelectionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/char-list',
      name: 'CharList',
      component: CharList
    },
    {
      path: '/selection-list',
      name: 'SelectionList',
      component: SelectionList
    }
  ]
})
