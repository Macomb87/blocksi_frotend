<template>
  <div>
    <auth-layout>
      <div>
        <v-card color="primary">
          <v-tabs
              @change="onTabChange($event)"

              grow
              icons-and-text>
            <v-tab key="login">
              <v-icon large>mdi-account</v-icon>
              <div class="caption py-1">Login</div>
            </v-tab>
            <v-tab key="register">
              <v-icon large>mdi-account-outline</v-icon>
              <div class="caption py-1">Register</div>
            </v-tab>
          </v-tabs>
          <v-tabs-items :value="tabNumber">
            <v-tab-item key="login">
              <login-component></login-component>
            </v-tab-item>
            <v-tab-item key="register">
              <register-component></register-component>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </auth-layout>
  </div>
</template>

<script>
import AuthLayout from "@/views/layout/AuthLayout";
import LoginComponent from "@/components/Login";
import RegisterComponent from "@/components/Register";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginView",
  components: {RegisterComponent, LoginComponent, AuthLayout},
  computed: {
    ...mapGetters('userManipulation', ['tabNumber']),
  },
  data() {
    return {
      headIcon: 'mdi-account',
      dialog: false,
      tab: 0,
      items: [
        'Login',
        'Register'
      ]
    }
  },
  methods: {
    ...mapActions('userManipulation', ['selectTab', 'showInfo']),
    onTabChange(event) {
      this.selectTab(event)
      this.showInfo({show: false, text: ''})
    }
  }
}
</script>

<style scoped>

</style>
