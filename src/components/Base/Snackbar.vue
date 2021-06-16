<template>
    <v-card>
        <v-snackbar
            v-model="snackbar"
            :color="settings.color"
            :top="settings.y === 'top'"
            :bottom="settings.y === 'bottom'"
            :left="settings.x === 'left'"
            :right="settings.x === 'right'"
            :timeout="settings.timeout"
            :vertical="settings.mode === 'vertical'"
            :multi-line="settings.mode === 'multi-line'">
            {{ settings.text }}
            <v-btn
                dark
                flat
                @click="snackbar = false">
                {{ close }}
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>

import {mapGetters} from 'vuex';
import {mapFields} from 'vuex-map-fields'

export default {
    computed: {
        ...mapGetters('utils', {settings: 'notification_settings'}),
        ...mapFields('utils', ['notification_settings.snackbar', 'close'])
    },
}

</script>
