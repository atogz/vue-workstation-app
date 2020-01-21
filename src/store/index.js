import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: undefined
  },

  getters: {
    getToken: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    isAuthorized: (state, getters) => {
      console.log(state);
      return getters.getToken ? true : false;
    }
  },
  mutations: {
    USER_LOGGED(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    }
  },
  actions: {
    LOGIN({ commit }, { username, password }) {
      return axios
        .post("http://b8n.ru:7777/v1/auth/login", {
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
    }
  },

  modules: {}
});
