<template>
  <div>
    <LoaderVue v-if="loading" />
    <div class="app-main-layout" v-else>
      <NavBar @open:navBar="isOpen = !isOpen" />
      <SideBar v-model="isOpen" :isOpen="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/App/NavBar.vue'
import SideBar from '@/components/App/SideBar.vue'
import messages from '@/utils/messages'
export default {
  name: 'main-layouts',
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    error(fdError) {
      console.log(fdError)
      this.$error(messages[fdError.code] || 'Что-то пошло не так')
    },
  },
  components: { NavBar, SideBar },
}
</script>
