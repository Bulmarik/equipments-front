<template>
  <div class="popup" :class="addClass(popupState)">
    <button class="popupBtn popupBtnReset" @click="clearUnitList">Сброс</button>
    <button class="popupBtn popupBtnOk" @click="popupClose">Ок</button>
    <div class="popupContent">
      <h2 class="popupTitle">Персонажи</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in giAllChars" :key="char.id" v-if="char.type === 'char'">
            <label class="popupItemLabel">
              <div class="popupItemLabelBox">
                <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
                {{ char.name_ru }}
              </div>
              <img class="popupItemIcon" :src="char.image" alt="иконка перса">
            </label>
        </div>
      </div>
      <h2 class="popupTitle">Корабли</h2>
      <div class="popupGrid">
        <div class="popupItem" v-for="char in giAllChars" :key="char.id" v-if="char.type === 'ship'">
          <label class="popupItemLabel">
            <div class="popupItemLabelBox">
              <input class="popupItemCheckbox" @input="selectedChar(char)" type="checkbox" :id="'checkbox_' + char.id" />
              {{ char.name_ru }}
            </div>
            <img class="popupItemIcon" :src="char.image" alt="иконка перса">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',

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
        return 'popupOpen'
      } else {
        return 'popupClose'
      }
    },
    popupClose () {
      this.$store.commit('SET_POPUP_STATE', 'invisible')
    },
    clearUnitList () {
      this.$store.commit('SET_SELECTED_CHARS', 'clear')
      this.$store.commit('SET_PARAM_RESULT_CHARS', 'clear')
      this.$store.dispatch('search')
      let checkboxes = document.querySelectorAll('.popupItemCheckbox')
      for (let i in checkboxes) {
        checkboxes[i].checked = false
      }
    }
  }
}
</script>
