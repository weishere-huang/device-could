export default {
  state: {
    person: "",
    details:""
  },
  mutations: {
    equipmentRedact(state, data) {
      state.person = data
    },
    findOne(state,data){
      state.details=data
    }
  }
}
