import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoaded: false,
    user: {},
    token: null,
    currentProjects: []
  },

  getters: {
    getToken: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    isAuthorized: (state, getters) => {
      return !!getters.getToken;
    },
    getProjects: state => {
      return state.currentProjects;
    }
  },
  mutations: {
    LOADING_FINISHED(state) {
      state.appLoaded = true;
    },

    USER_LOGGED(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    CURRENT_PROJECTS(state, payload) {
      state.currentProjects = payload.projects;
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
    GET_PROJECTS({ commit, state }) {
      return axios
        .get("/projects?token=" + state.token + "&userRole=" + state.user.role)
        .then(response => {
          console.log(response);
          commit("CURRENT_PROJECTS", response.data);
        });
    }
  },

  modules: {}
});
