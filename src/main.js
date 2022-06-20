// import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import dateFilter from "@/filters/date.filterx";

// Vue.filter("dateFilter", dateFilter);

createApp(App).use(store).use(router).mount("#app");
