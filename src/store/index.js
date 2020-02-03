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
    projectTasks: [],
    projectMaterials: []
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
    getProjectTasks: state => {
      return state.projectTasks;
    },
    getProjectMaterials: state => {
      return state.projectMaterials;
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
    PROJECT_TASKS(state, payload) {
      state.projectTasks = payload.tasks;
    },
    PROJECT_MATERIALS(state, payload) {
      state.projectMaterials = payload.materials;
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
          commit("CURRENT_PROJECTS", response.data);
        });
    },
    GET_PROJECT_TASKS({ commit, state }, projectId) {
      return axios
        .get("/tasks?token=" + state.token + "&projectId=" + projectId)
        .then(response => {
          commit("PROJECT_TASKS", response.data);
        });
    },
    GET_PROJECT_MATERIALS({ commit, state }, projectId) {
      console.log(projectId);
      return axios
        .get("/materials?token=" + state.token + "&projectId=" + projectId)
        .then(response => {
          console.log(response);
          commit("PROJECT_MATERIALS", response.data);
        });
    }
  },

  modules: {}
});
