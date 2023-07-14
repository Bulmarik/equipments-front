<template>
<ul class="reportList">лист1
  <!-- {{ guildmember }} -->
  <li class="reportItem" v-for="member in guildmember" :key="member.id">
    <h3 class="reportItemName">{{ member.name }}</h3>
    <ul class="reportItemInfo">
      <li class="infoElement" v-for="char in member.chars" :key="char.id">
        <p class="infoRelic">{{ char.relict }}р</p>
        <p class="infoName">| {{ char.name }}</p>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ReportByUser',

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

  methods: {
  }
}
</script>
