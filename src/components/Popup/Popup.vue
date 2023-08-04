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
            <label class="popupItemLabel">
              <img class="popupItemIcon" :src="char.image" alt="иконка перса">
              <div class="popupItemLabelBox">
                <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
                {{ char.name_ru }}
              </div>
            </label>
        </div>
      </div>
      <h2 class="popupTitle">Корабли</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in giAllChars" :key="char.id" v-if="char.type === 'ship'">
          <label class="popupItemLabel">
            <img class="popupItemIcon" :src="char.image" alt="иконка корабля">
            <div class="popupItemLabelBox">
              <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
              {{ char.name_ru }}
            </div>
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

  created () {
    this.checkboxes = document.querySelectorAll('.popupItemCheckbox')
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
      this.$store.dispatch('search')
      for (let i in this.checkboxes) {
        this.checkboxes[i].checked = false
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
