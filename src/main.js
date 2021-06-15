import {createApp} from 'vue'
import App from './App.vue'
import _ from "lodash";
import Axios from 'axios'
import Cookie from 'vue-cookies'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {createVuetify} from 'vuetify'
// import Datetime from 'vue-datetime' //Normal datepicker
// import 'vue-datetime/dist/vue-datetime.min.css' //Normal datepicker style

// import { initAbility } from './permissions/ability'
// import { abilitiesPlugin, Can } from '@casl/vue'
//
// createApp(App).use(Datetime)

let headers = {}
let token = Cookie.get('token')

if (token) {
    headers = {'Authorization': `Bearer ${token}`}
}

let axiosInstance = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    headers: headers
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
const vuetify = createVuetify()
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')