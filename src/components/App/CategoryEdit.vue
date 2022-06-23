<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="options of categories"
              :key="options.id"
              :value="options.id"
            >
              {{ options.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" v-model="name" />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.name.$errors"
            :key="index"
            >{{ printErrorName(error.$validator, error.$params) }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-for="(error, index) of v$.limit.$errors"
            :key="index"
            >{{ printErrorLimit(error.$validator, error.$params) }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    name: "",
    limit: 100,
    current: null,
  }),
  validations: {
    name: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select);
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.name = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;
      try {
        const categoryData = {
          id: this.current,
          title: this.name,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);

        // this.name = "";
        // this.limit = 100;
        // this.v$.$reset();
        this.$message("Категория успешно обновлена");
        this.$emit("updated", categoryData);
      } catch (e) {
        console.log(e);
      }
    },
    printErrorName($name) {
      if ($name === "required") {
        return "Введите название категории";
      }
    },
    printErrorLimit($name, $param) {
      if ($name === "minValue") {
        return "Минимальная величина " + $param.min;
      }
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.name = title;
      this.limit = limit;
    },
  },
};
</script>
