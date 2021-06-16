import api from '../api'
import {getField, updateField} from 'vuex-map-fields'
import Cookie from 'vue-cookies'

const state = {
    logout_modal: false,
    thank_you_modal: false,
    username: '',
    userData: '',
    token: Cookie.get('token') || '',
    alert_message: '',
    messages: {
        errors: {
            password: '',
            email: '',
        }
    }
}

const getters = {
    getField,
    getToken(state) {
        if (!state.token) return []
        return state.token
    },
    getUserLoggedIn(state) {
        if (!state.userData) return []
        return state.userData
    }
}

const actions = {
    async getToken({commit}, params = {}) {
        let response = await api.getToken(params)
        if (response.status === 200) { // !response.data.errors && !response.data.error
            window.localStorage.setItem('userdata', JSON.stringify(response.data.data))
            Cookie.set('token', response.data.data.token)
            let res = await api.getPermissions()
            if (res.status === 200) {
                localStorage.setItem('permissions', JSON.stringify(res.data.data))
            }
            window.location.reload()
        }
        commit('onOkValidateLogin', response.data)
        return response
    },
    async destroyToken() {
        let body = {
            token: Cookie.get('token')
        }
        return await api.destroyToken(body)
    },
    async validateToken() {
        let body = {
            token: Cookie.get('token')
        }
        return await api.validateToken(body)
    },
    async refreshToken() {
        let token = Cookie.get('token')
        let response = await api.refreshToken(token)
        if (response.data.data.token) {
            window.localStorage.setItem('userdata', JSON.stringify(response.data.data))
            Cookie.set('token', response.data.data.Token)
        }
        return response
    },
    async getUserInformation({commit}) {
        let headers = {token: Cookie.get('token')}
        let response = await api.getUserInformation(headers)
        localStorage.setItem('user_profile', JSON.stringify(response.data.data))
        commit('onOkGetUserInformation', response.data.data)
    }
}

const mutations = {
    updateField,
    onOkGetUserInformation(state, data) {
        state.userData = data
    },
    onOkValidateLogin(state, data) {
        state.alert_message = ''
        if (data.errors) {
            state.messages.errors.email = data.errors.email
            state.messages.errors.password = data.errors.password
        } else if (data.error) {
            state.alert_message = data.error
        }

    },
    onOkGetLogin(state, data) {
        state.loginData = data
    },
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}