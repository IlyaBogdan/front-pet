
import { Module } from 'vuex';
import { RootState } from './RootState';

export interface AuthState {
    authenticated: boolean;
    user: any
}

export const authModule: Module<AuthState, RootState> = {
    state: () => ({
        authenticated: !!localStorage.getItem('apiToken'),
        user: JSON.parse(localStorage.getItem('user')!)
    }),
    mutations: {
        setAuthUser(state, value) {
            state.user = value;
            localStorage.setItem('user', JSON.stringify(value));
        }
    }
};
