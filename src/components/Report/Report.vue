<template>
  <div class="report">
    <div class="reportHeader">
      <button class="searchBtn" @click.prevent="search('searchByMembers')">Поиск по игрокам</button>
      <h2 class="title reportTitle">Отчет</h2>
      <div class="btnWrapper">
        <button class="searchBtn" @click.prevent="search('searchByChars')">Поиск по персонажам</button>
        <label class="limitCheckboxLabel">
          <input type="checkbox" class="limitCheckbox" id="limitCheckbox">
          показать только редкие
        </label>
      </div>
    </div>
    <ul class="reportList">
      <h4 class="reportItemTitle">{{ titleText }}</h4>
      <li class="reportItem" v-for="item in GET_SEARCH_RESULT" :key="item.id" v-if="!isNaN(item.external_id) || item.info.length < limitCheckbox()">
        <h3 class="reportItemName"> {{ item.name_ru }} {{ isNaN(item.external_id) && item.info.length > 1 ? `[${item.info.length}]` : ''}}</h3>
        <ul class="reportItemInfo">
          <li class="infoElement" v-for="element in item.info" :key="element.id">
            <p class="infoRelic" v-if="element.pivot.rel && element.pivot.rel !== null">{{ element.pivot.rel }}р</p>
            <p class="infoRarity" v-else>{{ element.pivot.rarity }}*{{ element.pivot.tir }}т</p>
            <p class="infoOmic">{{ element.pivot.ability_data.length >= 3 ? 'O' : '' }}</p>
            <p class="infoName">{{ element.name_ru }}</p>
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
      titleText: '',
      limit: ''
    }
  },

  computed: {
    ...mapGetters([
      'GET_SEARCH_RESULT'
    ])
  },

  methods: {
    search (value) {
      this.$store.dispatch(value)
        .then(response => {
          this.addTitleText()
        })
    },
    limitCheckbox () {
      if (document.getElementById('limitCheckbox').checked) {
        return 10
      } else {
        return 50
      }
    },
    addTitleText () {
      // console.log(this.GET_SEARCH_RESULT)
      if (this.GET_SEARCH_RESULT.length === 0) {
        this.titleText = 'Ничего не найдено'
      } else {
        if (this.GET_SEARCH_RESULT.find(item => !isNaN(item.external_id))) {
          this.titleText = `Найдено игроков [${this.GET_SEARCH_RESULT.length}]`
        } else {
          this.titleText = ''
        }
      }
    }
  }
}
</script>
