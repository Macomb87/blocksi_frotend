<template>
  <div>
    <app-bar-top></app-bar-top>
    <v-alert :type="info.type" v-if="info.show">
      {{ info.text }}
    </v-alert>
    <slot></slot>
  </div>
</template>

<script>
import AppBarTop from "@/components/AppBarTop";
import {mapState} from "vuex";

export default {
  name: "DefaultLayout",
  components: {AppBarTop},
  computed: {
    ...mapState('userManipulation', ['info'])
  },
}
</script>

<style scoped>

</style>
