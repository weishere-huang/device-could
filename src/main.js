// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import vuex from 'vuex'
import 'vue-easytable/libs/themes-base/index.css';
import md5 from 'js-md5/src/md5.js'
import CryptoJS from 'crypto-js'
import {
  VTable,
  VPagination
} from 'vue-easytable'
import global from './components/global/Global'

Vue.prototype.global = global;
Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(vuex);
Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.withCredentials = true;

let AUTH_TOKEN = (function () {
  return sessionStorage.getItem("token");
})();
var instance = axios.create({});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.interceptors.request.use(function (config) {
  let url = config.url;
  if (url.indexOf("login") > -1) {
    sessionStorage.setItem('token', "");
    config.headers.Authorization = "";
  }
  if (url.indexOf("user") > -1 && url.indexOf("login") < 0) {
    config.headers.Authorization = sessionStorage.getItem("token");
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});
instance.interceptors.response.use(function (res) {
  if (res.headers.token) {
    sessionStorage.setItem('token', res.headers.token);
  }
  return res;
}, function (err) {
  return err;
});
export default instance;

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  ElementUI,
  axios,
  store

})
