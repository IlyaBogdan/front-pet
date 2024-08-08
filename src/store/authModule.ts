
import { Module } from 'vuex';
import { RootState } from './RootState';
import { IUser } from '@/models/IUser';

export interface AuthState {
    authenticated: boolean;
    user: IUser
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
