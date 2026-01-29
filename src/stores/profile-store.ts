'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProfileData } from '@/lib/github-service';

interface ProfileState {
  username: string;
  profileData: UserProfileData | null;
  isLoading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  fetchProfile: (username: string) => Promise<UserProfileData | null>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      username: '',
      profileData: null,
      isLoading: false,
      error: null,

      setUsername: (username: string) => set({ username }),

      fetchProfile: async (username: string) => {
        const trimmed = username.trim();
        if (!trimmed) return null;

        set({ isLoading: true, error: null, username: trimmed });

        try {
          const res = await fetch(`/api/user/scan/${encodeURIComponent(trimmed)}`);
          const json = await res.json();

          if (!res.ok || !json.success) {
            throw new Error(json.error || 'Failed to fetch GitHub profile');
          }

          set({ profileData: json.data, isLoading: false, error: null });
          return json.data as UserProfileData;
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : 'An error occurred while fetching GitHub data';
          set({
            error: errMsg,
            isLoading: false,
          });
          return null;
        }
      },

      clearProfile: () => set({ profileData: null, error: null, username: '' }),
    }),
    {
      name: 'synthetixgit-profile-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        username: state.username,
        profileData: state.profileData,
      }),
    }
  )
);
