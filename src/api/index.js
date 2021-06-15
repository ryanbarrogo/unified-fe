import qs from 'qs'

let endpoint = {
    profile_details: 'user/profile',
    profile_picture: 'user/profile/image',
    get_token: 'auth/token',
    get_backend_version: 'version',
    update_balance: {
        search_user: 'balance/player/',
        update_balance: 'balance/player/',
        check_valid_request_time: 'balance/player/check/',
        get_list_request: 'balance/requests',
        approve_request: 'balance/approve/',
        reject_request: 'balance/reject/'
    },
    account: {
        admin_users: 'user',
        update_admin_user: 'user/update/',
        get_user: 'user/update/',
        create_admin_user: 'user/create',
        get_roles: 'role/get_roles_by_access_level'
    },
    auth: {
        get_token: 'auth/token',
        destroy_token: 'auth/token',
        validate_token: 'auth/token',
        refresh_token: 'auth/token',
        get_logged_in_user: 'user/profile'
    },
    player: {
        get_player_details: 'player/'
    },
    player_transaction: {
        get_player_transactions: 'player/transaction/'
    },
    chip: {
        chip_limit_inquiry: 'chips/',
        user_types: 'user_type/',
    },
    role_management: {
        get_role_groups: 'role/get_role_groups',
        get_modules_and_permissions: 'role/get_modules_and_permissions',
        get_roles_and_permissions: 'role/role_and_permissions',
        add_role: 'role',
        duplicate_role: 'role/duplicate',
        update_role_permissions: 'role/add_or_update_role_permissions',
        update_role_name_or_group: 'role',
    },
    audit: {
        admin_audit_logs: 'audits/logs/',
        admin_ichips_logs: 'ichips/logs/',
        admin_audit_endpoint: 'end_points/',
    },
    operator: {
        operator_inquiry: 'operator'
    },
    permissions: {
        get_permissions: 'role/get_user_role_and_permissions'
    },
    withdrawal_verification: {
        get_whitelists: 'withdrawal_verification/white_list',
        get_blacklists: 'withdrawal_verification/black_list',
        get_whitelist_requests: 'withdrawal_verification/white_list_requests',
        add_user_to_whitelist: 'withdrawal_verification/add_user_to_white_list',
        approve_or_reject_whitelist_request: 'withdrawal_verification/approve_or_reject_white_list_request',
        get_rejected_logs: 'withdrawal_verification/get_rejected_logs',
    },
    games: {
        get_game_names: 'game'
    }
}

export default {
    // ================================
    // GET API (BACKEND) VERSION 
    // ================================
    async getBackendVersion() {
        return await version.get( endpoint.get_backend_version, getToken() )
    },

    
    // ================================
    // AUTH / USER VALIDATIONS         
    // ================================
    async validateToken() {
        return await axios.get( endpoint.auth.validate_token, getToken() )
    },
    async getToken(body) {
        return await axios.put( endpoint.auth.get_token, body )
    },
    async destroyToken() {
        return await axios.delete( endpoint.auth.destroy_token, getToken() )
    },
    async refreshToken(token) {
        let data = {}
        return await axios.post( endpoint.auth.refresh_token, data,
            {
                headers: { 'token': token }
            }
        )
    },
    async getUserInformation(token) {
        return await axios.get( endpoint.auth.get_logged_in_user, getToken() )
    },


    // ================================
    // UPDATE BALANCE
    // ================================
    async getRequestList(params) {
        return await axios.get( 
            endpoint.update_balance.get_list_request, 
            {
                headers: getToken().headers
            }
        )
    },
    async searchRequestList(params) {
        let config = {
            headers: getToken().headers,
            params: buildApiArgs(params, 'GET'),
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }
        config.params.date_start = params.params.date_start
        config.params.date_end = params.params.date_end
        config.params.user_type = params.search_params.user_type
        return await axios.get( 
            endpoint.update_balance.get_list_request, 
            config
        )
    },
    async searchUserForBalance(params) {
        let config = {
            headers: getToken().headers,
            params: { 'user_type': params.user_type }
        }
        return await axios.get( endpoint.update_balance.search_user + params.username, config )
    },
    async checkValidRequestTime(params) {
        let config = {
            headers: getToken().headers,
            params: { 'user_type': params.user_type, 'type' : params.type}
        }
        return await axios.get( endpoint.update_balance.check_valid_request_time + params.username, config )
    },
    async updateBalanceRequest(params) {
        return await axios.post(
            endpoint.update_balance.update_balance + params.player.username,
            params.body,
            {
                params: { 'user_type': params.params.user_type },
                headers: getToken().headers
            },
        )
    },
    async approveRequest(params) {
        return await axios.put( endpoint.update_balance.approve_request + params.id, {}, getToken() )
    },
    async rejectRequest(params) {
        return await axios.put( endpoint.update_balance.reject_request + params.id, {}, getToken() )
    },


    // ================================
    // OPERATORS
    // ================================

    async getOperators(params = {}) {
        return axios.post( endpoint.operator.operator_inquiry, null, getToken())
    },
    async searchOperators(params) {
        return axios.post( endpoint.operator.operator_inquiry, 
            buildApiArgs(params),
            getToken()
        )
    },


    // ================================
    // PLAYERS         
    // ================================

    async getPlayerInformation(params) {
        let temp = buildApiArgs(params, 'GET')
        temp.user_type = params.search_params.user_type
        temp.date_start = params.search_params.date_start
        temp.date_end = params.search_params.date_end
        temp['sort[order_by]'] = params.table_params.descending == true ? 'DESC' : 'ASC'
        temp['sort[column]'] = params.table_params.sortBy
        delete temp.search
        delete temp.sort
        return await axios.get( endpoint.player.get_player_details + params.search_params.player,
            {
                headers: getToken().headers,
                params: temp
            }
        )
    },

    // ================================
    // PLAYER TRANSACTIONS
    // ================================

    async getPlayerTransactions(params) {
        return await axios.post( endpoint.player_transaction.get_player_transactions + (params.username ? params.username : ''),
            params,
            getToken()
        )
    },

    // ================================
    // CHIP LIMIT INQUIRY         
    // ================================

    async getChipLimitInquiry(params, token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.post( endpoint.chip.chip_limit_inquiry, params, getToken() )
    },
    async getUserTypes(token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.get( endpoint.chip.user_types, getToken() )
    },
    async getGameNames(token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.get( endpoint.games.get_game_names, getToken() )
    },


    // ================================
    // AUDIT LOGS
    // ================================

    async getAuditLogs(params, token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.post( endpoint.audit.admin_audit_logs, params, config)
    },
    async getIchipsLogs(params, token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.post( endpoint.audit.admin_ichips_logs, params, config)
    },
    async getEndpoints(token) {
        let config = {
            headers: { 'token': token }
        }
        return await axios.get( endpoint.audit.admin_audit_endpoint, config)
    },


    // ================================
    // ACCOUNT MANAGEMENT
    // ================================

    async getRolesByAccessLevel() {
        return axios.get( endpoint.account.get_roles, getToken())
    },
    async getAdminUsers(params) {
        return axios.post( endpoint.account.admin_users, params, getToken())
    },
    async createAdminUser(body) {
        return axios.post( endpoint.account.create_admin_user, body, getToken())
    },
    async getAdminUser(user) {
        return axios.get( endpoint.account.get_user + user, getToken())
    },
    async searchAdminUsers(params = {}) {
        return axios.post( endpoint.account.admin_users, buildApiArgs(params), getToken())
    },
    async updateAdminUser(params) {
        return axios.put( endpoint.account.update_admin_user + params.account_id, params.body, getToken())
    },


    // ================================
    // PROFILE MANAGEMENT
    // ================================
    async verifyUserLogin(params) {
        return axios.get(endpoint.login + params)
    },
    async getUserProfileDetails() {
        return axios.get( endpoint.profile_details)
    },
	async getProfilePicture() {
		return axios.get(endpoint.profile_picture, getToken())
	},
    async updateUserProfileDetails(args) {
        return await axios.put( endpoint.profile_details, args, {
	        headers: { 'token': $cookies.get("token") }
        })
    },
	async saveProfilePicture(formData) {
        return await axios( endpoint.profile_picture,
            {
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
	                'token': getToken().headers.token
                }
            },
        )
	},

    // ================================
    // ROLE MANAGEMENT
    // ================================

    async getRoleGroups(params) {
        let config = {
            headers: { 'token': $cookies.get("token") },
            params
        }
        return await axios.get( endpoint.role_management.get_role_groups, config )
    },
    async getRolesAndPermissions(params) {
        let config = {
            headers: { 'token': $cookies.get("token") },
            params
        }
        return await axios.get( endpoint.role_management.get_roles_and_permissions, config )
    },
    async getModulesAndPermissions(params) {
        let config = {
            headers: { 'token': $cookies.get("token") },
            params
        }
        return await axios.get( endpoint.role_management.get_modules_and_permissions, config )
    },
    async addRole(params) {
        return await axios.post( endpoint.role_management.add_role, params, getToken() )
    },
    async duplicateRole(params) {
        return await axios.post( endpoint.role_management.duplicate_role, params, getToken() )
    },
    async updateRolePermissions(params) {
        return await axios.post( endpoint.role_management.update_role_permissions, params, getToken() )
    },
    async updateRoleNameOrGroup(params) {
        return await axios.put( endpoint.role_management.update_role_name_or_group, params, getToken() )
    },


    // ================================
    // PERMISSION
    // ================================

    async getPermissions() {
        return await axios.get( endpoint.permissions.get_permissions, getToken() )
    },

    // ================================
    // WITHDRAWAL VERIFICATION
    // ================================

    async getWhitelist() {
        return await axios.post( endpoint.withdrawal_verification.get_whitelists, null, getToken() )
    },
    async getBlacklist() {
        return await axios.post( endpoint.withdrawal_verification.get_blacklists, null, getToken() )
    },
    async searchWhitelist(params = {}) {
        return await axios.post( endpoint.withdrawal_verification.get_whitelists, params, getToken() )
    },
    async searchBlacklist(params = {}) {
        return await axios.post( endpoint.withdrawal_verification.get_blacklists, params, getToken() )
    },
    async addToWhitelist(params) {
        return await axios.post( endpoint.withdrawal_verification.add_user_to_whitelist, params, getToken() )
    },
    async getWhitelistRequests() {
        return await axios.post( endpoint.withdrawal_verification.get_whitelist_requests, null, getToken() )
    },
    async searchWhitelistRequests(params = {}) {
        return await axios.post( endpoint.withdrawal_verification.get_whitelist_requests, params, getToken() )
    },
    async approveOrRejectWhitelistRequest(params = {}) {
        return await axios.put( endpoint.withdrawal_verification.approve_or_reject_whitelist_request + '/' + params.id + '/status/' + params.status, {}, getToken() )
    },
    async getRejectedLogs() {
        return await axios.post( endpoint.withdrawal_verification.get_rejected_logs, null, getToken() )
    },
    async searchRejectedLogs(params = {}) {
        return await axios.post( endpoint.withdrawal_verification.get_rejected_logs, params, getToken() )
    },
}

function buildApiArgs(body, last_record, method = 'POST') {
    let params = { 
        start: 0,
        length: 0,
        search : [],
        sort: [],
    }
    
    Object.keys(body).forEach(x => {
        if (x == 'search_params') {
            Object.keys(body[x]).forEach(key => {
                if (key == 'role') params.search['role_id'] = body[x][key] //['search[role_id]']
                else params.search[key] = body[x][key] //['search[' + key + ']']
            })
            params.search = body[x]
        }
        else if (x == 'table_values') {
	        Object.keys(body[x]).forEach(key => {
                if(key === 'searchTrigger'){
                    if(body.table_values.searchTrigger === true){
	                    params.start = 0
	                    body.table_values.searchTrigger = false
                    }
                }
	        })
        }
        else if (x == 'table_params') {
            Object.keys(body[x]).forEach(key => {
                if (key == 'sortBy') params.sort['column'] = body[x][key] == null ? 'created_at' : body[x][key]
                if (key == 'descending') params.sort['order_by'] = body[x][key] == false ? 'ASC' : 'DESC'
                if (key== 'last_record_id'){
                    if(body.table_values.currentPage > body[x].page){ //Previous
                        params.start = body.table_values.previousPages
                        let prev = body.table_values.previousPages.slice(-1)
                        params.start = prev[0]
                    }
                    
                    else if(body.table_values.rowItemChange){
	                    params.start = 0
	                    body[x].page = 1
	                    body.table_values.rowItemChange = false
                    }
                    
                    else if(body.table_values.newRowPage != body.table_values.rowsPerPage){
                        params.start = 0
                        body.table_values.newRowPage = body.table_values.rowsPerPage
                    }
                    
                    else{
                        params.start = body[x][key]
                    }
                    body.table_values.currentPage = body[x].page
                    if (body.table_values.column_has_changed || body.table_values.sort_has_changed || body.table_values.range_has_changed ) {
                        params.start = 0
                    }
                }
                if(key == 'rowsPerPage'){
                    params.length = body[x][key]
                }

            })
        }
        else {
            Object.keys(body[x]).forEach(key => {
                params[key] = body[x][key]
            })
        }
    })

    if (method == 'GET') {
        return params
    }
    let return_values = { 
        start: params.start,
        length: params.length,
        search : Object.assign({}, params.search),
        sort: Object.assign({}, params.sort),
    }
    return return_values
}

function getToken() {
    return { headers: { 'token': $cookies.get('token') } }
}
