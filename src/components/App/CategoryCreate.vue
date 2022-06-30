<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">{{ localize('Title') }}</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.title.$errors"
            :key="index"
            >{{ printErrorTitle(error.$validator, error.$params) }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">{{ localize('Limit') }}</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.limit.$errors"
            :key="index"
            >{{ printErrorLimit(error.$validator, error.$params) }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ localize('Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import localizeMixin from '@/mixins/localize.mixin'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data: () => ({
    title: '',
    limit: 100,
  }),
  mixins: [localizeMixin],
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    window.M.updateTextFields()
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    async submitHandler() {
      this.v$.$touch()
      if (this.v$.$error) return
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        console.log(category)

        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$message(this.localize('CategoryCreated'))
        this.$emit('created', category)
      } catch (e) {
        console.log(e)
      }
    },
    printErrorTitle($name) {
      if ($name === 'required') {
        return this.localize('EnterCategoryName')
      }
    },
    printErrorLimit($name, $param) {
      if ($name === 'minValue') {
        return this.localize('MinimumValue') + $param.min
      }
    },
  },
}
</script>
