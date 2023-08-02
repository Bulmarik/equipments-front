<template>
<ul class="reportList">
  <!-- {{ guildmembers }}
  {{ chars }} -->
  <!-- {{ searchByChar }} -->
  <!-- {{ units }} -->
<!--  <li class="reportItem" v-for="unit in units" :key="unit.external_id">-->
<!--    <h3 class="reportItemName">{{ unit.name }}</h3>-->
<!--    <ul class="reportItemInfo">-->
<!--      <li v-for="member in guildmembers" :key="member.id">-->
<!--        <div v-for="char in member.chars" :key="char.id">-->
<!--          <div class="infoElement" v-if="char.id === unit.external_id">-->
<!--            <p class="infoRelic">{{ char.relict }}р</p>-->
<!--            <p class="infoName">| {{ member.name }}</p>-->
<!--            &lt;!&ndash; {{ addName }} &ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </li>-->

  <li class="reportItem" v-for="item in searchByChar" :key="item.id">
    <h3 class="reportItemName">{{ item.name }}</h3>
    <ul class="reportItemInfo">
      <!-- <li v-for="member in unit.member" :key="member.id"> -->
      <!-- {{ member.name }} -->
      <div v-for="element in item.members" :key="element.id">
        <!-- <div class="infoElement" v-if="char.id === unit.external_id"> -->
        <div class="infoElement">
          <p class="infoRelic">{{ element.pivot.rel }}р</p>
          <p class="infoName">| {{ element.name }}</p>

        </div>
      </div>
      <!-- </li> -->
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
