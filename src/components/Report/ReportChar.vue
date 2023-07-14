<template>
<ul class="reportList">лист1
  <li class="reportItem" v-for="item in units" :key="item.id">
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
  name: 'ReportByUnit',

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
