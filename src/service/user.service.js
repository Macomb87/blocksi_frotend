import axios from "axios";
// import store from "@/store";

export default {

    async register(payload) {
        try {
            const result = await axios.post('http://localhost:3000/users/register', payload);
            return result;
        } catch (err) {
            return {err: err};
        }
    },
    async login(email, password) {
        try {
            const result = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password
            });
            return result.data;
        } catch (err) {
            return {err: err};
        }
    },
    async findAllContacts(ownerId) {
        try {
            const list = await axios.get(`http://localhost:3000/contact-list/owner/${ownerId}`);
            return list.data;
        } catch (err) {
            return err;
        }
    },
    async addNewContact(newContact) {
        try {
            const list = await axios.post(`http://localhost:3000/contact-list`, newContact);
            return list.data;
        } catch (err) {
            return err;
        }
    },

    async updateContact(contact) {
        try {
            const list = await axios.patch(`http://localhost:3000/contact-list/${contact.id}`, contact);
            return list.data;
        } catch (err) {
            return err;
        }
    },

    async deleteContact(id) {
        try {
            const list = await axios.delete(`http://localhost:3000/contact-list/${id}`);
            return list.data;
        } catch (err) {
            return err;
        }
    }


}
