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
import menuSourceMap from "./router/routeMap";
import permissionPacker from "./PermissionPacker.js"
import VueRippler from 'vue-rippler'

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
Vue.use(VueRippler)
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
Vue.use(permissionPacker);
Vue.use(vuex);
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.Axios = Axios;
axios.defaults.withCredentials = true;
window.EventBus = new Vue();
let permissionUrl=[];
let AUTH_TOKEN = (function () {
  return localStorage.getItem("token");
  // return store.state.token.tokenNub;
})();
var instance = axios.create({});
//弹框消失
Vue.directive('clickoutside', {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
// 登录拦截
router.beforeEach((to, from, next) => {
  if(permissionUrl.length===0) permissionUrl = JSON.parse(localStorage.getItem("permissionUrl")||'[]');
  let isLogin = localStorage.getItem('token')
  instance.defaults.headers.common["token"] = isLogin;
  if (to.meta.requireAuth) { // 判断是否需要登录权限
    if (isLogin) { // 判断是否登录
      let isHasPermission=false;
      for(let i=0,l=menuSourceMap.length;i<l;i++){
        for(let m=0,n=menuSourceMap[i].subMenu.length;m<n;m++){
          let isCheck=permissionUrl.find(p=>p.module===menuSourceMap[i].subMenu[m].permissionCode)?true:false;
          let isRoute=menuSourceMap[i].subMenu[m].routeReg?menuSourceMap[i].subMenu[m].routeReg.test(to.fullPath):(menuSourceMap[i].subMenu[m].route===to.path)?true:false;
          if('/Organization'===menuSourceMap[i].subMenu[m].route){
            
          }
          if(isRoute&&(isCheck||menuSourceMap[i].defaultDock)){
            isHasPermission=true;
            break;
          }
        }
      }
      if(isHasPermission)
        next()
      else
        next({
          path: '/Home'
        })
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
