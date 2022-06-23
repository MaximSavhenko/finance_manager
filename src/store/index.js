import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  actions: {
    async fetchCurrency() {
      // const key = process.env.VUE_APP_FIXER;

      const res = await fetch(
        "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5"
      );
      return await res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
