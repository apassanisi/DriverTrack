import { defineStore } from 'pinia';
import type { User, Profile } from '../types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    setUser(newUser: User) {
      this.user = newUser;
    },
    setProfile(newProfile: Profile) {
      this.profile = newProfile;
    },
    clearUserData() {
      this.user = null;
      this.profile = null;
    },
  },
  persist: true,
});
