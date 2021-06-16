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
        AppBar,
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
