<template>
<ul class="reportList">
  <!-- {{ guildmember }} -->
  <!-- {{ units }} -->
  <li class="reportItem" v-for="unit in units" :key="unit.external_id">
    <h3 class="reportItemName">{{ unit.name }}</h3>
    <ul class="reportItemInfo">
      <li v-for="member in guildmember" :key="member.id">
        <div v-for="char in member.chars" :key="char.id">
          <div class="infoElement" v-if="char.id === unit.external_id">
            <p class="infoRelic">{{ char.relict }}р</p>
            <p class="infoName">| {{ member.name }}</p>
            <!-- {{ addName }} -->
          </div>
        </div>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ReportByUnit',

  props:
  {
    units:
      {
        type: Array
      },
    guildmember:
      {
        type: Array
      }
  },

  mounted () {
    // console.log(this.guildmember)
  },

  // computed: {
  //   giInfo () {
  //     return this.$store.state.sw.giInfo
  //   },
  //   giAllChars () {
  //     return this.$store.state.sw.giAllChars
  //   }
  // },

  methods: {
    // addName () {
    //   return {
    //     this.unit.name
    //   }
    // }
    // qwert () {
    //   console.log('qwe')
    // }
    // select (item) {
    //   console.log(item)
    // }
    // addClass (value) {
    //   if (value > 1) {
    //     return 'red'
    //   } else {
    //     return 'green'
    //   }
    // }
  }
}
</script>
