import Vue from 'vue'
import vuex from 'vuex'
import personnel_state from './personnel_state'
import equipment_statr from './equipment_statr'
import operation_state from './operation_state'
Vue.use(vuex);
export default new vuex.Store({
    modules: {
        personnel: personnel_state,
        equipment: equipment_statr,
        operation: operation_state
    }
})