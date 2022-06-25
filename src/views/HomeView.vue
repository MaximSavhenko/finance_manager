<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <LoaderVue v-if="loading" />

    <div class="row" v-else>
      <HomeBill :rates="this.currency" />
      <HomeCurrency :rates="this.currency" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/App/HomeBill.vue'
import HomeCurrency from '@/components/App/HomeCurrency.vue'

export default {
  components: { HomeBill, HomeCurrency },
  name: 'HomeView',
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
}
</script>
