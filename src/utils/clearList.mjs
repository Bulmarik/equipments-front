function clearList () {
  const checkedChar = document.querySelectorAll('.checked')
  checkedChar.forEach(el => el.classList.remove('checked'))
  this.$store.commit('SET_SELECTED_UNITS', 'clear')
  this.$store.commit('SET_SEARCH_UNIT', 'clear')
  this.$store.commit('SET_SEARCH_RESULT', '[]')
}

export default clearList
