import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import HomePage from './components/HomePage.vue'; // Optional: A home page after login
import RegisterPage from "@/components/RegisterPage.vue";
import WantedPersonDetail from "@/components/WantedPersonalDetail.vue";
import { useUserStore } from '@/stores/user';

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true }
    },


    {
        path: '/login',
        name:'login',
        component: LoginPage,
    },

    {
        path: '/register',
        name:'register',
        component: RegisterPage,
    },
    {
        path: '/wanted/:uid',
        name: 'WantedPersonDetail',
        component: WantedPersonDetail,
        props: true,
        meta: { requiresAuth: true}
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useUserStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
    });
export default router;
