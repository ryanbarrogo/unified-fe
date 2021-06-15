import { Ability } from '@casl/ability'
import Rules from './rules'

export const initAbility = function() {
    let rules = Rules
    let ability =  new Ability(rules)
    return ability
}