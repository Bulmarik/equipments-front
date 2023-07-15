<template>
<ul class="reportList">лист-5
  <!-- {{ units }} -->
  <!-- {{ giAllChars }} -->
  <div v-for="member in guildmember" :key="member.id">
    <div v-for="char in member.chars" :key="char.id">
      <div v-for="unit in units" :key="unit.id">
        <div v-if="char.id === unit.id">
          <p class="infoRelic">{{ char.relict }}р</p>
          <p class="infoName">| {{ member.name }}</p>
        </div>
      </div>
    </div>
  </div>

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

<!-- <li class="reportItem" v-for="member in guildmember" :key="member.id">
  <h3 class="reportItemName">{{ member.name }}</h3>
  <ul class="reportItemInfo">
    <li class="infoElement" v-for="char in member.chars" :key="char.id">
      <p class="infoRelic">{{ char.relict }}р</p>
      <p class="infoName">| {{ char.name }}</p>
    </li>
  </ul>
</li> -->
