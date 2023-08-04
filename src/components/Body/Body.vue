<template>
  <div class="body" >
    <Search/>
    <Report/>
  </div>
</template>

<script>
import Search from '../Search/Search.vue'
import Report from '../Report/Report.vue'

export default {
  name: 'Body',

  components: {
    Search,
    Report
  }
}
</script>

<style scoped>

</style>
