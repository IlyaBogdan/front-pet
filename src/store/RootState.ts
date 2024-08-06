import { SideBarState } from '@/store/sideBar';
import { AuthState } from './authModule';

export interface RootState {
  sideBar: SideBarState;
  auth: AuthState
}