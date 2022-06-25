<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ localize('BillInCurrencies') }}</span>

        <p class="currency-line">
          <span>{{ baseFormat }}</span>
        </p>
        <p class="currency-line" v-for="cur of rates" :key="cur">
          <span>{{ getCurrency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
export default {
  props: ['rates'],
  data: () => ({}),
  computed: {
    ...mapGetters(['info']),
    baseFormat() {
      const bill = this.$store.getters.info.bill
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UAH',
      }).format(bill)
    },
    base() {
      return this.$store.getters.info.bill
    },
  },
  methods: {
    getCurrency(value) {
      const currency = this.base / value.buy
      const currencyFloor = Math.floor(currency)
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: value.ccy,
      }).format(currencyFloor)
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
