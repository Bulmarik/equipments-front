<template>
<div class="body" >
  <!-- {{giAllChars}} -->
  <Search
  :units="units"
  @openPopup="openPopup"
  />
  <div class="report">
    <div class="reportHeader">
      <div class="reportRadiobuttons">
        <div class="reportRadiobutton">
          <!-- <input type="radio" value="us" v-model="us"> -->
          <input type="radio">
          <label>по игрокам</label>
        </div>
        <div class="reportRadiobutton">
          <!-- <input type="radio" value="char" v-model="char"> -->
          <input type="radio">
          <label>по персонажам</label>
        </div>
      </div>
      <h2 class="title reportTitle">Отчет</h2>
      <button class="reportButton">Искать</button>
    </div>
    <ReportMember class="reportMember"
    :units="units"
    :guildmember="guildmember"
    />
    <ReportChar class="reportChar"
    :units="units"
    :guildmember="guildmember"
    />
  </div>
</div>
</template>

<script>
import Search from '../Search/Search.vue'
import ReportMember from '../Report/ReportMember.vue'
import ReportChar from '../Report/ReportChar.vue'

export default {
  name: 'Body',

  components: {
    Search,
    ReportMember,
    ReportChar
  },

  props:
  {
    guildmember:
      {
        type: Array
      },
    units:
      {
        type: Array
      }
  },

  created () {
  },

  mounted () {
    // this.filter()
  },
  // почему компьютед находится в Боди?
  computed: {
    giInfo () {
      return this.$store.state.sw.giInfo
    },
    giAllChars () {
      return this.$store.state.sw.giAllChars
    }
  },

  methods: {
    openPopup (state) {
      this.$emit('openPopup', state)
    }
  }
}
</script>

<style scoped>

</style>
