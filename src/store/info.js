// import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        return onValue(
          ref(db, `users/${uid}/info`),
          (snapshot) => {
            const info = snapshot.val();
            commit("setInfo", info);
          },
          {
            onlyOnce: true,
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
