<template>
  <div class="preloader">
    <div class="preloader_overlay"></div>
    <div class="preloader_container">
      <img class="preloader_icon" src="../../images/Galactic_Empire-logo.png" alt="">
    </div>
    <div class="preloader_container">
      <img class="preloader_text" src="../../images/Star-Wars-Logo.svg" alt="">
    </div>
    <h1 class="preloader_title">Данные обновляются. Это может занять несколько минут</h1>
  </div>
</template>

<script>
// export default {
// name: 'Preloader',

//   created () {
//     this.statusCheck()
//   },

//   methods: {
//     statusCheck () {
//       this.$store.dispatch('statusUpdateInfo')
//         .then(response => {
//           console.log(response.data.status)
//           if (response.data.status !== 'finish') {
//             // console.log('Включаем прелоадер')
//             document.querySelector('.preloader').classList.add('visible')
//             setTimeout(() => {
//               // console.log('Проверка')
//               this.statusCheck()
//             }, 5000)
//           } else {
//             document.querySelector('.preloader').classList.remove('visible')
//             // console.log('Выключаем прелоадер')
//           }
//         })
//     }
//   }
// }
</script>
