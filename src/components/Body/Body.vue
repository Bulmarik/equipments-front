<template>
<div class="body">
  <!-- {{giInfo}} -->
  <Search
  :chars="chars"
  />
  <div class="report">
    <div class="reportHeader">
      <div class="reportRadiobuttons">
        <div class="reportRadiobutton">
          <input type="radio" value="user" v-model="user">
          <label>по игрокам</label>
        </div>
        <div class="reportRadiobutton">
          <input type="radio" value="char" v-model="char">
          <label>по персонажам</label>
        </div>
      </div>
      <h2 class="title reportTitle">Отчет</h2>
      <button class="reportButton">Искать</button>
    </div>
    <ReportMember class="reportMember"
    :guildmember="guildmember"
    />
    <ReportChar class="reportChar"
    :chars="chars"
    :guildmember="guildmember"
    />
  </div>
</div>
</template>

<script>
import Search from '../Search/Search.vue'
import ReportMember from '../Report/ReportMember.vue'
import ReportChar from '../Report/ReportChar.vue'

export default {
  name: 'Body',
  components: {
    Search,
    ReportMember,
    ReportChar
  },
  data () {
    return {
      chars: [
        {
          id: 1,
          name: 'Лорд Вейдер'
        },
        {
          id: 2,
          name: 'Мастер джедай Кеноби'
        },
        {
          id: 3,
          name: 'Император вечных ситхов'
        },
        {
          id: 4,
          name: 'Верховный лидер Кайло Рен'
        },
        {
          id: 5,
          name: 'Джабба Хатт'
        },
        {
          id: 6,
          name: 'Генерал Скайуокер'
        },
        {
          id: 7,
          name: 'Генерал Гривус'
        },
        {
          id: 8,
          name: 'Командир Асока Тано'
        },
        {
          id: 9,
          name: 'R2D2'
        },
        {
          id: 10,
          name: 'Старый контрабандист Хан'
        },
        {
          id: 11,
          name: 'Чубакка'
        }
      ],
      guildmember: [
        {
          id: 1,
          name: 'Марат',
          // relict: 25,
          chars: [
            {
              id: 1,
              name: 'Лорд Вейдер',
              relict: 25
            },
            {
              id: 9,
              name: 'R2D2',
              relict: 6
            },
            {
              id: 2,
              name: 'Мастер джедай Кеноби',
              relict: 7
            },
            {
              id: 3,
              name: 'Император вечных ситхов',
              relict: 6
            },
            {
              id: 6,
              name: 'Генерал Скайуокер',
              relict: 0
            },
            {
              id: 7,
              name: 'Генерал Гривус',
              relict: 7
            },
            {
              id: 4,
              name: 'Верховный лидер Кайло Рен',
              relict: 4
            }
          ]
        },
        {
          id: 2,
          name: 'Петя',
          // relict: 15,
          chars: [
            {
              id: 6,
              name: 'Генерал Скайуокер',
              relict: 0
            },
            {
              id: 8,
              name: 'Командир Асока Тано',
              relict: 0
            },
            {
              id: 7,
              name: 'Генерал Гривус',
              relict: 7
            },
            {
              id: 9,
              name: 'R2D2',
              relict: 1
            },
            {
              id: 11,
              name: 'Чубакка',
              relict: 3
            }
          ]
        },
        {
          id: 3,
          name: 'Руслан',
          // relict: 5,
          chars: [
            {
              id: 5,
              name: 'Джабба Хатт',
              relict: 7
            },
            {
              id: 4,
              name: 'Верховный лидер Кайло Рен',
              relict: 5
            },
            {
              id: 9,
              name: 'R2D2',
              relict: 4
            },
            {
              id: 10,
              name: 'Старый контрабандист Хан',
              relict: 3
            },
            {
              id: 8,
              name: 'Командир Асока Тано',
              relict: 5
            },
            {
              id: 11,
              name: 'Чубакка',
              relict: 6
            }
          ]
        }
      ]
    }
  },
  created () {

  },
  mounted () {
    // this.filter()
  },
  computed: {
    giInfo () {
      return this.$store.state.sw.giInfo
    }
  },
  methods: {
    // filter () {
    // }
  }
}
</script>

<style scoped>

</style>
