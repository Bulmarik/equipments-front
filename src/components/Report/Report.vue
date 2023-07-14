<template>
  <div class="report">
    лист0
    <div class="reportHeader">
      <!-- {{ units }} -->
      <div class="reportRadiobuttons">
        <div class="reportRadiobutton">
          <!-- <input type="radio" value="us" v-model="us"> -->
          <input type="radio">
          <label>по игрокам</label>
        </div>
        <div class="reportRadiobutton">
          <!-- <input type="radio" value="char" v-model="char"> -->
          <input type="radio">
          <label>по персонажам</label>
        </div>
      </div>
      <h2 class="title reportTitle">Отчет</h2>
      <button class="reportButton">Искать</button>
    </div>
    <ReportByUser class="reportMember"
    :guildmember="guildmember"
    />
    <ReportByUnit class="reportChar"
    :units="units"
    :guildmember="guildmember"
    />
  </div>
</template>

<script>
// import Search from '../Search/Search.vue'
import ReportByUser from '../ReportByUser/ReportByUser.vue'
import ReportByUnit from '../ReportByUnit/ReportByUnit.vue'

export default {
  name: 'Report',

  components: {
    ReportByUser,
    ReportByUnit
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
  }
}
