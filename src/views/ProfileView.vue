<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: v$.name.$error }"
        />
        <label for="description">{{ localize('NameTitle') }}</label>
        <span
          class="helper-text invalid"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
          >{{ printErrorName(error.$validator, error.$params) }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localize('UpdateForm') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { useMeta } from 'vue-meta'

export default {
  name: 'profile-page',
  setup() {
    useMeta({ title: 'ProfileTitle' })
    return { v$: useVuelidate() }
  },
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name

    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      window.M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      this.v$.$touch()
      if (this.v$.$error) return
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        })
      } catch (error) {
        console.log('no login')
      }
    },
    printErrorName($name) {
      if ($name === 'required') {
        return this.localize('ValidateName')
      }
    },
    localize(key) {
      console.log(this.info.locale)
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

<style lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>
