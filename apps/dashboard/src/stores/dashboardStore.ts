import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'presentation';

interface DashboardStore {
  // State
  theme: Theme;
  isLivePaused: boolean;
  liveElapsed: number; // seconds
  selectedAgent: string;
  timeRange: string;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleLive: () => void;
  pauseLive: () => void;
  resumeLive: () => void;
  setLiveElapsed: (elapsed: number) => void;
  incrementLiveElapsed: () => void;
  setAgent: (agent: string) => void;
  setTimeRange: (range: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      // Initial State
      theme: 'dark',
      isLivePaused: false,
      liveElapsed: 0,
      selectedAgent: 'whatap-test-45-105-node',
      timeRange: 'Default',

      // Actions
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
      },

      toggleLive: () =>
        set((state) => ({
          isLivePaused: !state.isLivePaused,
        })),

      pauseLive: () =>
        set({
          isLivePaused: true,
        }),

      resumeLive: () =>
        set({
          isLivePaused: false,
        }),

      setLiveElapsed: (elapsed) =>
        set({
          liveElapsed: elapsed,
        }),

      incrementLiveElapsed: () =>
        set((state) => ({
          liveElapsed: state.liveElapsed + 1,
        })),

      setAgent: (agent) =>
        set({
          selectedAgent: agent,
        }),

      setTimeRange: (range) =>
        set({
          timeRange: range,
        }),
    }),
    {
      name: 'whatap-dashboard-storage',
      partialize: (state) => ({
        theme: state.theme,
        selectedAgent: state.selectedAgent,
        timeRange: state.timeRange,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const savedTheme = useDashboardStore.getState().theme;
  document.documentElement.setAttribute('data-theme', savedTheme);
}
