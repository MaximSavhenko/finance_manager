<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('RecordHistory') }}</h3>
    </div>

    <div class="history-chart">
      <Pie />
    </div>

    <LoaderVue v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ localize('NoEntriesYet') }}
      <router-link to="/record">{{ localize('AddFirst') }}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="this.localize('Back')"
        :next-text="this.localize('Next')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/App/HistoryTable.vue'
import Paginate from 'vuejs-paginate-next'
import paginationMixin from '@/mixins/pagination.mixin.js'
import Pie from '@/components/App/Pie.vue'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: 'History' })
  },
  components: {
    paginate: Paginate,
    HistoryTable,
    Pie,
  },
  name: 'history-page',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Income' : 'Outcome',
          }
        })
      )
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

<style lang="scss">
.history-chart {
  &.no-category {
    display: none;
  }
}
</style>
