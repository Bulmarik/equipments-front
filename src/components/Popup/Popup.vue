<template>
  <div class="popup" :class="addClass(popupState)">
    <button class="popupBtn popupBtnReset" @click="clearUnitList">Сброс</button>
    <button class="popupBtn popupBtnCreateSelection" @click="openInput">Создать подборку</button>
    <button class="popupBtn popupBtnSelections" @click="openSelections">Подборки</button>
    <button class="popupBtn popupBtnOk" @click="closePopup">Ок</button>
    <div class="popupContent">
      <h2 class="popupTitle">Персонажи</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in giAllChars" :key="char.id" v-if="char.type === 'char'">
          <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
            <label class="popupItemLabel">
              <span class="popupItemLabelBox">

                {{ char.name_ru }}
              </span>
              <img class="popupItemIcon" :src="char.image" alt="иконка перса">
            </label>
        </div>
      </div>
      <h2 class="popupTitle">Корабли</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in giAllChars" :key="char.id" v-if="char.type === 'ship'">
          <label class="popupItemLabel">
            <span class="popupItemLabelBox">
              <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
              {{ char.name_ru }}
            </span>
            <img class="popupItemIcon" :src="char.image" alt="иконка корабля">
          </label>
        </div>
      </div>
    </div>
    <div class="popupCreate" ref="popupCreateSelection">
      <div class="popupCreateOverlay"></div>
      <div class="popupCreateContainer">
        <button class="popupBtn popupBtnCancel" @click="closeInput('popupCreateGroup')">Отмена</button>
        <input class="popupInput" type="text" placeholder="Введите название группы">
        <button class="popupBtn popupBtnSave" @click="closeInput">Сохранить</button>
      </div>
    </div>
    <div class="popupSelections" ref="popupSelections">
      <button class="popupBtn popupBtnCancel" @click="closeSelections">Отмена</button>
      <button class="popupBtn popupBtnSave" @click="closeSelections">Ok</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',

  data () {
    return {
      checkboxes: []
    }
  },

  mounted () {
    // this.checkboxes = document.querySelectorAll('.popupItemCheckbox')
    let rr = document.querySelectorAll('.popupItemLabelBox')
    // this.checkboxes = rr.forEach(e => {
    //   console.log(e.querySelector('input'))
    //   // this.checkboxes[e.querySelector('input')]
    // })
    for (let i in rr) {
      console.log(rr[i])
      this.checkboxes.push(rr[i])
      // this.checkboxes[i] = rr[i].querySelector('input')
    }
    console.log(this.checkboxes.length)
    console.log(document.querySelectorAll('.popupItemLabelBox').length)
  },

  computed: {
    giAllChars () {
      return this.$store.state.sw.giAllChars
    },
    popupState () {
      return this.$store.state.sw.popupState
    }
  },

  methods: {
    selectedChar (item) {
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
      this.$store.commit('SET_PARAM_RESULT_CHARS', 'clear')
      this.$store.commit('SET_RESULT_SEARCH', [])

      // this.$store.dispatch('search')
      for (let i in this.checkboxes) {
        this.checkboxes[i].checked = false
        console.log(this.checkboxes)
        console.log(this.checkboxes.length)
      }
    },
    openInput () {
      this.$refs.popupCreateSelection.classList.add('open')
    },
    closeInput () {
      this.$refs.popupCreateSelection.classList.remove('open')
    },
    saveSelection () {
    },
    openSelections () {
      this.$refs.popupSelections.classList.add('open')
    },
    closeSelections () {
      this.$refs.popupSelections.classList.remove('open')
    }
  }
}
</script>
