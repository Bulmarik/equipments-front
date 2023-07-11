<template>
<div class="page" @click="filter" style="font-size: 40px; color: white">
  <Header/>
  <Body/>
  <Footer/>
</div>
</template>
<script>

import './Main.css'
import Header from '../components/Header/Header.vue'
import Body from '../components/Body/Body.vue'
import Footer from '../components/Footer/Footer.vue'

export default {
  name: 'Main',
  components: {
    Header,
    Body,
    Footer
  },
  data () {
  //   return {
  //     chars: [
  //       {
  //         id: 1,
  //         name: 'Лорд Вейдер'
  //       },
  //       {
  //         id: 2,
  //         name: 'Мастер джедай Кеноби'
  //       },
  //       {
  //         id: 3,
  //         name: 'Император вечных ситхов'
  //       },
  //       {
  //         id: 4,
  //         name: 'Верховный лидер Кайло Рен'
  //       },
  //       {
  //         id: 5,
  //         name: 'Джабба Хатт'
  //       },
  //       {
  //         id: 6,
  //         name: 'Генерал Скайуокер'
  //       },
  //       {
  //         id: 7,
  //         name: 'Генерал Гривус'
  //       },
  //       {
  //         id: 8,
  //         name: 'Командир Асока Тано'
  //       },
  //       {
  //         id: 9,
  //         name: 'R2D2'
  //       },
  //       {
  //         id: 10,
  //         name: 'Старый контрабандист Хан'
  //       },
  //       {
  //         id: 11,
  //         name: 'Чубакка'
  //       }
  //     ],
  //     guildmember: [
  //       {
  //         id: 1,
  //         name: 'Марат',
  //         // relict: 25,
  //         chars: [
  //           {
  //             id: 1,
  //             name: 'Лорд Вейдер',
  //             relict: 25
  //           },
  //           {
  //             id: 9,
  //             name: 'R2D2',
  //             relict: 6
  //           },
  //           {
  //             id: 2,
  //             name: 'Мастер джедай Кеноби',
  //             relict: 7
  //           },
  //           {
  //             id: 3,
  //             name: 'Император вечных ситхов',
  //             relict: 6
  //           },
  //           {
  //             id: 6,
  //             name: 'Генерал Скайуокер',
  //             relict: 0
  //           },
  //           {
  //             id: 7,
  //             name: 'Генерал Гривус',
  //             relict: 7
  //           },
  //           {
  //             id: 4,
  //             name: 'Верховный лидер Кайло Рен',
  //             relict: 4
  //           }
  //         ]
  //       },
  //       {
  //         id: 2,
  //         name: 'Петя',
  //         // relict: 15,
  //         chars: [
  //           {
  //             id: 6,
  //             name: 'Генерал Скайуокер',
  //             relict: 0
  //           },
  //           {
  //             id: 8,
  //             name: 'Командир Асока Тано',
  //             relict: 0
  //           },
  //           {
  //             id: 7,
  //             name: 'Генерал Гривус',
  //             relict: 7
  //           },
  //           {
  //             id: 9,
  //             name: 'R2D2',
  //             relict: 1
  //           },
  //           {
  //             id: 11,
  //             name: 'Чубакка',
  //             relict: 3
  //           }
  //         ]
  //       },
  //       {
  //         id: 3,
  //         name: 'Руслан',
  //         // relict: 5,
  //         chars: [
  //           {
  //             id: 5,
  //             name: 'Джабба Хатт',
  //             relict: 7
  //           },
  //           {
  //             id: 4,
  //             name: 'Верховный лидер Кайло Рен',
  //             relict: 5
  //           },
  //           {
  //             id: 9,
  //             name: 'R2D2',
  //             relict: 4
  //           },
  //           {
  //             id: 10,
  //             name: 'Старый контрабандист Хан',
  //             relict: 3
  //           },
  //           {
  //             id: 8,
  //             name: 'Командир Асока Тано',
  //             relict: 5
  //           },
  //           {
  //             id: 11,
  //             name: 'Чубакка',
  //             relict: 6
  //           }
  //         ]
  //       }
  //     ]
  //   }
  },
  created () {
    this.fetchGiInfo()
  },
  mounted () {
    this.filter()
  },

  methods: {
    fetchGiInfo () {
      this.$store.dispatch('giInfo')
    },
    filter () {
    }
  }
}
</script>

<style scoped>

</style>
