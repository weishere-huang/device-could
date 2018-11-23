export default {
  state: {
    upkeep: "",
    turnround:""
  },
  mutations: {
    upkeepAmend(state, data) {
      state.upkeep = data
    },
    turnaroundPlans(state, data) {
      state.turnround=data
    }
  }
}
