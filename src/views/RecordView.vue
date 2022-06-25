<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <LoaderVue v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="opt of categories" :key="opt.id" :value="opt.id">
            {{ opt.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
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
          <span>Доход</span>
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
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">Сумма</label>
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
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-for="(error, index) of v$.description.$errors"
          :key="index"
          >{{ printErrorDescription(error.$validator, error.$params) }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
export default {
  setup() {
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
          this.$message('Запись успешно создана')
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        )
      }
    },
    printErrorDescription($name) {
      if ($name === 'required') {
        return 'Введите описание'
      }
    },
    printErrorAmount($name, $param) {
      if ($name === 'minValue') {
        return 'Минимальная величина ' + $param.min
      }
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>
