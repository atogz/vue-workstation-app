import Vue from "vue";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://b8n.ru:7788/v1"
});

Vue.prototype.$axios = instance;

export default instance;
