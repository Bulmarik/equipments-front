<template>
  <div>
    <section class="vh-100">
      <div class="container-fluid h-custom" >
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img style="width: 500px" alt="Sample image"
                class="img-fluid"
                :src="logo">
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="auth">

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input id="em" v-model="email" class="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      type="email"/>
                <label class=" float-start form-label text-black" for="em">Email address</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <input id="pass" v-model="password" class="form-control form-control-lg" placeholder="Enter password"
                      type="password"/>
                <label class="float-start form-label text-black" for="pass">Password</label>
              </div>

              <!--              <div class="d-flex justify-content-between align-items-center">-->
              <!--                &lt;!&ndash; Checkbox &ndash;&gt;-->
              <!--                <div class="form-check mb-0">-->
              <!--                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />-->
              <!--                  <label class="form-check-label" for="form2Example3">-->
              <!--                    Remember me-->
              <!--                  </label>-->
              <!--                </div>-->
              <!--                <a href="#!" class="text-body">Forgot password?</a>-->
              <!--              </div>-->

              <div class="text-center text-lg-start mt-4 pt-2">
                <button class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;"
                        type="submit">Войти
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Нет аккаунта? <span class="link-danger"
                                                                            @click="$bvModal.show('modal')">Регистрация</span>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
      <b-button id="show-btn" @click="$bvModal.show('modal')">Open Modal</b-button>

      <b-modal ref="my-modal" id="modal" hide-footer>
        <template #modal-title>
          Регистрация
        </template>
        <div class="form-outline mb-4">
          <label class=" float-start form-label text-black" for="em">Имя</label>
          <input v-model="regname" class="form-control form-control-lg" placeholder="Enter a valid email address"
                 type="email"/>
        </div>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class=" float-start form-label text-black" for="em">Email address</label>
          <input v-model="regemail" class="form-control form-control-lg" placeholder="Enter a valid email address"
                 type="email"/>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-3">
          <label class="float-start form-label text-black" for="pass">Password</label>
          <input v-model="regpassword" class="form-control form-control-lg" placeholder="Enter password"
                 type="password"/>
        </div>
        <b-button block class="mt-3 float-end bg-primary" @click="reg">Зарегистрировать</b-button>
        <b-button block class="mt-3" @click="$bvModal.hide('modal')">Отмена</b-button>
      </b-modal>
    </section>
  </div>
</template>

<script>

import {mapActions} from 'vuex'
import {apiClient} from '../services/api'
import logo from '../assets/Auth/Logo.jpg'

export default {
  name: 'Auth',
  data () {
    return {
      regname: null,
      regpassword: null,
      regemail: null,
      password: '',
      email: '',
      logo: logo
    }
  },
  methods: {
    ...mapActions(
      [
        'login'
      ]),
    async auth () {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('main')
      })
    },
    reg () {
      apiClient.post('/reg', {
        name: this.regname,
        password: this.regpassword,
        email: this.regemail
      }).then(() => {
        this.$refs['my-modal'].hide()
        alert('Регистрация успешна')
      }).catch(function (error) {
        if (error.response) {
          if (error.response.data.name) {
            alert(error.response.data.name[0])
          }
          if (error.response.data.password) {
            alert(error.response.data.password[0])
          }
          if (error.response.data.email) {
            alert(error.response.data.email[0])
          }
        }
      })
    }
  }
}
</script>

<style scoped>

.h-custom {
  height: calc(100% - 73px);
}

@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
