<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          >{{ printErrorEmail(error.$validator, error.$params) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: v$.password.$error }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          >{{ printErrorPassword(error.$validator, error.$params) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          :class="{ invalid: v$.password.$error }"
          v-model.trim="name"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
          >{{ printErrorName(error.$validator, error.$params) }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Register-page",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { required, minLength: minLength(3), email },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;
      const formDate = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("register", formDate);
        this.$router.push("/");
      } catch (e) {
        // eslint-disable-next-line
      }
    },
    printErrorEmail($name, $param) {
      if ($name === "required") {
        return "Поле не должно быть пустым";
      } else if ($name === "minLength") {
        return "Минимальная длина должна быть " + $param.min + " символa";
      } else if ($name === "email") {
        return "Введите корректный Email";
      }
    },
    printErrorPassword($name, $param) {
      if ($name === "required") {
        return "Введите пароль";
      } else if ($name === "minLength") {
        return (
          "Пароль должен быть длинной " +
          $param.min +
          " символов." +
          "Сейчас он " +
          this.password.length
        );
      }
    },
    printErrorName($name) {
      if ($name === "required") {
        return "Введите Ваше имя";
      }
    },
  },
};
</script>
