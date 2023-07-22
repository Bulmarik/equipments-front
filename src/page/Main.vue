<template>
<div class="page" @click="filter" style="font-size: 40px; color: white">
  <Header/>
  <!-- {{ units }} -->
  <Body
  :units="units"
  :guildmember="guildmember"
  @openPopup="openPopup"
  />
  <Footer/>
  <Popup
  @chois="selectChar"
  :popupState="popupState"
  @closePopup="closePopup"
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
      guildmember: [
        {
          id: 1,
          name: 'Марат',
          chars: [
            {
              id: 'TRIPLEZERO',
              name: '0-0-0',
              relict: 25
            },
            {
              id: 'AMILYNHOLDO',
              name: 'Эмилин холдо',
              relict: 6
            },
            {
              id: 'ARCTROOPER501ST',
              name: 'ЭРК-штурмовик',
              relict: 7
            },
            {
              id: 'BB8',
              name: 'BB8',
              relict: 0
            },
            {
              id: 'BOSSK',
              name: 'Босск',
              relict: 7
            },
            {
              id: 'DARTHSIDIOUS',
              name: 'Дарт Сидиус',
              relict: 4
            }
          ]
        },
        {
          id: 2,
          name: 'Петя',
          chars: [
            {
              id: 'TRIPLEZERO',
              name: '0-0-0',
              relict: 6
            },
            {
              id: 'AMILYNHOLDO',
              name: 'Эмилин холдо',
              relict: 5
            },
            {
              id: 'ARCTROOPER501ST',
              name: 'ЭРК-штурмовик',
              relict: 4
            },
            {
              id: 'BAZEMALBUS',
              name: 'Бэйз Мальбус',
              relict: 3
            }
          ]
        },
        {
          id: 3,
          name: 'Руслан',
          chars: [
            {
              id: 'BAZEMALBUS',
              name: 'Бэйз Мальбус',
              relict: 4
            },
            {
              id: 'BB8',
              name: 'BB8',
              relict: 3
            },
            {
              id: 'BOSSK',
              name: 'Босск',
              relict: 2
            },
            {
              id: 'DARTHSIDIOUS',
              name: 'Дарт Сидиус',
              relict: 1
            }
          ]
        }
      ],
      units: [],
      popupState: 'invisible'
    }
  },
  created () {
    // this.fetchGiInfo()
    this.fetchGiAllChars()
  },
  mounted () {
    this.filter()
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
