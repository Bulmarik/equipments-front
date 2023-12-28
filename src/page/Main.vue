<template>
<div class="page" style="font-size: 40px; color: white">
  <div>
    <Header/>
    <Body/>
  </div>
  <Footer/>
  <Preloader v-show="loading"/>
</div>
</template>
<script>

import './Main.css'
import Header from '../components/Header/Header.vue'
import Body from '../components/Body/Body.vue'
import Footer from '../components/Footer/Footer.vue'
import Preloader from '../components/Preloader/Preloader.vue'

export default {
  name: 'Main',

  components: {
    Header,
    Body,
    Footer,
    Preloader
  },

  created () {
    this.$store.dispatch('statusUpdateInfo')
  },

  computed: {
    loading () {
      return this.$store.state.sw.preloaderVisibility
    }
  }
}
</script>
