<template>
  <div class="header">
    <h1 class="headerTitle">гильдия Сибирский десант</h1>
    <p class="headerText">в последний раз данные обновлялись {{ lastUpdate }}</p>
    <button class="updateButton buttonShadow" @click="updateInfo">
      обновить информацию о гильдии
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  computed: {
    lastUpdate () {
      return this.$store.state.sw.lastUpdateInfo
    }
  },

  methods: {
    updateInfo () {
      this.$store.dispatch('updateInfo')
    }
  }
}
</script>
