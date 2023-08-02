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
          <input type="radio" @input="search('member')" name="searchByMember" value="member" v-model="stateSearch">
          <label>по игрокам</label>
        </div>
        <div class="reportRadiobutton">
          <!-- <input type="radio" value="char" v-model="char"> -->
          <input type="radio" @input="search('char')" name="searchByChar" value="char" v-model="stateSearch">
          <label>по персонажам</label>
        </div>
      </div>
      <h2 class="title reportTitle">Отчет</h2>
      <div class="reportRadiobuttons">
        <button @click.prevent="search" class="btn bg-secondary">Искать</button>
        <button style="margin-left: 10px" @click.prevent="reset" class="btn bg-danger">Сброс</button>
      </div>
    </div>
    <ReportMember class="reportMember"
    />
    <ReportChar class="reportChar"
    :units="units"
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

  data () {
    return {
      stateSearch: null
    }
  },

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
    search (e) {
      if (e === 'member') {
        this.$store.dispatch('search')
      }
      if (e === 'char') {
        this.$store.dispatch('searchByChar')
      }
      // console.log(e)
    },
    reset () {
      this.$store.commit('SET_RESULT_SEARCH', [])
    },
    openPopup (state) {
      this.$emit('openPopup', state)
    }
  }
}
</script>

<style scoped>

</style>
