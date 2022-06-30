<template>
  <div>
    <LoaderVue v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          localize('History')
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{
            record.type === 'income' ? localize('Outcome') : localize('Income')
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>{{ localize('Description') }}: {{ record.description }}</p>
              <p>{{ localize('Amount') }}: {{ baseFormat(record.amount) }}</p>
              <p>{{ localize('Category') }}: {{ record.categoryName }}</p>
              <small>{{ dateFilter(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{ localize('RecordingFrom') }} id={{ $route.params.id }}
      {{ localize('NotFound') }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeMixin from '@/mixins/localize.mixin'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: 'DetailRecord' })
  },
  name: 'detail-record',
  data: () => ({
    record: null,
    category: [],
    loading: true,
  }),
  mixins: [localizeMixin],
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )
    this.record = {
      ...record,
      categoryName: category.title,
    }

    this.loading = false
  },
  methods: {
    baseFormat(value) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UAH',
      }).format(value)
    },
    dateFilter(value, format = 'date') {
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat(this.info.locale, options).format(
        new Date(value)
      )
    },
  },
  computed: {
    ...mapGetters(['info']),
  },
}
</script>
