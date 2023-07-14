<template>
  <div class="popupGrid" :class="addClass(popupState)">
    <button class="popupCloseBtn" @click="popupClose">X</button>
    <div class="popupGridItem" v-for="char in allChars" :key="char.id">
      <input class="popupGridCheckbox" @input="$emit('chois', char)" type="checkbox" :id="'checkbox_' + char.id" />
      <label>{{ char.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',

  props:
  {
    allChars:
      {
        type: Array
      },
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
    }
  }
}
</script>
