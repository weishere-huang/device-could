import {
  addCookie,
  getCookie,
  delCookie
} from '../cookie.js';
// let tokenNub = JSON.parse(localStorage.getItem("user"))
let userMsg = JSON.parse(localStorage.getItem("user"))
let tokenStr = localStorage.getItem("token")
let permissionUrl = JSON.parse(getCookie('permissionUrl') || '[]');
export default {
  state: {
    tokenNub: tokenStr,
    userMsg: userMsg,
    permissionUrl: permissionUrl,
  },
  mutations: {
    // tokenSrc(state, data) {
    //   state.toeknNub = data
    // },
    user(state, data) {
      state.userMsg = data
      state.tokenNub = data.tokenStr
      state.permissionUrl = data.permissionUrl
    }
  }
}
