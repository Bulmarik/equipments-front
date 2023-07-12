<template>
<ul class="reportList">
  <li class="reportItem" v-for="item in chars" :key="item.id">
    <h3 class="reportItemName">{{ item.name }}</h3>
    <ul class="reportItemInfo">
      <li v-for="member in guildmember" :key="member.id">
        <div v-for="char in member.chars" :key="char.id">
          <div class="infoElement" v-if="char.id === item.id">
            <p class="infoRelic">{{ char.relict }}р</p>
            <p class="infoName">| {{ member.name }}</p>
          </div>
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
    guildmember:
      {
        type: Array
      },
    chars:
      {
        type: Array
      }
  },
  // data () {
  //   return {
  //     selectChars: []
  //   }
  // },
  mounted () {
    // console.log(this.guildmember)
  },
  methods: {
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
