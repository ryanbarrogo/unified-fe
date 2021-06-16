import api from '../api'
import {getField, updateField} from 'vuex-map-fields'
import Cookie from 'vue-cookies'

const test_response_data = {
    "UserID": 4553,
    "Forename": "Bilbo",
    "Surname": "Baggins",
    "Id": 51,
    "EmailAddress": "ci@uniqueiq.co.uk",
    "Password": "RZS+ymJPTyrg6psZW5O5TVDTHq+VunWKMmI+XRPlHO8=",
    "OrganisationID": 3126,
    "GroupTypeID": 1,
    "SmsAccountNo": 9,
    "PinCodeReEntryInMinutes": 73,
    "EvaCode": "Approved",
    "ServerDataSource": "oks8HCxwwg5WOCLDtlB71f/xnVeKktxN/Hmu0ZHTtCU9jKj1bWUbjwGPHtJrcds3",
    "ConnectionString": "integrated security=FALSE;uid=Dx6OBdEzU9dV07Py6Fx2dA==;pwd=hYPFQ1NeAl7/38/cUUBdGYWPmqdKOnBptLGdaWL/5FM=;database=CareManagerUnified;pooling=TRUE;connection timeout=90000;",
    "IV": "bsxnWolsAyO7kCfWuyrnqg==        ",
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNpQHVuaXF1ZWlxLmNvLnVrIiwicm9sZSI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoidjIuMSIsIlVuaXF1ZUlxLk9yZyI6IjMxMjYiLCJuYmYiOjE2MjM4NTQ1OTYsImV4cCI6MTYyNDQ1OTM5NiwiaWF0IjoxNjIzODU0NTk2fQ.Qk4or5Y2YfTdsK3wKNG9TaRT1BEEIufvKv0T14NaZJo",
    "FormioUrl": "https://dev-asfminmvhedwpvt.form.io",
    "FormioEmail": "formio+uniqueiq@uniqueiq.co.uk",
    "FormioPassword": "AArPCNbpbhuOpW1+xRSi2w==",
    "FormioIv": "ugWJt31XRYQMUxBs1SQobA=="
};

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
    },
}

const getters = {
    getField,
    getToken(state) {
        if (!state.token) return []
        return state.token
    }
}

const actions = {
    async getToken() {
        window.localStorage.setItem('userdata', JSON.stringify(test_response_data))
        Cookie.set('token', test_response_data.Token)
        window.location.reload()
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