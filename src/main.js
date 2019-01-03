// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Axios from './AxiosRequest';
import vuex from 'vuex'
import $ from 'jquery'
import 'vue-easytable/libs/themes-base/index.css';
import md5 from 'js-md5/src/md5.js'
import CryptoJS from 'crypto-js'
import 'normalize.css'
import './assets/less/layout.less'
import './assets/less/other.less'
import {
  VTable,
  VPagination
} from 'vue-easytable'
import global from './components/global/Global'
import base from "./base.js";
import {
  addCookie,
  getCookie,
  delCookie
} from './cookie.js';
Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}
Vue.use(base)
// import {
//   Message,
//   MessageBox
// } from 'element-ui'
Vue.prototype.global = global;
// Vue.pototyype.message = function (msg) {
//   this.$message('这是一条消息提示')
// }
// 富文本引入
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.use(ElementUI)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(vuex);
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.Axios = Axios;
axios.defaults.withCredentials = true;
window.EventBus = new Vue();

let AUTH_TOKEN = (function () {
  return localStorage.getItem("token");
  // return store.state.token.tokenNub;
})();
var instance = axios.create({});

// 登录拦截
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('token')
  instance.defaults.headers.common["token"] = isLogin;
  if (to.meta.requireAuth) { // 判断是否需要登录权限
    if (isLogin) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
});
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
