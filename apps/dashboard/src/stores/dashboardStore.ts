import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface DashboardStore {
  // State
  theme: Theme;
  isLivePaused: boolean;
  liveElapsed: number; // seconds
  selectedAgent: string;
  timeRange: string;
  isSidebarCollapsed: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleLive: () => void;
  pauseLive: () => void;
  resumeLive: () => void;
  setLiveElapsed: (elapsed: number) => void;
  incrementLiveElapsed: () => void;
  setAgent: (agent: string) => void;
  setTimeRange: (range: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
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
      isSidebarCollapsed: false,

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

      toggleSidebar: () =>
        set((state) => ({
          isSidebarCollapsed: !state.isSidebarCollapsed,
        })),

      setSidebarCollapsed: (collapsed) =>
        set({
          isSidebarCollapsed: collapsed,
        }),
    }),
    {
      name: 'whatap-dashboard-storage',
      partialize: (state) => ({
        theme: state.theme,
        selectedAgent: state.selectedAgent,
        timeRange: state.timeRange,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const savedTheme = useDashboardStore.getState().theme;
  document.documentElement.setAttribute('data-theme', savedTheme);
}
