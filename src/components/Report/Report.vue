<template>
  <div class="report">
    <div class="reportHeader">
      <div class="btnWrapper">
        <button class="searchBtn" @click.prevent="search('searchByMembers')">Поиск по игрокам</button>
        <label class="checkboxLabel">
          <input type="checkbox" class="fullСoincidenceCheckbox" v-model="searchUnitsLength" v-bind:true-value=GET_SEARCH_UNITS.ids.length v-bind:false-value="0">
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
    <ul class="reportList">
      <h4 class="reportItemTitle">{{ titleText }}</h4>
      <!-- !!!разобраться!!! -->
      <li class="reportItem" v-for="item in GET_SEARCH_RESULT" :key="item.id" v-if="(!isNaN(item.external_id) || (item.info && item.info.length < lengthLimit)) && (item.info && item.info.length >= searchUnitsLength)">
        <h3 class="reportItemName"> {{ item.name_ru }} {{ isNaN(item.external_id) && item.info.length > 1 ? `[${item.info.length}]` : ''}}</h3>
        <!-- <h3 class="reportItemName"> {{ item.name_ru }}</h3> -->
        <ul class="reportItemInfo">
          <li class="infoElement" v-for="element in item.info" :key="element.id">
            <p class="infoRelic" v-if="element.pivot.rel !== null">{{ element.pivot.rel + 'р' }}</p>
            <p class="infoRarity" v-else>{{ element.pivot.rarity + '*' }}{{ element.pivot.tir !== 1 ? element.pivot.tir + 'т' : ''}}</p>
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
      lengthLimit: '50',
      searchUnitsLength: '0'
    }
  },

  computed: {
    ...mapGetters([
      'GET_SEARCH_UNITS',
      'GET_SEARCH_RESULT'
    ])
  },

  methods: {
    search (value) {
      // this.qwe()
      this.$store.dispatch(value)
        .then(response => {
          this.addTitleText()
        })
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
    // qwe () {
    //   const arr1 = [
    //     {
    //       name: 'a',
    //       key: [1, 2]
    //     },
    //     {
    //       name: 'b',
    //       key: [3, 4]
    //     },
    //     {
    //       name: 'c',
    //       key: [5, 6]
    //     }
    //   ]
    //   const arr2 = [
    //     {
    //       name: 'd',
    //       key: [7, 8]
    //     },
    //     {
    //       name: 'a',
    //       key: [9, 10]
    //     },
    //     {
    //       name: 'c',
    //       key: [11, 12]
    //     }
    //   ]
    //   arr1.forEach(item => {
    //     const asd = arr2.find(elem => elem.name === item.name)
    //     if (asd) {
    //       item.key = item.key.concat(asd.key)
    //     }
    //   })
    //   console.log(arr1)
    // }
  }
}
</script>
