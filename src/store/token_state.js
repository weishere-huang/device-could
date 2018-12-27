let tokenNub = localStorage.getItem('token')
let userMsg=JSON.parse(localStorage.getItem("user"))
export default {
  state: {
    tokenNub: tokenNub,
    userMsg: userMsg
  },
  mutations: {
    tokenSrc(state, data) {
      state.toeknNub = data
    },
    user(state, data) {
      state.userMsg=data
    }
  }
}
