export default {
  state: {
    person: ""
  },
  mutations: {
    equipmentRedact(state, data) {
      state.person = data
    }
  }
}