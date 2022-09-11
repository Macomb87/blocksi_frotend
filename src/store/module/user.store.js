import userService from "@/service/user.service";

const state = {
    user: {},
    users: [],
    token: null,
    editUser: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: 0
    },
    tab: 0,
    info: {
        color: '',
        show: false,
        text: '',
        type: ''
    },
    showInfo: false,
    tabNumber: 0,
};
const getters = {
    user: state => state.user,
    token: state => state.token,
    userList: state => state.users,
    tabNumber: state => state.tabNumber,
    editableContact: state => state.editUser
};
const actions = {
    async setEditableContact({commit}, editableContact) {
        const editedContact = await userService.updateContact(editableContact);
        console.log(editedContact);
        if (!editedContact.code) {
            commit("EDIT_CONTACT", editedContact);
        }
    },
    async addUserToList({commit}, contactData) {
        const newContactData = {...contactData, owner: state.user.id};
        const newContact = await userService.addNewContact(newContactData);
        if (!newContact.code) {
            commit('ADD_USER_TO_LIST', newContact);
        }

    },
    async removeContactFromList({commit}, contactId) {
        const result = await userService.deleteContact(contactId)
        if (result && result.affected === 1) {
            commit("REMOVE_USER", contactId)
            return contactId;
        }
        return null;
    },
    setUser({commit}, userData) {
        commit("SET_USER", userData);
    },
    setToken({commit}, token) {
        commit('SET_TOKEN', token);
    },
    getAllUserById({state}, userId) {
        return state.users.find(user => user.id === userId);
    },
    updateUSer({commit}, userData) {

        commit("UPDATE_USER", userData);
    },
    async getContactList({state}) {
        state.users = await userService.findAllContacts(state.user.id)
        return state.users;
    },
    async login({state}, payload) {
        const data = await userService.login(payload.email, payload.password);
        state.token = data?.access_token;
        state.user = data?.user;
        return data;
    },

    async register({state}, payload) {
        const data = await userService.register(payload);
        state.user = data.err ? {} : data;
        if (data.err) {
            return {
                err: data.err
            }
        } else {
            return {
                user: data
            }
        }
    },
    showInfo({commit}, payload) {
        commit("SHOW_INFO_MESSAGE", payload);
    },
    selectTab({commit}, tabNumber) {
        commit("SELECTED_TAB", tabNumber)
    }


};
const mutations = {
    SELECTED_TAB: (state, data) => state.tabNumber = data,
    SHOW_INFO_MESSAGE: (state, data) => state.info = data,
    SET_USER: (state, userData) => state.user = userData,
    SET_TOKEN: (state, token) => state.token = token,
    UPDATE_USER: (state, userData) => state.user = userData,
    REMOVE_USER: (state, userId) => {
        state.users.filter(user => user.id === userId)
    },
    EDIT_CONTACT: (state, data) =>  {
        console.log(data);
        state.users.forEach( (user,index) =>{
            if(user.id === data.id){
                state.users[index] = data;
            }
        })
    },
    ADD_USER_TO_LIST: (state, userData) => state.users.push(userData),
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
