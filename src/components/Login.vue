<template>
  <div>
    <v-card class="px-4">
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field name="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  name="password"
                  v-model="password"
                  :append-icon="showPassword?'mdi-eye':'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showPassword = !showPassword"></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" xsm="12">
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
              <v-btn x-large block :disabled="!valid" color="primary" @click="submit"> Login</v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginComponent",
  data: () => ({
    showSnackBar: false,
    valid: false,
    firstname: '',
    lastname: '',
    password: '',
    showPassword: false,
    passwordRules: [
      v => !!v || 'Name is required',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
  computed: {
    ...mapGetters('userManipulation', ['tabNumber']),
  },
  watch: {
    tabNumber() {
      this.$refs.loginForm.reset();
    }
  },
  methods: {
    ...mapActions('userManipulation', ['login', 'showInfo']),
    async submit() {
      const result = await this.login({email: this.email, password: this.password});
      if (!result.err && result.access_token) {
        this.showInfo({show: false, type:'', text: ''});
        await this.$router.push('/')
      } else {
        if(result.err){
          this.showInfo({show: true, type:'warning', text: 'Check your credentials'});
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
