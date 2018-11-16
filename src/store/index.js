import Vue from 'vue'
import vuex from 'vuex'
import personnel_state from './personnel_state'
Vue.use(vuex);
export default new vuex.Store({
    modules: {
        personnel: personnel_state
    }
})