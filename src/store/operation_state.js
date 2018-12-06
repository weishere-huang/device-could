export default {
  state: {
    upkeep: "",
    turnround:"",
    breakList:"",
    work:""
  },
  mutations: {
    upkeepAmend(state, data) {
      state.upkeep = data
    },
    turnaroundPlans(state, data) {
      state.turnround=data
    },
    breakDetails(state,data){
      state.breakList = data
    },
    workOrders(state,data){
      state.work = data
    }
  }
}
