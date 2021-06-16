import Cookie from "vue-cookies";

let endpoint = {
    get_token: 'auth/token',
    profile_details: 'user/profile',
    auth: {
        get_token: 'Token/CareManagerLogin',
        destroy_token: 'auth/token',
        validate_token: 'auth/token',
        refresh_token: 'auth/token',
        get_logged_in_user: 'user/profile'
    },
    permissions: {
        get_permissions: 'role/get_user_role_and_permissions'
    },
}

export default {
    // ================================
    // AUTH / USER VALIDATIONS         
    // ================================
    async validateToken() {
        return await this.axios.get(endpoint.auth.validate_token, getToken())
    },
    async getToken(body) {
        console.log(this.axios)
        return await this.axios.post(endpoint.auth.get_token, body)
    },
    async destroyToken() {
        return await this.axios.delete(endpoint.auth.destroy_token, getToken())
    },
    async refreshToken(token) {
        let data = {}
        return await this.axios.post(endpoint.auth.refresh_token, data,
            {
                headers: {'token': token}
            }
        )
    },
    async getUserInformation() {
        return await this.axios.get(endpoint.auth.get_logged_in_user, getToken())
    },

    // ================================
    // PROFILE MANAGEMENT
    // ================================
    async verifyUserLogin(params) {
        return this.axios.get(endpoint.login + params)
    },
    async getUserProfileDetails() {
        return this.axios.get(endpoint.profile_details)
    },

    // ================================
    // PERMISSIONS
    // ================================
    async getPermissions() {
        return await this.axios.get(endpoint.permissions.get_permissions, getToken())
    },
}

function getToken() {
    return {headers: {'token': Cookie.get('token')}}
}
