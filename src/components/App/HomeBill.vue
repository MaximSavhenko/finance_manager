<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

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
export default {
  props: ['rates'],
  data: () => ({}),
  computed: {
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
  },
}
</script>
