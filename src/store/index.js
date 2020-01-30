import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoaded: false,
    user: {},
    token: null
  },

  getters: {
    getToken: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    isAuthorized: (state, getters) => {
      console.log(state.token);
      return getters.getToken ? true : false;
    }
  },
  mutations: {
    LOADING_FINISHED(state) {
      state.appLoaded = true;
      console.log("loading done", state.appLoaded);
    },

    USER_LOGGED(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    USER_DATA(state) {
      console.log("user.data", state);
    }
  },
  actions: {
    APP_LOADED({ commit }) {
      commit("LOADING_FINISHED");
    },

    LOGIN({ commit }, { username, password }) {
      return axios
        .post("/auth/login", {
          username: username,
          password: password
        })
        .then(response => {
          if (!response.data.success) {
            return Promise.reject(response.data.error);
          } else {
            commit("USER_LOGGED", response.data);
          }
        });
    },
    GET_USER_DATA({ commit }) {
      return axios.get("/projects").then(response => {
        console.log(response);
        commit("USER_DATA");
      });
    }
  },

  modules: {}
});
