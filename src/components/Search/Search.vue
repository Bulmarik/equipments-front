<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликта</p>
    <div v-for="rel in 10" :key="rel">
      <input @input="selectRel" name="rel" :id="rel" type="radio" :value="rel - 1">
      <label :for="rel">{{rel - 1}}</label>
    </div>
  </div>
  <div class="searchListButtons">
    <button class="charResetButton">сброс</button>
    <button class="charSelectButton" @click="popupOpen">полный список доступных персонажей</button>
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
    popupOpen () {
      this.$store.commit('SET_POPUP_STATE', 'visible')
    }
  }
}
</script>
