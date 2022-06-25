import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlagin from "@/utils/message.plagin";
import LoaderVue from "@/components/App/LoaderVue.vue";
import tooltipDerective from "@/derectives/tooltip.derective";
import Paginate from "vuejs-paginate-next";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBIVq3ey8JYhPRy9g3Z8yf0qAQBxdP-TNc",
  authDomain: "finanse-manager.firebaseapp.com",
  projectId: "finanse-manager",
  storageBucket: "finanse-manager.appspot.com",
  messagingSenderId: "233784945980",
  appId: "1:233784945980:web:21ac2e80fd0ec93b434239",
  measurementId: "G-24BMXLXYHL",
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlagin)
      .component("LoaderVue", LoaderVue)
      .use(Paginate)
      .directive("tooltip", tooltipDerective)
      .mount("#app");
  }
});
