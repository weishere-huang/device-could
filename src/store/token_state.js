export default {
  state: {
    tokenNub: "",
    userMsg:""
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
