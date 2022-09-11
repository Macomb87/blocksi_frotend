import Vue from 'vue'
import Vuex from 'vuex'
import userStore from "@/store/module/user.store";

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        'userManipulation': userStore
    }
})
