// Vuex 때 처럼 create* 함수를 제공한다.
import { createWebHistory, createRouter } from 'vue-router';
import card from '../components/testCard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/testHome'), // 동적 import
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/testLogin'),
  },
    {
    path: '/board',
    name: 'board',
    component: () => import('@/components/testBoard'), 
    children: [
        {
            path:'c/:cid' , component:card
        }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});