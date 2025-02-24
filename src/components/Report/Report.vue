<template>
  <div class="report">
    <div class="reportHeader">
      <div class="btnWrapper">
        <button class="searchBtn" @click.prevent="search('searchByMembers')">Поиск по игрокам</button>
        <label class="checkboxLabel">
          <input type="checkbox" class="coincidenceCheckbox" v-model="searchUnitsLength" v-bind:true-value=GET_SEARCH_UNITS.ids.length v-bind:false-value="0">
          только полные совпадения
        </label>
      </div>
      <h2 class="title reportTitle">Отчет</h2>
      <div class="btnWrapper">
        <button class="searchBtn" @click.prevent="search('searchByUnits')">Поиск по персонажам</button>
        <label class="checkboxLabel">
          <input type="checkbox" class="limitCheckbox" v-model="lengthLimit" v-bind:true-value="10" v-bind:false-value="50">
          только малочисленные
        </label>
      </div>
    </div>
    <!-- {{ GET_SEARCH_RESULT }} -->
    <ul class="reportList">
      <h4 class="reportItemTitle">{{ addTitleText }}</h4>
      <li class="reportItem" v-for="item in GET_SEARCH_RESULT" :key="item.id" v-if="(item.external_id.length !== 36 || (item.info && item.info.length < lengthLimit)) && (item.info && item.info.length >= searchUnitsLength)">
        <h3 class="reportItemName"> {{ item.name_ru }} {{ item.external_id.length !== 36 && item.info.length > 1 ? `[${item.info.length}]` : ''}}</h3>
        <ul class="reportItemInfo">
          <li class="infoElement" v-for="element in item.info" :key="element.id">
            <p class="infoRelic" v-if="element.rel !== null">{{ element.rel + 'р' }}</p>
            <p class="infoRarity" v-else>{{ element.rarity + '*' }}{{ element.tir !== 1 ? element.tir + 'т' : ''}}</p>
            <p class="infoUltimate">{{hasUltimate(element.ultimate)}}</p>
            <p class="infoName">{{ element.name_ru }}</p>
            <div class="infoOmics" v-for="ability in element.ability_data"  v-if="ability.isOmicronTier" :key="ability.id">
              <img class="infoOmicIcon" :src=ability.image alt="Омик">
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Report',

  data () {
    return {
      // titleText: '',
      lengthLimit: 50,
      searchUnitsLength: 0
    }
  },

  computed: {
    ...mapGetters([
      'GET_SEARCH_UNITS',
      'GET_SEARCH_RESULT'
    ]),

    addTitleText () {
      let titleText
      if (this.GET_SEARCH_RESULT.find(item => item.external_id.length !== 36)) {
        titleText = ''
      } else if (this.GET_SEARCH_RESULT.length === 0 || this.coincidenceCounter() === 0) {
        titleText = 'Ничего не найдено'
      } else if (this.coincidenceCounter() % 10 === 1) {
        titleText = `Найдено у ${this.coincidenceCounter()} игрока`
      } else {
        titleText = `Найдено у ${this.coincidenceCounter()} игроков`
      }
      return titleText
    }
  },

  methods: {
    hasUltimate (val) {
      return val ? 'У' : ''
    },

    search (value) {
      this.$store.dispatch(value)
      // .then(response => {
      // this.addTitleText()
      // })
    },

    coincidenceCounter () {
      let value = 0
      this.GET_SEARCH_RESULT.forEach(element => {
        if (element.info.length >= this.searchUnitsLength) {
          value++
        }
      })
      return value
    }

    // addTitleText () {
    //   if (this.GET_SEARCH_RESULT.length === 0) {
    //     this.titleText = 'Ничего не найдено'
    //   } else {
    //     if (this.GET_SEARCH_RESULT.find(item => item.external_id.length === 36)) {
    //       this.titleText = `Найдено у ${this.GET_SEARCH_RESULT.length} игроков`
    //       this.titleText = `Найдено у ${this.valueCounter} игроков`
    //     } else {
    //       this.titleText = ''
    //     }
    //   }
    // }
  }
}
</script>
