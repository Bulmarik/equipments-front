<template>
  <div class="popup" :class="addClass(popupState)">
    <h2 class="popupTitle">Персонажи</h2>
    <button class="popupBtn popupBtnReset">Сброс</button>
    <button class="popupBtn popupBtnOk" @click="popupClose">Ок</button>
    <div class="popupGrid">
      <div class="popupItem" v-for="char in giAllChars" :key="char.id">
        <label class="popupItemLabel">
          <div class="popupItemLabelBox">
            <input class="popupItemCheckbox" @input="$emit('chois', char)" type="checkbox" :id="'checkbox_' + char.id" />
            {{ char.name_ru }}
          </div>
          <img class="popupItemIcon" src="../../images/tex.charui_coruscantpolice.png" alt="иконка перса">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',

  props:
  {
    popupState:
      {
        type: String
      }
  },

  data () {
    return {
      selectedChars: []
    }
  },

  computed: {
    giAllChars () {
      return this.$store.state.sw.giAllChars
    }
  },

  methods: {
    charSelection (value) {
      this.$emit('chois', value)
    },
    addClass (value) {
      if (value === 'visible') {
        return 'popupOpen'
      } else {
        return 'popupClose'
      }
    },
    popupClose () {
      this.$emit('closePopup', 'invisible')
      // console.log(this.$store.state.sw.giInfo)
    }
  }
}
</script>
