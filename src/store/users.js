import {getField, updateField} from 'vuex-map-fields'

const state = {}

const getters = {
    getField,
}

const actions = {}

const mutations = {
    updateField,
}

export const users = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}