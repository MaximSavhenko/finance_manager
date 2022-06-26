<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Bill') }}</h3>

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
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'

export default {
  setup() {
    useMeta({ title: 'Check' })
  },
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
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
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
