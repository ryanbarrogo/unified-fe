import {AbilityBuilder} from '@casl/ability'

function buildAction(actionsObj) {
    let actions = [];
    if (actionsObj.create) actions.push('create')
    if (actionsObj.read) actions.push('read')
    if (actionsObj.update) actions.push('update')
    if (actionsObj.delete) actions.push('delete')
    return actions
}

function buildRule(permissions, rules) {
    if (!permissions.length) return rules
    permissions.forEach(item => {
        let actions = buildAction({read: true})
        rules.push({actions, subject: item.module_name.split(' ').join('_').toLowerCase()})
        let childItems = item.permissions
        if (childItems.length) {
            childItems.forEach(item2 => {
                let actions = setChildRules(item2.code)
                rules.push({actions, subject: item2.code.split('::')[1].toLowerCase()})
            })
        }
    })
    return rules
}

function setChildRules(string) {
    let data = string.split('::')
    let objTypes = []
    if (data[0] == 'GET') objTypes.push('read')
    if (data[0] == 'POST') objTypes.push('create')
    if (data[0] == 'PUT') objTypes.push('update')
    if (data[0] == 'DELETE') objTypes.push('delete')

    return objTypes
}

export default (function () {
    let {rules, can, cannot} = AbilityBuilder.extract()
    let backendPermissions = JSON.parse(localStorage.getItem('permissions'))
    if (!backendPermissions) return []
    let builtRule = []
    buildRule(backendPermissions, builtRule)
    builtRule.forEach(item => can(item.actions, item.subject))
    return rules
})()

