<template>
<div class="searchList">
  <h2 class="title searchTitle">Запрос</h2>
  <div class="searchRel">
    <p class="searchRelDesc">наименьший уровень реликта</p>
    <div>
      <input type="radio" value="1" v-model="user">
      <label>1</label>
    </div>
    <div>
      <input type="radio" value="2" v-model="user">
      <label>2</label>
    </div>
    <div>
      <input type="radio" value="3" v-model="user">
      <label>3</label>
    </div>
    <div>
      <input type="radio" value="4" v-model="user">
      <label>4</label>
    </div>
    <div>
      <input type="radio" value="5" v-model="user">
      <label>5</label>
    </div>
    <div>
      <input type="radio" value="6" v-model="user">
      <label>6</label>
    </div>
    <div>
      <input type="radio" value="7" v-model="user">
      <label>7</label>
    </div>
    <div>
      <input type="radio" value="8" v-model="user">
      <label>8</label>
    </div>
    <div>
      <input type="radio" value="9" v-model="user">
      <label>9</label>
    </div>
  </div>
  <button class="charSelectButton">полный список доступных персонажей</button>
  <div class="searchChar" v-for="char in chars" :key="char.id">
    <div>
      <input @input="select(char.id)" type="checkbox" :id="'checkbox_' + char.id" />
      <label>{{ char.name }}</label>
      <!-- <label :class="addClass(item.id)" :for="'checkbox_' + item.id">{{ item.name }}</label> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',
  props:
  {
    chars:
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
    }
    // addClass (value) {
    //   if (value > 1) {
    //     return 'red'
    //   } else {
    //     return 'green'
    //   }
    // }
  }

}
</script>
