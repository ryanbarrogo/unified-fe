<template>
    <section id="login">
        <v-container fluid>
            <v-row no-gutters>
                <v-col
                    cols="4"
                    class="left-panel"
                >
                    <v-container>
                        <v-row class="text-center" justify="center" align="center">
                            <v-col cols="12">
                                <v-img class="mx-auto" src="@/assets/img/auth/left-panel.png" max-width="200px"/>
                                <v-col>
                                    <h1>Login</h1>
                                </v-col>
                                <v-col>
                                    <p>Welcome to IQ:caremanager</p>
                                </v-col>
                                <v-col>
                                    <form>
                                        <v-col>
                                            <input v-model="email" type="text" placeholder="Email">
                                        </v-col>
                                        <v-col>
                                            <input v-model="password" type="password" placeholder="Password">
                                        </v-col>
                                        <v-col>
                                            <v-btn class="main-btn" @click="getAuth">Login</v-btn>
                                        </v-col>
                                    </form>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col
                    cols="8"
                    class="right-panel"
                >
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import {mapActions, mapMutations} from "vuex"

export default {
    name: 'Auth',
    methods: {
        ...mapActions('auth', ['getToken']),
        ...mapMutations('utils', ['toggleAlertDialog']),
        async getAuth() {
            let _s = this

            let body = {
                email: _s.email,
                password: _s.password
            }

            let res = await _s.getToken(body)
            if (res.status === 500) {
                this.toggleAlertDialog({text: 'Invalid user!', color: 'error'})
            } else if (res.status === 401) {
                if (res.data.error) {
                    this.toggleAlertDialog({text: this.alert_message, color: 'warning'})
                } else if (res.data.errors.status) {
                    this.toggleAlertDialog({text: res.message, color: 'error'})
                }
            } else if (res.status === 422) {
                if (res.data.errors) {
                    this.toggleAlertDialog({text: res.data.message, color: 'red'})
                }
            }
        },
    },
    data() {
        return {
            email: '',
            lang: 'en',
            password: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length >= 4 || 'Name must be less than 10 characters'
            ],
        }
    },
}
</script>