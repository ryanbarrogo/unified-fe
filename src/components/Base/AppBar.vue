<template>
    <v-app-bar flat>
        <!--        <v-app-bar-title>Dashboard</v-app-bar-title>-->
        <v-spacer>Dashboard</v-spacer>
        <v-icon class="mr-5">fas fa-cog</v-icon>
        <v-icon class="mr-5">fas fa-user-check</v-icon>
        <v-icon @click="logout" class="mr-5">fas fa-sign-out-alt</v-icon>
    </v-app-bar>
</template>

<script>
import Cookie from 'vue-cookies'

export default {
    name: "AppBar",
    methods: {
        async logout() {
            Cookie.remove('token')
            setTimeout(function () {
                localStorage.removeItem('userdata')
                localStorage.removeItem('user_profile')
                localStorage.removeItem('permissions')
                location.reload()
            }, 1000);
        },
    }
}
</script>
