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
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['info']),
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
}
</script>
