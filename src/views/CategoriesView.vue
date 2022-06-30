<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Categories') }}</h3>
    </div>
    <section>
      <LoaderVue v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">{{ localize('NoCategoriesYet') }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/App/CategoryCreate.vue'
import CategoryEdit from '@/components/App/CategoryEdit.vue'
import { mapGetters } from 'vuex'
import { useMeta } from 'vue-meta'
import localizeMixin from '@/mixins/localize.mixin'

export default {
  setup() {
    useMeta({ title: 'Categories' })
  },
  name: 'categories-page',
  components: { CategoryCreate, CategoryEdit },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  mixins: [localizeMixin],
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
  },
}
</script>
