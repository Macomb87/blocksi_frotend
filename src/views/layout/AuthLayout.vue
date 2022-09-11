<template>

  <div v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <v-alert :type="info.type" v-if="info.show">
        {{ info.text }}
      </v-alert>
      <v-spacer></v-spacer>
      <slot></slot>
    </v-dialog>

  </div>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: "AuthLayout",
  computed: {
    ...mapState('userManipulation', ['info'])
  },
  data() {
    return {
      showInfo: false,
      dialog: false,
      text: ''
    }
  },
  mounted() {
    this.dialog = true;
  },


}
</script>

<style scoped>
.authIcon {

}
</style>
