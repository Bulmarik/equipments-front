export default {
  methods: {
    clear () {
      this.$store.commit('SET_SELECTED_UNITS', 'clear')
      this.$store.commit('SET_SEARCH_UNIT', 'clear')
      this.$store.commit('SET_SEARCH_RESULT', [])
    }
  }
}
