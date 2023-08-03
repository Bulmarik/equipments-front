<template>
<div class="page" style="font-size: 40px; color: white">
  <Header/>
  <Body
  />
  <Footer/>
  <Popup
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

  created () {
    this.fetchGiAllChars()
  },

  methods: {
    fetchGiAllChars () {
      this.$store.dispatch('giAllChars')
    }
  }
}
</script>

<style scoped>

</style>
