<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content
        ? `${localize(content)} | financial book`
        : localize('HomeBookkeeping')
    }}</template>
  </metainfo>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayouts from '@/layaouts/EmptyLayouts.vue'
import MainLayouts from '@/layaouts/MainLayouts.vue'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['info']),
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layouts'
    },
  },
  methods: {
    localize(key) {
      const locales = {
        'ru-RU': ru,
        'en-US': en,
      }
      const locale = this.info.locale || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found`
    },
  },
  components: { EmptyLayouts, MainLayouts },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
