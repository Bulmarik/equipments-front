<template>
  <div class="charList">
    <button class="charListBtn charListBtnReset" @click="clearList">Сброс</button>
    <button class="charListBtn charListBtnCreateSelection" @click="openInput">Создать подборку</button>
    <button class="charListBtn charListBtnSelections" @click="openSelections">Подборки</button>
    <router-link :to="{ name: 'Main' }">
      <button class="charListBtn charListBtnOk">Ок</button>
    </router-link>
    <div class="charListContent">
      <h2 class="charListTitle">Персонажи</h2>
      <div class="charListGrid">
        <div class="charListItem" :class="checked(char)" v-for="char in GET_ALL_CHARS" :key="char.id" :id="char.id" v-if="char.type === 'char'" @click="setSelectedChar(char)">
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
        <div class="charListItem" :class="checked(char)" v-for="char in GET_ALL_CHARS" :key="char.id" :id="char.id" v-if="char.type === 'ship'" @click="setSelectedChar(char)">
          <label class="charListItemLabel">
            <img class="charListItemIcon" :src="char.image" alt="иконка корабля">
            <div class="charListItemLabelBox">
              <!-- <input class="charListItemCheckbox" @input="setSelectedChar(char)" type="checkbox" :id="'checkbox_' + char.id"> -->
              {{ char.name_ru }}
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="charListCreate" ref="charListCreateSelection">
      <div class="charListCreateOverlay"></div>
      <form class="charListCreateContainer">
        <button class="charListBtn charListBtnCancel" @click="closeInput()">Отмена</button>
        <input class="charListInput" v-model="groupName" type="text" placeholder="Введите название группы">
        <button class="charListBtn charListBtnSave" @click.prevent="saveSelection">Сохранить</button>
      </form>
    </div>
    <div class="charListSelections" ref="charListSelections">
      <button class="charListBtn charListBtnCancel" @click="closeSelections">Отмена</button>
      <button class="charListBtn charListBtnSave" @click="closeSelections">Ok</button>
      <!-- <div class="charListSelection" v-for="item in getSelection" :key="item.id">
        {{item}}
      </div> -->
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import clearList from '../components/ClearList/ClearList.mjs'

export default {
  name: 'CharList',

  data () {
    return {
      groupName: ''
    }
  },

  mounted () {
    this.$store.dispatch('getAllChars')
  },

  computed: {
    ...mapGetters([
      'GET_ALL_CHARS',
      'GET_SELECTED_CHARS'
    ])
  },

  methods: {
    setSelectedChar (item) {
      this.isChecked(item)
      this.$store.commit('SET_SELECTED_CHARS', item)
    },

    clearList () {
      const checkedChar = document.querySelectorAll('.checked')
      checkedChar.forEach(el => el.classList.remove('checked'))
      this.$store.commit('SET_SELECTED_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_PARAM_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_RESULT', '[]')
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
    },

    openSelections () {
      // this.data.selections = JSON.parse(localStorage.getItem('groups'))
      // console.log(this.data.selections)

      this.$store.dispatch('selections')

      // this.$refs.charListSelections.classList.add('open')
    },

    closeSelections () {
      this.$refs.charListSelections.classList.remove('open')
    },

    // getSelection () {
    //   let selections
    //   selections = JSON.parse(localStorage.getItem('groups'))
    //   return selections
    // },

    isChecked (item) {
      document.getElementById(item.id).classList.toggle('checked')
    },

    checked (char) {
      return this.GET_SELECTED_CHARS.find(item => item.id === char.id) ? 'checked' : ''
    }
  }
}
</script>
