import {createApp} from 'vue'
import App from './App.vue'
import _ from "lodash";
import Axios from 'axios'
import Cookie from 'vue-cookies'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

let token = Cookie.get('token')
let axiosInstance = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {'Authorization': `Bearer ${token}`}
})
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (token && error.response.status === 401) {
            Cookie.remove('token')
            localStorage.removeItem('userdata')
            localStorage.removeItem('permissions')
            location.reload()
        }
        return error.response
    }
)

window.$_ = _
window.axios = axiosInstance

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')