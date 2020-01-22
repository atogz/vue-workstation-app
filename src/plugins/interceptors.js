import axios from "./api";
import store from "../store/index";

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      const token = store.state.token;
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("request ", token);
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}
