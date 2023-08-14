<template>
<div class="page" style="font-size: 40px; color: white">
  <Header/>
  <Body/>
  <Footer/>
</div>
</template>
<script>

import './Main.css'
import Header from '../components/Header/Header.vue'
import Body from '../components/Body/Body.vue'
import Footer from '../components/Footer/Footer.vue'

export default {
  name: 'Main',

  components: {
    Header,
    Body,
    Footer
  },

  created () {
    this.fetchGetAllChars()
  },

  methods: {
    fetchGetAllChars () {
      this.$store.dispatch('getAllChars')
    }
  }
}
</script>

<style scoped>

</style>
