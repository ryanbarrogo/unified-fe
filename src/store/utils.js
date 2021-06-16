import {getField, updateField} from 'vuex-map-fields'

const state = {
    notification_settings: {
        snackbar: false,
        color: 'success',
        y: 'top',
        x: null,
        mode: '',
        timeout: 5000,
        text: 'Default Message!'
    },
}

const getters = {
    getField,
    notification_settings: (state) => state.notification_settings,
}

const actions = {}

const mutations = {
    updateField,
    toggleAlertDialog(state, data) {
        if (state.notification_settings.snackbar) {
            state.notification_settings.snackbar = false
        }
        state.notification_settings.snackbar = !state.notification_settings.snackbar
        state.notification_settings.text = data.text
        state.notification_settings.color = data.color
    },
}

export const utils = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}