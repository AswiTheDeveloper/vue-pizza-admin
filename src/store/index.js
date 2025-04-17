import Vue from 'vue';
import Vuex from 'vuex';
import { getOrders } from '@/mock-api/orders';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        orders: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        updateOrderStatus(state, { orderId, newStatus }) {
            const order = state.orders.find(order => order.orderId === orderId);
            if (order) {
                order.orderStatus = newStatus;
            }
        },
    },
    actions: {
        login({ commit }, { username, password }) {
            if (username === 'demo' && password === 'demo123') {
                commit('setUser', { username });
                return true;
            } else {
                return false;
            }
        },
        fetchOrders({ commit }) {
            try {
                const orders = getOrders();
                commit('setOrders', orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        updateOrderStatus({ commit }, { orderId, newStatus }) {
            commit('updateOrderStatus', { orderId, newStatus });
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,

    },
});
