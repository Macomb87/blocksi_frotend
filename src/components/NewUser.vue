<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-alert type="warning" v-if="showInfo">
          {{ infoText }}
        </v-alert>
        <v-col cols="12" sm="6" md="6">
          <v-text-field name="firstName" v-model="userEditor.firstName" :rules="[rules.required]" label="First Name"
                        maxlength="20"
                        required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field name="lastName" v-model="userEditor.lastName" :rules="[rules.required]" label="Last Name"
                        maxlength="20"
                        required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="12">
          <v-text-field name="age" v-model="userEditor.age" :rules="[rules.required]" label="Age" maxlength="20"
                        required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="12">
          <v-text-field name="phone" v-model="userEditor.phone" :rules="[rules.required]" label="Phone" maxlength="20"
                        required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field name="email" v-model="userEditor.email" :rules="emailRules" label="E-mail"
                        required></v-text-field>
        </v-col>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">
        Cancel
      </v-btn>
      <v-btn color="blue darken-1" text @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {emailRules, rules} from '@/shared/validationRules'
import {mapGetters} from "vuex";

export default {
  props: ['user'],
  name: "NewUserComponent",
  computed: {
    ...mapGetters("userManipulation", ["editableContact"]),
    formTitle() {
      return this.user ? 'Edit User' : 'New User'
    },
    userEditor() {
      return {...this.user}
    }
  },
  data() {
    return {

      showInfo: false,
      infoText: '',
      emailRules: emailRules,
      rules: rules
    }
  },
  methods: {
    close() {

    },
    save() {

    }
  },
  mounted() {


  }
}
</script>

<style scoped>

</style>
