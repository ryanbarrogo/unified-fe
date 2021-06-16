import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from './views/Dashboard/Dashboard'
import Auth from './views/Auth/Auth.vue'
import NotFound from './views/Auth/NotFound'

const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'auth',
            component: Auth,
            meta: {not_for_authenticated: true}
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {requires_auth: true}
        },
        {
            path: '/:catchAll(.*)*',
            name: 'not-found',
            component: NotFound,
            meta: {requires_auth: false}
        }
    ]
})

router.beforeEach((to, from, next) => {
    //Restrict access to protected routes if not logged in
    if (to.meta.requires_auth && window.axios.defaults.headers.Authorization.indexOf('null') >= 0) {
        next({name: 'auth'})
        return
    }

    //Restrict access to Login page if user is logged in
    if (to.meta.not_for_authenticated && window.axios.defaults.headers.Authorization.indexOf('null') < 0) {
        next({name: 'dashboard'})
        return
    }

    // if (to.meta.permission && localStorage.getItem('permissions') && localStorage.getItem('permissions').indexOf(to.meta.permission.split('_').join(' ').replace(/\w+/g,
    //     function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})) <= -1) {
    //     next({name: 'dashboard'})
    //     return
    // }

    next()
})


export default router
