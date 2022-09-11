<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field name="firstName" v-model="firstName" :rules="[rules.required]" label="First Name"
                          maxlength="20"
                          required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field name="lastName" v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20"
                          required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field name="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field name="password" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]" :type="showPassword ? 'text' : 'password'"
                          label="Password" hint="At least 8 characters" counter
                          @click:append="showPassword = !showPassword"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field block v-model="verify" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]" :type="showPassword ? 'text' : 'password'"
                          name="input-10-1" label="Confirm Password" counter
                          @click:append="showPassword = !showPassword"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn x-large block :disabled="!valid" color="primary" @click="submit">Register</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RegisterComponent",
  data() {
    return {
      verify: "",
      valid: true,
      showPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      },
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
    }
  },
  computed: {
    ...mapGetters('userManipulation', ['tabNumber']),
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  watch: {
    tabNumber() {
      this.$refs.registerForm.reset();
    }
  },
  methods: {
    ...mapActions('userManipulation', ['register', 'selectTab', 'showInfo']),
    async submit() {
      const result = await this.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })

      if (!result.err && result.user) {
        this.showInfo({
          show: true,
          color: 'green',
          type: 'success',
          text: `User created`
        });
        this.selectTab(0);
      } else {
        if (result.err) {
          this.showInfo({show: true, type: 'warning', text: 'Ups something went wrong'});
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
