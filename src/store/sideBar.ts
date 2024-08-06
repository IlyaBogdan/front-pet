import { Module } from 'vuex';
import { RootState } from './RootState';

export interface SideBarState {
    opened: boolean;
}

export const sideBar: Module<SideBarState, RootState> = {
  state: () => ({
    opened: localStorage.getItem('sidebar.opened') === "true"
  }),
  mutations: {
    setOpened(state, value: boolean) {
      state.opened = value;
      localStorage.setItem('sidebar.opened', value.toString());
    }
  }
};