<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('open:navBar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter('datetime') }} </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ localize('ProfileTitle') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ localize('Out') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeMixin from '@/mixins/localize.mixin'

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    // eslint-disable-next-line
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    })
  },
  mixins: [localizeMixin],
  beforeUnmount() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
    dateFilter(value, format = 'date') {
      value = this.date
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat(this.info.locale, options).format(
        new Date(value)
      )
    },
  },
  computed: {
    ...mapGetters(['info']),
    name() {
      return this.$store.getters.info.name
    },
  },
}
</script>
