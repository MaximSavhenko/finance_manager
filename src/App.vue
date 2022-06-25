<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayouts from '@/layaouts/EmptyLayouts.vue'
import MainLayouts from '@/layaouts/MainLayouts.vue'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layouts'
    },
  },
  components: { EmptyLayouts, MainLayouts },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
