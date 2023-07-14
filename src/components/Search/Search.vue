<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <!-- {{ units }} -->
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликта</p>
    <div>
      <!-- <input type="radio" value="1" v-model="us"> -->
      <input type="radio">
      <label>1</label>
    </div>
    <div>
      <input type="radio">
      <label>2</label>
    </div>
    <div>
      <input type="radio">
      <label>3</label>
    </div>
    <div>
      <input type="radio">
      <label>4</label>
    </div>
    <div>
      <input type="radio">
      <label>5</label>
    </div>
    <div>
      <input type="radio">
      <label>6</label>
    </div>
    <div>
      <input type="radio">
      <label>7</label>
    </div>
    <div>
      <input type="radio">
      <label>8</label>
    </div>
    <div>
      <input type="radio">
      <label>9</label>
    </div>
  </div>
  <button class="charSelectButton" @click="popupOpen">полный список доступных персонажей</button>
  <div class="searchChar" v-for="unit in units" :key="unit.id">
    <div>
      <input @input="select(unit.id)" type="checkbox" :id="'checkbox_' + unit.id" />
      <label>{{ unit.name }}</label>
    </div>
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
      console.log(item)
    },
    popupOpen () {
      this.$emit('openPopup', 'visible')
    }
  }
}
</script>
