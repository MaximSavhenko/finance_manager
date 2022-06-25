<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ localize('CurrenciesRates') }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ localize('Currency') }}</th>
              <th>{{ localize('Rate') }}</th>
              <th>{{ localize('Date') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of rates" :key="cur">
              <td>{{ cur.ccy }}</td>
              <td>{{ cur.buy }}</td>
              <td>{{ dateFilter('datetime') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
export default {
  props: ['rates'],
  data: () => ({
    date: new Date(),
  }),
  mounted() {},
  methods: {
    dateFilter(value, format = 'date') {
      value = this.date
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }

      return new Intl.DateTimeFormat(this.info.locale, options).format(
        new Date(value)
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
  computed: {
    ...mapGetters(['info']),
  },
}
</script>
