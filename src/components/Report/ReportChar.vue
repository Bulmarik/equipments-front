<template>
<div class="reportList">
  <div class="reportItems" v-for="item in chars" :key="item.id">
    <div class="reportItem">
      <h3 class="char">{{ item.name }}</h3>
      <div class="guildmembers">
        <div class="guildmemberName" v-for="member in guildmember" :key="member.id">
          <div class="guildmemberName" v-for="char in member.chars" :key="char.id">
            <div class="guildmemberChars" v-if="char.id === item.id">
              <p class="guildmemberCharRelict">{{ char.relict }}р</p>
              <p class="guildmemberCharName">| {{ member.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
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
    console.log(this.guildmember)
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
