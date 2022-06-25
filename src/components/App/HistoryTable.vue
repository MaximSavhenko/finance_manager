<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
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
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
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
export default {
  props: {
    records: { type: Array, required: true },
  },
  data: () => ({}),
  mounted() {},
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

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    },
  },
}
</script>
