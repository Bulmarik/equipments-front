<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликта</p>
    <div v-for="rel in 9" :key="rel">
      <input @input="selectRel" name="rel" :id="rel" type="radio" :value="rel">
      <label :for="rel">{{rel}}</label>
    </div>
  </div>
  <button class="charSelectButton" @click="popupOpen">полный список доступных персонажей</button>
  <div class="searchChar" v-for="unit in units" :key="unit.id">
    <label>
      <input @input="select(unit.id)" type="checkbox" :id="'checkbox_' + unit.id" />
      {{ unit.name_ru }}
    </label>
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',

  props:
  {
    units:
      {
        type: Array
      }
  },

  data () {
    return {
      selectChars: []
    }
  },
  methods: {
    select (item) {
      this.$store.commit('SET_PARAM_RESULT_CHARS', item)
    },
    selectRel (item) {
      this.$store.commit('SET_PARAM_RESULT_REL', item.target.value)
    },
    popupOpen () {
      this.$emit('openPopup', 'visible')
    }
  }
}
</script>
