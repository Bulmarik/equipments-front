<template>
  <div class="report">
    <div class="reportHeader">
      <button class="searchBtn" @click.prevent="search('member')">Поиск по игрокам</button>
      <h2 class="title reportTitle">Отчет</h2>
      <button class="searchBtn" @click.prevent="search('char')">Поиск по персонажам</button>
    </div>
    <ul class="reportList">
      <li class="reportItem" v-for="item in resultReport" :key="item.id">
        <h3 class="reportItemName">{{ item.name_ru }}</h3>
        <ul class="reportItemInfo">
          <li class="infoElement" v-for="element in item.info" :key="element.id">
            <p class="infoRelic">{{ element.pivot.rel }}р</p>
            <p class="infoName">| {{ element.name_ru }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Report',

  data () {
    return {
      stateSearch: null
    }
  },

  computed: {
    resultReport () {
      return this.$store.state.sw.resultSearch
    }
  },

  methods: {
    search (e) {
      if (e === 'member') {
        this.$store.dispatch('search')
      }
      if (e === 'char') {
        this.$store.dispatch('searchByChar')
      }
    }
  }
}
</script>
