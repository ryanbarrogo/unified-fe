import {createStore} from 'vuex'
import {getField, updateField} from "vuex-map-fields"
// import { auth } from './auth.js'
import {utils} from './utils.js'


const store = createStore({
    namespaced: true,
    modules: {
        // auth,
        utils
    },
    state: {},
    getters: {
        getField,
    },
    actions: {},
    mutations: {
        updateField,
    }
})

export default store