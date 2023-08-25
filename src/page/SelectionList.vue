<template>
  <div class="selectionList">
    <div class="selectionListButtons">
      <router-link :to="{ name: 'CharList' }">
        <button class="selectionListBtn selectionListBtnCancel">Отмена</button>
      </router-link>
      <router-link :to="{ name: 'CharList' }">
        <button class="selectionListBtn selectionListBtnOk" @click="setSelectSelection">Ок</button>
      </router-link>
    </div>
    <div class="selectionListContent">
      <h2 class="selectionListTitle">Подборки</h2>
      <ul class="selections">
        <li class="selection" v-for="selection in GET_SELECTIONS" :id="'selection_' + selection.id" @click="isChecked (selection)" :key="selection.id">
          <span class="selectionName">{{selection.name}}</span>
          <div class="selectionItems">
            <div v-for="item in selection.chars" :key="item.id">
              <img class="selectionItemImage" :src="item.image" alt="иконка юнита">
            </div>
            <img class="selectionItemDeleteImage" src="../images/216658.png" alt="иконка удалить" @click="deleteSelectoin(selection.id)">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SelectionList',

  data () {
    return {
      checkedSelections: []
    }
  },

  mounted () {
    this.$store.dispatch('selections')
  },

  computed: {
    ...mapGetters([
      'GET_SELECTIONS'
    ])
  },

  methods: {
    isChecked (selection) {
      document.getElementById('selection_' + selection.id).classList.toggle('checkedSelection')
      const index = this.checkedSelections.findIndex((c) => c === selection.id)
      if (index !== -1) {
        this.checkedSelections.splice(index, 1)
      } else {
        this.checkedSelections.push(selection.id)
      }
    },
    setSelectSelection () {
      this.$store.commit('SET_SELECTED_SELECTION', this.checkedSelections)
    },
    deleteSelectoin (selection) {
      this.$store.dispatch('deleteSelection', selection)
        .then(response => {
          this.$store.dispatch('selections')
        })
    }
  }
}
</script>
