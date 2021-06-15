<template>
    <v-layout>
        <v-flex md6 offset-md3 inset-md3>
            <v-container 
                fill-height>
                <v-card
                    width="100%"
                    dark flat color="#222">

                    <v-card-text primary-title>
                        <p class="text-md-center display-4">404</p>
                        <h1 class="text-md-center title">
                            There's nothing here! You can now go back to our 
                            <v-btn :to="{name: 'dashboard'}" color="primary">Homepage</v-btn>
                        </h1>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-flex>
    </v-layout>    
</template>

<script>
    export default {

    }
</script>

<style>

</style>
