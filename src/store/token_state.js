let tokenNub = JSON.parse(localStorage.getItem("user"))
let userMsg=JSON.parse(localStorage.getItem("user"))
export default {
  state: {
    tokenNub: '',
    userMsg: ''
  },
  mutations: {
    // tokenSrc(state, data) {
    //   state.toeknNub = data
    // },
    user(state, data) {
      state.userMsg = data
      state.tokenNub = data.tokenStr
    }
  }
}
