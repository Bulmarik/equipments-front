<template>
  <div class="popup" :class="addClass(popupState)">
    <button class="popupBtn popupBtnReset" @click="clearUnitList">Сброс</button>
    <button class="popupBtn popupBtnCreateSelection" @click="openInput">Создать подборку</button>
    <button class="popupBtn popupBtnSelections" @click="openSelections">Подборки</button>
    <button class="popupBtn popupBtnOk" @click="closePopup">Ок</button>
    <div class="popupContent">
      <h2 class="popupTitle">Персонажи</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in GET_ALL_CHARS" :key="char.id" v-if="char.type === 'char'">
            <label class="popupItemLabel">
              <img class="popupItemIcon" :src="char.image" alt="иконка перса">
              <div class="popupItemLabelBox">
                <input class="popupCheckbox" @input="setSelectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" :checked="isChecked(char)"/>
                <!-- <input class="popupCheckbox" @input="setSelectedChar(char)" type="checkbox" :id="'checkbox_' + char.id"/> -->
                {{ char.name_ru }}
              </div>
            </label>
        </div>
      </div>
      <h2 class="popupTitle">Корабли</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in GET_ALL_CHARS" :key="char.id" v-if="char.type === 'ship'">
          <label class="popupItemLabel">
            <img class="popupItemIcon" :src="char.image" alt="иконка корабля">
            <div class="popupItemLabelBox">
              <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id">
              {{ char.name_ru }}
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="popupCreate" ref="popupCreateSelection">
      <div class="popupCreateOverlay"></div>
      <form class="popupCreateContainer">
        <button class="popupBtn popupBtnCancel" @click="closeInput('popupCreateGroup')">Отмена</button>
        <input class="popupInput" v-model="groupName" type="text" placeholder="Введите название группы">
        <button class="popupBtn popupBtnSave" @click.prevent="saveSelection">Сохранить</button>
      </form>
    </div>
    <div class="popupSelections" ref="popupSelections">
      <button class="popupBtn popupBtnCancel" @click="closeSelections">Отмена</button>
      <button class="popupBtn popupBtnSave" @click="closeSelections">Ok</button>
      <div class="popupSelection" v-for="item in getSelection" :key="item.id">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Popup',

  data () {
    return {
      // selections: [],
      groupName: ''
    }
  },
  computed: {
    ...mapGetters([
      'GET_ALL_CHARS',
      'GET_SELECTED_CHARS'
    ]),
    // getAllCh () {
    //   return this.$store.getters.sw.GET_ALL_CHARS
    // },
    // allChars () {
    //   return this.$store.state.sw.allChars
    // },
    popupState () {
      return this.$store.state.sw.popupState
    },
    selectedChars () {
      return this.$store.state.sw.selectedChars
    }
  },

  methods: {
    setSelectedChar (item) {
      this.$store.commit('SET_SELECTED_CHARS', item)
    },
    addClass (value) {
      if (value === 'visible') {
        return 'open'
      } else {
        return 'close'
      }
    },
    closePopup () {
      this.$store.commit('SET_POPUP_STATE', 'invisible')
    },
    clearUnitList () {
      this.$store.commit('SET_SELECTED_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_PARAM_CHARS', 'clear')
      this.$store.commit('SET_SEARCH_RESULT', '[]')
      // this.checkboxes = document.querySelectorAll('.popupCheckbox')
      // this.checkboxes.forEach((el) => {
      //   el.checked = false
      // })
    },

    openInput () {
      this.$refs.popupCreateSelection.classList.add('open')
    },
    closeInput () {
      this.$refs.popupCreateSelection.classList.remove('open')
    },
    saveSelection () {
      // localStorage.clear()

      if (localStorage.getItem('groups')) {
        const groups = JSON.parse(localStorage.getItem('groups'))
        groups.push({
          groupName: this.groupName,
          groupItems: this.$store.state.sw.selectedChars
        })
        localStorage.setItem('groups', JSON.stringify(groups))
      } else {
        const groups = []
        groups.push({
          groupName: this.groupName,
          groupItems: this.$store.state.sw.selectedChars
        })
        localStorage.setItem('groups', JSON.stringify(groups))
      }
      // console.log(JSON.parse(localStorage.getItem('groups')))
    },
    openSelections () {
      this.data.selections = JSON.parse(localStorage.getItem('groups'))
      this.$refs.popupSelections.classList.add('open')
      console.log(this.data.selections)
    },
    closeSelections () {
      this.$refs.popupSelections.classList.remove('open')
    },
    getSelection () {
      let selections
      selections = JSON.parse(localStorage.getItem('groups'))
      return selections
    },
    isChecked (char) {
      if (this.GET_SELECTED_CHARS.length > 0) {
        this.GET_SELECTED_CHARS.find(el => {
          return el.id === char.id
        })
      }
    }
  }
}
</script>
