<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ localize('HomeBookkeeping') }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          >{{ printErrorEmail(error.$validator, error.$params) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: v$.password.$error }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          >{{ printErrorPassword(error.$validator, error.$params) }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: 'HomeBookkeeping' })
    return { v$: useVuelidate() }
  },
  name: 'login-page',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { required, minLength: minLength(3), email },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    async submitHandler() {
      this.v$.$touch()
      if (this.v$.$error) return
      const formDate = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formDate)
        this.$router.push('/')
      } catch (error) {
        console.log('no login')
      }
    },
    printErrorEmail($name, $param) {
      if ($name === 'required') {
        return 'Поле не должно быть пустым'
      } else if ($name === 'minLength') {
        return 'Минимальная длина должна быть ' + $param.min + ' символa'
      } else if ($name === 'email') {
        return 'Введите корректный Email'
      }
    },
    printErrorPassword($name, $param) {
      if ($name === 'required') {
        return 'Введите пароль'
      } else if ($name === 'minLength') {
        return (
          'Пароль должен быть длинной ' +
          $param.min +
          ' символов.' +
          'Сейчас он ' +
          this.password.length
        )
      }
    },
    localize(key) {
      const locales = {
        'ru-RU': ru,
        'en-US': en,
      }
      const locale = this.info.locale || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found`
    },
  },
}
</script>
