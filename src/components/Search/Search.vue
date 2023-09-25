<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликтов</p>
    <div v-for="rel in 10" :key="rel">
      <input type="radio" @input="selectRel" :id="rel" name="rel" :value="rel - 1" :checked="checked(rel - 1, 'rel')"/>
      <label :for="rel">{{rel - 1}}</label>
    </div>
  </div>
  <div class="searchListButtons">
    <button class="charResetButton" @click="clearList">сброс</button>
    <router-link :to="{ name: 'CharList' }">
      <button class="charSelectButton">полный список доступных персонажей</button>
    </router-link>
  </div>
  <div class="searchChar" v-for="unit in GET_SELECTED_UNITS" :key="unit.id">
    <label>
      <input type="checkbox" @input="select(unit)" :id="'checkbox_' + unit.id" :checked="checked(unit.id, 'ids')"/>
      <!-- <input type="checkbox" @input="select(char)" :id="'checkbox_' + char.id" :checked="checked()"/> -->
      <!-- <input type="checkbox" :id="'checkbox_' + char.id" :checked="checked()"/> -->
      {{ unit.name_ru }}
    </label>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Search',

  computed: {
    ...mapGetters([
      'GET_SELECTED_UNITS',
      'GET_SEARCH_UNITS'
    ])
  },

  methods: {
    select (item) {
      // console.log(item)
      this.$store.commit('SET_SEARCH_UNIT', item)
    },

    selectRel (item) {
      this.$store.commit('SET_SEARCH_REL', item.target.value)
    },

    clearList () {
      // const checkedChar = document.querySelectorAll('.checked')
      // checkedChar.forEach(el => el.classList.remove('checked'))
      this.$store.commit('SET_SEARCH_RESULT', '[]')
      this.$store.commit('SET_SELECTED_UNITS', 'clear')
      this.$store.commit('SET_SEARCH_UNIT', 'clear')
    },

    checked (value, param) {
      if (param === 'ids') {
        return this.GET_SEARCH_UNITS[param].find(item => item === value)
      } else {
        return Number(this.GET_SEARCH_UNITS[param]) === value
      }
    }
  }
}
</script>
