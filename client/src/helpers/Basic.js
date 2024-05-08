import store from '../store';

export default class Basic {
    has(roles) {
        if (roles == 'all') { return true }
        const userRoles = store.getState().auth?.user?.roles || []
        const userRoleNames = userRoles.map(role => role.name)
        const rolesToCheck = roles.split('|')
        return rolesToCheck.some(role => userRoleNames.includes(role))
    }
}