<template>
  <v-app-bar
      app
      color="primary"
      dark>
    <div class="d-flex align-center">
      <v-img
          alt="blocksi Logo"
          class="shrink mr-2"
          contain
          src="../assets/blocksiLogo.svg"
          transition="scale-transition"
          width="100"
      />
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBarTop"
}
</script>

<style scoped>

</style>
