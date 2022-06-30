<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      :to="link.url"
      custom
      v-slot="{ navigate, isActive, isExactActive }"
      v-for="link in links"
      :key="link.url"
    >
      <li
        :class="[
          isActive && 'active',
          isExactActive && 'router-link-exact-active',
        ]"
      >
        <a href="/" @click="navigate">{{ localize(link.title) }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeMixin from '@/mixins/localize.mixin'
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      { title: 'Check', url: '/' },
      { title: 'History', url: '/history' },
      { title: 'Planning', url: '/planning' },
      { title: 'NewRecord', url: '/record' },
      { title: 'Categories', url: '/categories' },
    ],
  }),
  mixins: [localizeMixin],
  computed: {
    ...mapGetters(['info']),
  },
}
</script>
