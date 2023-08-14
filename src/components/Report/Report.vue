<template>
  <div class="report">
    <div class="reportHeader">
      <button class="searchBtn" @click.prevent="search('searchByMembers')">Поиск по игрокам</button>
      <h2 class="title reportTitle">Отчет</h2>
      <button class="searchBtn" @click.prevent="search('searchByChars')">Поиск по персонажам</button>
    </div>
    <ul class="reportList">
      <p class="reportItemTitle">{{ addTitleText(resultReport) }}</p>
      <li class="reportItem" v-for="item in resultReport" :key="item.id">
        <h3 class="reportItemName"> {{ item.name_ru }} {{ isNaN(item.external_id) && item.info.length > 1 ? `[${item.info.length}]` : ''}}</h3>
        <ul class="reportItemInfo">
          <li class="infoElement" v-for="element in item.info" :key="element.id">
            <p class="infoRelic" v-if="element.pivot.rel !== null">{{ element.pivot.rel }}р</p>
            <p class="infoRarity" v-else>{{ element.pivot.rarity }}*{{ element.pivot.tir }}т</p>
            <p class="infoName"> {{ element.name_ru }}</p>
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
      return this.$store.state.sw.searchResult
    }
  },

  methods: {
    // search (e) {
    //   if (e === 'members') {
    //     this.$store.dispatch('searchByMembers')
    //   }
    //   if (e === 'chars') {
    //     this.$store.dispatch('searchByChars')
    //   }
    // }

    search (value) {
      this.$store.dispatch(value)
    },

    addTitleText (resultReport) {
      // console.log(resultReport)
      if (resultReport && resultReport.length > 0) {
        if (resultReport.find(item => !isNaN(item.external_id))) {
          return `Найдено игроков [${resultReport.length}]`
        }
      }
    }
  }
}
</script>
