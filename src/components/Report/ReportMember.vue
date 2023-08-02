<template>
<ul class="reportList">
<!--  <div v-for="member in guildmember" :key="member.id">-->
<!--    <div v-for="char in member.chars" :key="char.id">-->
<!--      <div v-for="unit in units" :key="unit.id">-->
<!--        <div v-if="char.id === unit.id">-->
<!--          <p class="infoRelic">{{ char.relict }}р</p>-->
<!--          <p class="infoName">| {{ member.name }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="border border-dark mb-1 p-2" v-for="item in guildmembers" :key="item.id">
    <h3 class="text-black">{{item.name}}</h3>
    <div  v-for="element in item.info" :key="element.id">
      <span class="infoRelic">{{ element.pivot.rel }}р</span>
      <span class="infoName">| {{ element.name }}</span>
    </div>
  </div>

</ul>
</template>

<script>
export default {
  name: 'ReportByUser',

  props:
  {
    // guildmember:
    //   {
    //     type: Array
    //   },
    // units:
    //   {
    //     type: Array
    //   }
  },

  computed: {
    guildmembers () {
      return this.$store.state.sw.resultSearch
    }
  },

  methods: {
  }
}
</script>

<!-- <li class="reportItem" v-for="member in guildmember" :key="member.id">
  <h3 class="reportItemName">{{ member.name }}</h3>
  <ul class="reportItemInfo">
    <li class="infoElement" v-for="char in member.chars" :key="char.id">
      <p class="infoRelic">{{ char.relict }}р</p>
      <p class="infoName">| {{ char.name }}</p>
    </li>
  </ul>
</li> -->
