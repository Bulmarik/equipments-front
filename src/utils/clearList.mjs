export default {
  methods: {
    clearList123 () {
      console.log('Жопа')
      this.$store.commit('SET_SELECTED_UNITS', 'clear')
      this.$store.commit('SET_SEARCH_UNIT', 'clear')
      this.$store.commit('SET_SEARCH_RESULT', [])
    }
  }
}
