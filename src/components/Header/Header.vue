<template>
  <div class="header">
    <h1 class="headerTitle">гильдия Сибирский десант</h1>
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

  methods: {
    updateInfo () {
      console.log('йцу')
      this.$store.dispatch('updateInfo')
    }
  }
}
</script>
