import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import PersonalCabinet from '@personal/pages/personal/PersonalCabinet.vue';
import SignIn from '@auth/pages/sign-in/SignIn.vue';
import SignUp from '@auth/pages/sign-up/SignUp.vue';

import Chat from '@chat/pages/chat/Chat.vue';
import Dialog from '@chat/pages/chat/Dialog.vue';

import Home from '@home/pages/home/Home.vue';
import Users from '@home/pages/users/Users.vue';
import UserPage from '@home/pages/users/UserPage.vue';

import NotFound from '@/pages/NotFoundPage.vue';

import { auth } from './middleware/auth';

type RouteState = RouteRecordRaw & {
  middleware?: ((route: RouteRecordRaw) => boolean)[]
};

const routes: RouteState[] = [
  
  { path: '/', component: Home, name: 'home' },
  { path: '/sign-in', component: SignIn, name: 'sing-in' },
  { path: '/sign-up', component: SignUp, name: 'sign-up' },

  { path: '/personal', component: PersonalCabinet, name: 'personal', middleware: [auth] },
  { path: '/messanger', component: Chat, name: 'messanger', middleware: [auth] },
  { path: '/dialog', component: Dialog, name: 'dialog', middleware: [auth] },
  { path: '/users', component: Users, name: 'users', middleware: [auth] },
  { path: '/users/:id', component: UserPage, name: 'user-page' },

  { path: "/:pathMatch(.*)*", component: NotFound, name: '404' }
];

const canAccess = (route: any): boolean => {
  const rawRoute = routes.filter((rawRouteValue) => rawRouteValue.name === route.name)[0];
  if (rawRoute.middleware?.length) {
    for (const middleware of rawRoute.middleware) {
      if (!middleware(route)) {
        return false;
      }
    }
  }

  return true;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  if(canAccess(to)) next();
});

export { router }