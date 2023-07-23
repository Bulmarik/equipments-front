<template>
  <div class="popup" :class="addClass(popupState)">
    <!-- {{$store.state.sw.giInfo}} -->
    <button class="popupCloseBtn" @click="popupClose">X</button>
    <div class="popupGrid">
      <div class="popupGridItem" v-for="char in giAllChars" :key="char.external_id">
        <input class="popupGridCheckbox" @input="$emit('chois', char)" type="checkbox" :external_id="'checkbox_' + char.id" />
        <label>{{ char.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',

  props:
  {
    // allChars:
    //   {
    //     type: Array
    //   },
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
    giInfo () {
      return this.$store.state.sw.giInfo
    },
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
