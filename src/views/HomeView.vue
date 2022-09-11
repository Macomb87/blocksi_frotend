<template>
  <default-layout>
    <v-card>
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="userList"
          class="elevation-1"
          :search="search"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>My Contact List</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-alert :type="info.type" v-if="info.show">
                  {{ info.text }}
                </v-alert>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-text-field
                              v-model="editedItem.firstName"
                              label="First Name"
                              :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-text-field
                              v-model="editedItem.lastName"
                              label="Last Name"
                              :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-text-field
                              v-model="editedItem.age"
                              label="Age"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-text-field
                              v-model="editedItem.phone"
                              label="Phone"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.email"
                              label="E-mail"
                              :rules="emailRules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      :disabled="!valid"
                      @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
              color="primary"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>

    </v-card>
  </default-layout>
</template>

<script>

import DefaultLayout from "@/views/layout/DefaultLayout";
// import {mapActions, mapGetters, mapState} from "vuex";
import {emailRules, rules} from '@/shared/validationRules'
import {mapActions, mapGetters} from "vuex";

export default {
  comments: {
    DefaultLayout
  },
  name: 'HomeView',
  data: () => ({
    valid: false,
    info: {
      show: false,
      text: '',
      type: '',
    },
    defaultInfo: {
      show: false,
      text: '',
      type: '',
    },
    emailRules: emailRules,
    rules: rules,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      {text: 'First name', value: 'firstName'},
      {text: 'Last name', value: 'lastName'},
      {text: 'Age', value: 'age'},
      {text: 'E-mail', value: 'email'},
      {text: 'Phone', value: 'phone'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      age: 0,
      phone: '',
      email: '',
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      age: 0,
      phone: '',
      email: '',
    },
  }),

  computed: {
    ...mapGetters('userManipulation', ['userList']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    ...mapActions('userManipulation', ['getContactList', 'addUserToList', 'setEditableContact', 'removeContactFromList']),

    async initialize() {
      await this.getContactList();
    },

    editItem(item) {
      this.editedIndex = this.userList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.userList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {

      const result = await this.removeContactFromList(this.userList[this.editedIndex].id);
      if (result) {
        this.userList.splice(this.editedIndex, 1)
      }
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.info = {...this.defaultInfo}
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        const result = await this.setEditableContact(this.editedItem)
        if (result) {
          Object.assign(this.userList[this.editedIndex], result)
          this.close()
        } else {

          this.info =
              {
                show: true,
                type: 'error',
                text: ' Ups something vent wrong !'

              }
        }

      } else {
        const result = await this.addUserToList(this.editedItem);
        if (!result) {
          this.info =
              {
                show: true,
                type: 'error',
                text: ' Ups something vent wrong !'

              }
        } else {
          this.close()
        }
      }

    },
  },


}
</script>
