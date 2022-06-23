<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of rates" :key="cur">
              <td>{{ cur.ccy }}</td>
              <td>{{ cur.buy }}</td>
              <td>{{ dateFilter("datetime") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    date: new Date(),
  }),
  mounted() {},
  methods: {
    dateFilter(value, format = "date") {
      value = this.date;
      const options = {};

      if (format.includes("date")) {
        options.day = "2-digit";
        options.month = "long";
        options.year = "numeric";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
};
</script>
