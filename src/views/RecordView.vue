<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('NewRecord') }}</h3>
    </div>

    <LoaderVue v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ localize('NoCategory') }}
      <router-link to="/categories">{{ localize('AddNewCat') }}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="opt of categories" :key="opt.id" :value="opt.id">
            {{ opt.title }}
          </option>
        </select>
        <label>{{ localize('SelectCategory') }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ localize('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ localize('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">{{ localize('Amount') }}</label>
        <span
          class="helper-text invalid"
          v-for="(error, index) of v$.amount.$errors"
          :key="index"
          >{{ printErrorAmount(error.$validator, error.$params) }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">{{ localize('Description') }}</label>
        <span
          class="helper-text invalid"
          v-for="(error, index) of v$.description.$errors"
          :key="index"
          >{{ printErrorDescription(error.$validator, error.$params) }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localize('Create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: 'NewRecord' })
    return { v$: useVuelidate() }
  },
  name: 'record-page',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    window.M.updateTextFields()
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      window.M.updateTextFields()
      this.select = window.M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    },
  },
  methods: {
    async submitHandler() {
      this.v$.$touch()
      if (this.v$.$error) return
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          })
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message(this.localize('EntryCreatedSuccessfully'))
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message(
          this.localize('InsufficientFunds') +
            ' ' +
            (this.amount - this.info.bill)
        )
      }
    },
    printErrorDescription($name) {
      if ($name === 'required') {
        return this.localize('EnterADescription')
      }
    },
    printErrorAmount($name, $param) {
      if ($name === 'minValue') {
        return this.localize('MinimumValue') + $param.min
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
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>
