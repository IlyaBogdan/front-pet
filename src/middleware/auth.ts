import { RouteRecordRaw } from "vue-router";

export const auth = (route: RouteRecordRaw): boolean => {
    const authenticated = localStorage.getItem('apiToken');

    if (!authenticated) {
        window.location.href = 'sign-in';
    }

    return true;
}