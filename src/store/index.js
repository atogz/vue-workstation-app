import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoaded: false,
    user: {},
    token: null,
    currentProjects: [],
    projectData: {},
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
    },
    getProjectData: state => {
      return state.projectData;
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
    },
    PROJECT_DATA(state, payload) {
      console.log('project_data_commit ',payload);
      state.projectData = payload.data;
      console.log(state.projectData);
    },
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
          commit("CURRENT_PROJECTS", response.data);
        });
    },
    GET_PROJECT_DATA({ commit, state }, projectId) {
      console.log('dispatch ', projectId);
      return axios
        .get("/project?token=" + state.token + "&projectId=" + projectId)
        .then(response => {
          commit("PROJECT_DATA", response.data);
        });
    },
  },

  modules: {}
});
