import api from '../api'
import { getField, updateField } from 'vuex-map-fields'

const state = {
    last_record: null,
    alert_dialog: false,
    loader_dialog: false,
    notification_settings: {
        snackbar: false,
        color: 'success',
        y: 'top',
        x: null,
        mode: '',
        timeout: 5000,
        text: 'Default Message!'
    },
    default_error_message: 'Something went wrong.',
    close: 'close',
    labels: {
        copyright: '2021 - UniqueIQ',
        version: {
            app: 'v1.0.0',
            api: ''
        }
    },
}

const getters = {
    getField,
    get_app_version: (state) => 'App Version ' + state.labels.version.app,
    get_api_version: (state) => 'API Version ' + state.labels.version.api,
    alert_dialog: (state) => state.alert_dialog,
    loader_dialog: (state) => state.loader_dialog,
    notification_settings: (state) => state.notification_settings,
}

const actions = {
    async getApiVersion({commit}) {
        let response = await api.getBackendVersion()
        commit('onOkGetApiVersion', response.data)
    }
}

const mutations = {
    updateField,
    onOkGetApiVersion(state, data) {
        state.labels.version.api = data
    },
    toggleAlertDialog(state, data) {
        if (state.notification_settings.snackbar) { state.notification_settings.snackbar = false }
        state.notification_settings.snackbar = !state.notification_settings.snackbar
        state.notification_settings.text = data.text
        state.notification_settings.color = data.color
    },
    toggleLoader(state) {
        state.loader_dialog = !state.loader_dialog
    }
}

export const utils = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}