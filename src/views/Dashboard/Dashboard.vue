<template>
  <section id="dashboard">
    <v-container>
      <v-toolbar class="title-bar" flat>
        <h1 class="title-text">仪表板</h1>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn class="main-btn">Main</v-btn>
          <v-btn class="success-btn">Success</v-btn>
          <v-btn class="warning-btn">Warning</v-btn>
          <v-btn class="error-btn">Error</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-layout row wrap class="dashboard">
        <v-flex md8>
          <v-switch color="success" label="Show total" dark></v-switch>
        </v-flex>

        <v-flex md4 class="dealer-img">
          <h2 class="highlight">
            專我參氣來
            <span>看見候點與一可以灣止</span>
          </h2>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
  },
}
</script>