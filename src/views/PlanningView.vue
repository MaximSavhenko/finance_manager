<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Planning') }}</h3>
      <h4>{{ baseFormat }}</h4>
    </div>
    <LoaderVue v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{ localize('NoCategory') }}
      <router-link to="/categories">{{ localize('AddCat') }}</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ baseFormatDashboard(cat.spend) }} {{ localize('Of') }}
          {{ baseFormatDashboard(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: 'Planning' })
  },
  name: 'planning-page',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
    baseFormat() {
      const bill = this.$store.getters.info.bill
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UAH',
      }).format(bill)
    },
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? this.localize('ExcessOn') : this.localize('Left')
      } ${this.baseFormatDashboard(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      }
    })

    this.loading = false
  },
  methods: {
    baseFormatDashboard(value) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UAH',
      }).format(value)
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
