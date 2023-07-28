<template>
<div class="page" @click="filter" style="font-size: 40px; color: white">
  <Header/>
  <!-- {{ units }} -->
  <Body
  :units="units"
  @openPopup="openPopup"
  />
  <Footer/>
  <Popup
  @chois="selectChar"
  :popupState="popupState"
  @closePopup="closePopup"
  @clearUnitList="clearUnitList"
  />
</div>
</template>
<script>

import './Main.css'
import Header from '../components/Header/Header.vue'
import Body from '../components/Body/Body.vue'
import Footer from '../components/Footer/Footer.vue'
import Popup from '../components/Popup/Popup.vue'

export default {
  name: 'Main',

  components: {
    Header,
    Body,
    Footer,
    Popup
  },

  data () {
    return {
      units: [],
      popupState: 'invisible'
    }
  },
  created () {
    // this.fetchGiInfo()
    this.fetchGiAllChars()
  },
  mounted () {
    this.filter() // Зачем он?
  },

  methods: {
    fetchGiInfo () {
      this.$store.dispatch('giInfo')
    },
    fetchGiAllChars () {
      this.$store.dispatch('giAllChars')
    },
    filter () {
    },

    selectChar (item) {
      const index = this.units.findIndex((c) => c.id === item.id)
      if (index !== -1) {
        this.units.splice(index, 1)
      } else {
        this.units.push(item)
      }
    },

    clearUnitList () {
      this.units = []
    },

    openPopup (state) {
      this.popupState = state
    },

    closePopup (state) {
      this.popupState = state
    }
  }
}
</script>

<style scoped>

</style>
