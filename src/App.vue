<template>
    <div id="app">
        <v-app>
            <app-bar v-if="$route.name !== 'auth'"/>
            <v-main>
                <router-view/>
            </v-main>
        </v-app>
    </div>
</template>

<script>

import AppBar from './components/Base/AppBar'

export default {
    name: 'App',
    components: {
        AppBar
    }
}
</script>

<style lang="scss">
@import "@/assets/styles/sass/style.scss"
</style>
