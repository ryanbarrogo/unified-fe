<template>
  <section id="login">
    <v-layout>
      <v-flex lg4 md5 sm5 xs0 class="left-panel">
      </v-flex>
      <v-flex lg8 md7 sm7 xs12 class="right-panel">
        <v-container fill-height pa-0 ma-0>
          <v-card width="100%" class="ghost-fill" flat>
            <v-card-text class="logo-xs">
            </v-card-text>
            <v-card-text>
              <v-form class="animated slow fadeIn">
                <v-btn class="main-btn">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-flex>
      <div class="circle-container" v-for="n in 30" :key="n">
        <div class="circle"></div>
      </div>
    </v-layout>
    <div class="footer-label">
      <p class="left">
        &copy;{{ labels.copyright }}
      </p>
      <p class="right">
        {{ get_app_version }}, {{ get_api_version }}
      </p>
    </div>
  </section>
</template>

<script>

import {mapGetters} from "vuex"
import {mapFields} from 'vuex-map-fields'

export default {
  name: "Auth",
  computed: {
    ...mapFields('utils', ['labels']),
    ...mapGetters('utils', ['get_api_version', 'get_app_version'])
  },
  mounted() {
  },
  methods: {
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