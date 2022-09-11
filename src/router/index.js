import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            auth: true,
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!store.getters["userManipulation/token"]) {
            console.log('no user');
            next({
                name: 'Auth'
            })
        }else{
            next();
        }
    } else {
        next();
    }
});

export default router
