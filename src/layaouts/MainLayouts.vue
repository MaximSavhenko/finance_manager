<template>
  <div>
    <div class="app-main-layout">
      <NavBar @open:navBar="isOpen = !isOpen" />
      <SideBar v-model="isOpen" :isOpen="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/App/NavBar.vue";
import SideBar from "@/components/App/SideBar.vue";
export default {
  name: "main-layouts",
  data: () => ({
    isOpen: true,
  }),
  components: { NavBar, SideBar },
};
</script>
