<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localize('Amount') }}</th>
        <th>{{ localize('Date') }}</th>
        <th>{{ localize('Category') }}</th>
        <th>{{ localize('Type') }}</th>
        <th>{{ localize('View') }}</th>
      </tr>
    </thead>

    <tbody v-for="(record, index) of records" :key="record.id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ baseFormatTable(record.amount) }}</td>
        <td>{{ dateFilter(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            localize(record.typeText)
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="localize('ViewRecord')"
            class="btn-small btn"
            @click="$router.push('/detail-record/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeMixin from '@/mixins/localize.mixin'

export default {
  props: {
    records: { type: Array, required: true },
  },
  data: () => ({}),
  mounted() {},
  mixins: [localizeMixin],
  methods: {
    baseFormatTable(value) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'UAH',
      }).format(value)
    },
    dateFilter(value, format = 'date') {
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
  },
}
</script>
