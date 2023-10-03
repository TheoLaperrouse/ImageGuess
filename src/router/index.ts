import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import GamePage from '../views/GamePage.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: HomePage },
    { path: '/game', component: GamePage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
