export const action = {
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
}

export const moduleAbility = {
    module: {
        balance_adjustments : 'module_balance_adjustments',
        update_balance : 'module_update_balance',
        audit_trails : 'module_audit_trails',
        chip_limit_inquiry : 'module_chip_limit_inquiry',
        ip_whitelist : 'module_ip_whitelist',
        operator_inquiry : 'module_operator_inquiry',
        player_inquiry : 'module_player_inquiry',
        player_transaction : 'module_player_transactions',
        role_management : 'module_role_management',
        account_management : 'module_account_management',
        profile_management : 'module_profile_management',
        user_type : 'module_user_type',
        withdrawal_verification : 'module_withdrawal_verification',
    }
}

export const childAbility = {
    child : {
        balance_adjustments : {
            search_player_update_balance : 'search_player_update_balance',
            update_balance : 'update_balance',
            update_balance_requests_list : 'update_balance_requests_list',
        },
        update_balance : {
            approve_update_balance_request : 'approve_update_balance_request',
            reject_update_balance_request : 'reject_update_balance_request',    
        },
        audit_trails : {
            admin_tool_logs : 'admin_tool_logs',
            ichips_api_logs : 'ichips_api_logs',
        },
        chip_limit_inquiry : {
            chip_limit_inquiry : 'chip_limit_inquiry',
        },
        ip_whitelist : {
            is_whitelisted : 'is_whitelisted',
        },
        operator_inquiry : {
            operator_inquiry : 'operator_inquiry',
        },
        player_inquiry : {
            player_inquiry : 'player_inquiry',
        },
	    player_transaction : {
            get_player_transactions : 'get_player_transactions',
	    },
        role_management : {
            admin_add_role : 'admin_add_role',
            admin_get_role_groups : 'admin_get_role_groups',
            admin_get_roles : 'admin_get_roles',
            admin_update_role : 'admin_update_role',
            admin_delete_role : 'admin_delete_role',
            admin_duplicate_role_and_permissions : 'admin_duplicate_role_and_permissions',
            admin_get_user_role_and_its_permissions : 'admin_get_user_role_and_its_permissions',
            admin_roles_by_access_level : 'admin_roles_by_access_level',
            admin_get_modules_and_permissions : 'admin_get_modules_and_permissions',
        },
        account_management : {
            admin_users_datatable : 'get_list_of_users',
            create_admin_user : 'create_new_user',
            get_specific_user : 'get_specific_user_details',
            update_admin_user : 'update_user_details',
            delete_admin_user : 'delete_user',
        },
        profile_management : {
            get_profile : 'get_user_profile',
            update_user_profile : 'update_user_profile',
            get_user_profile_picture : 'get_user_profile_picture',
            update_user_profile_picture : 'update_user_profile_picture',
        },
        user_type : {
            get_user_types : 'get_user_types',
        },
        withdrawal_verification : {
            get_black_list : 'get_black_list',
            get_white_list : 'get_white_list',
            add_user_from_black_list_to_white_list : 'add_user_from_black_list_to_white_list',
            get_rejected_requests_log : 'get_rejected_requests_log',
            get_white_list_requests : 'get_white_list_requests',
            approve_or_reject_white_list_request : 'approve_or_reject_white_list_request',
        },
    }
}