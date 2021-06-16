import {createStore} from 'vuex'
import {getField, updateField} from "vuex-map-fields"
import {auth} from './auth.js'
import {utils} from './utils.js'
import {users} from './users.js'


const store = createStore({
    namespaced: true,
    modules: {
        auth,
        utils,
        users,
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