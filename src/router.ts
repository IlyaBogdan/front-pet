import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/home/Home.vue';
import PersonalCabinet from '@/pages/personal/PersonalCabinet.vue';
import SignIn from '@/pages/sign-in/SignIn.vue';
import SignUp from '@/pages/sign-up/SignUp.vue';

import Chat from '@/pages/chat/Chat.vue';
import Dialog from '@/pages/chat/Dialog.vue';

import Users from '@/pages/users/Users.vue';
import UserPage from '@/pages/users/UserPage.vue';

import NotFound from '@/pages/NotFoundPage.vue';

const routes = [
  
  { path: '/', component: Home, name: 'home' },
  { path: '/sign-in', component: SignIn, name: 'sing-in' },
  { path: '/sign-up', component: SignUp, name: 'sign-up' },

  { path: '/personal', component: PersonalCabinet, name: 'personal' },
  { path: '/messanger', component: Chat, name: 'messanger' },
  { path: '/dialog', component: Dialog, name: 'dialog' },
  { path: '/users', component: Users, name: 'users'},
  { path: '/users/:id', component: UserPage, name: 'user-page' },

  { path: "/:pathMatch(.*)*", component: NotFound, name: '404' }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})