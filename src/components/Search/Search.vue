<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликтов</p>
    <div v-for="rel in 10" :key="rel">
      <input @input="selectRel" name="rel" :id="rel" type="radio" :value="rel - 1">
      <label :for="rel">{{rel - 1}}</label>
    </div>
  </div>
  <div class="searchListButtons">
    <button class="charResetButton" @click="clearList">сброс</button>
    <router-link :to="{ name: 'CharList' }">
      <button class="charSelectButton">полный список доступных персонажей</button>
    </router-link>
  </div>
  <div class="searchChar" v-for="char in selectedChars" :key="char.id">
    <label>
      <input @input="select(char.id)" type="checkbox" :id="'checkbox_' + char.id" />
      {{ char.name_ru }}
    </label>
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',

  computed: {
    selectedChars () {
      return this.$store.state.sw.selectedChars
    }
  },

  methods: {
    select (item) {
      this.$store.commit('SET_SEARCH_PARAM_CHARS', item)
    },

    selectRel (item) {
      this.$store.commit('SET_SEARCH_PARAM_REL', item.target.value)
    },

    clearList () {
      const checkedChar = document.querySelectorAll('.checked')
      checkedChar.forEach(el => el.classList.remove('checked'))
      this.$store.commit('SET_SELECTED_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_PARAM_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_RESULT', '[]')
    }
  }
}
</script>
