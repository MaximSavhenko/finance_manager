import { getDatabase, ref, update, push, child } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const postData = {
          title,
          limit,
        };
        const updates = {};
        const newCategoryKey = push(child(ref(db), "category")).key;
        updates[`/users/${uid}/categories/${newCategoryKey}`] = postData;
        return update(ref(db), updates) && { title, limit, id: newCategoryKey };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
