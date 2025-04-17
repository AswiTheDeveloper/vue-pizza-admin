import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from '@/views/LoginPage.vue';
import Dashboard from '@/views/DashboardPage.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginForm,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '*',
        name: 'not-found',
        beforeEnter: (to, from, next) => {
            alert('Page not found. Redirecting to login.');
            next('/');
        }
    }
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;  // Use the store directly

    if (to.name === 'login' && isAuthenticated) {
        next('/dashboard');
    }
    else if (to.name === 'dashboard' && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
