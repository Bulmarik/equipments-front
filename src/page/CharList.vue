<template>
  <div class="charList">
    <div class="charListButtons">
      <button class="charListBtn charListBtnReset" @click="clearList">Сброс</button>
      <button class="charListBtn charlistBtnFrations">Фракции</button>
      <button class="charListBtn charListBtnCreateSelection" @click="openInput">Создать отряд</button>
      <router-link :to="{ name: 'SelectionList' }">
        <button class="charListBtn charListBtnSelections">Отряды</button>
      </router-link>
      <router-link :to="{ name: 'Main' }">
        <button class="charListBtn charListBtnOk">Ок</button>
      </router-link>
    </div>
    <div class="charListContent">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск..."
      />
      <h2 class="charListTitle">Персонажи</h2>
      <div class="charListGrid">
        <div class="charListItem" :class="checked(char)" v-for="char in filteredItems" :key="char.id" :id="char.id" v-if="char.type === 'char'" @click="setSelectedChar(char)">
            <label class="charListItemLabel">
              <img class="charListItemIcon" :src="char.image" alt="иконка перса">
              <div class="charListItemLabelBox">
                {{ char.name_ru }}
              </div>
            </label>
        </div>
      </div>
      <h2 class="charListTitle">Корабли</h2>
      <div class="charListGrid">
        <div class="charListItem" :class="checked(char)" v-for="char in filteredItems" :key="char.id" :id="char.id" v-if="char.type === 'ship'" @click="setSelectedChar(char)">
          <label class="charListItemLabel">
            <img class="charListItemIcon" :src="char.image" alt="иконка корабля">
            <div class="charListItemLabelBox">
              {{ char.name_ru }}
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="charListCreate" ref="charListCreateSelection">
      <div class="charListCreateOverlay"></div>
      <form class="charListCreateContainer">
        <button class="charListBtn charListBtnCancel" @click.prevent="closeInput()">Отмена</button>
        <input class="charListInput" v-model="groupName" type="text" placeholder="Введите название отряда">
        <button class="charListBtn charListBtnSave" @click.prevent="saveSelection">Сохранить</button>
      </form>
    </div>
    <div class="charListCategory" ref="charListCategory">
      <div class="XcharListCreateOverlay">
        <div class="charListPopupContainer"></div>
        <div class="XcharListButtons">
          <button class="charListBtn charListBtnReset" @click="clearList2">Сброс</button>
          <button class="charListBtn charListBtnOk">Ок</button>
        </div>
        <div class="charListCategories">
          <div class="charListGeneralCategory" v-for="category in GENERAL_CATEGORIES" :key="category.id" :id="category.id">
            {{ category }}
          </div>
          <div class="charListCategory" v-for="category in ALL_CATEGORIES" :key="category.id" :id="category.id">
            {{ category }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import clear from '../mixins/clear.js'

export default {
  name: 'CharList',

  mixins: [clear],

  data () {
    return {
      groupName: '',
      fraction: [],
      searchQuery: ''
    }
  },

  mounted () {
    this.$store.dispatch('getAllUnits')
  },

  computed: {
    filteredItems () {
      if (this.GET_ALL_UNITS.length > 0) {
        return this.GET_ALL_UNITS.filter(item => {
          return item.name_ru && item.name_ru.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
      return this.GET_ALL_UNITS
    },
    ...mapGetters([
      'GET_ALL_UNITS',
      'GET_SELECTED_UNITS',
      'GET_SELECTIONS',
      'ALL_CATEGORIES',
      'GENERAL_CATEGORIES'
    ])
  },

  methods: {
    clearList () {
      this.clear()
    },

    setSelectedChar (item) {
      this.isChecked(item)
      this.$store.commit('SET_SELECTED_UNITS', item)
      this.$store.commit('SET_SEARCH_UNIT', item)
    },

    clearList2 () {
      this.clearList123()
    },

    openFraction () {
    },

    openInput () {
      this.$refs.charListCreateSelection.classList.add('open')
    },

    closeInput () {
      this.$refs.charListCreateSelection.classList.remove('open')
    },

    saveSelection () {
      this.$store.dispatch('saveSelection', this.groupName)
        .then(response => {
          console.log(response)
        })
      this.closeInput()
    },

    isChecked (item) {
      document.getElementById(item.id).classList.toggle('checked')
    },

    checked (char) {
      return this.GET_SELECTED_UNITS.find(item => item.id * 1 === char.id * 1) ? 'checked' : ''
    }
  }
}
</script>
