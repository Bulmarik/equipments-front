<template>
<div class="page" style="font-size: 40px; color: white">
  <Header/>
  <Body/>
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
    this.statusCheck()
  },

  computed: {
    loading () {
      return this.$store.state.sw.preloaderVisibility
    }
  },

  methods: {
    statusCheck () {
      this.interval = setInterval(() => {
        if (this.$store.state.sw.preloaderVisibility) {
          this.$store.dispatch('statusUpdateInfo')
          console.log('Проверка')
        } else {
          clearInterval(this.interval)
          console.log('Остановка')
        }
      }, 10000)
    }
  }
}
</script>
