<template>
<ul class="reportList">
  <li class="reportItem" v-for="item in searchByChar" :key="item.id">
    <h3 class="reportItemName">{{ item.name }}</h3>
    <ul class="reportItemInfo">
      <li v-for="element in item.members" :key="element.id">
        <div class="infoElement">
          <p class="infoRelic">{{ element.pivot.rel }}р</p>
          <p class="infoName">| {{ element.name }}</p>
        </div>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ReportChar',

  props:
  {
    units:
      {
        type: Array
      }
    // guildmember:
    //   {
    //     type: Array
    //   }
  },

  computed: {
    guildmembers () {
      return this.$store.state.sw.resultSearch
    },
    // chars () {
    //   return this.$store.state.sw.searchByChar
    // },
    searchByChar () {
      return this.$store.state.sw.searchByChar
    }
  },
  mounted () {
    // this.$store.dispatch('searchByChar')
  },

  // computed: {
  //   searchByChar () {
  //     return this.$store.state.sw.searchByChar
  //   }
  // giInfo () {
  //   return this.$store.state.sw.giInfo
  // },
  // giAllChars () {
  //   return this.$store.state.sw.giAllChars
  // }
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
