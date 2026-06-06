import { useEffect } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';

export function useLiveTimer() {
  const { isLivePaused, liveElapsed, incrementLiveElapsed, pauseLive, resumeLive } =
    useDashboardStore();

  useEffect(() => {
    if (isLivePaused) return;

    const interval = setInterval(() => {
      incrementLiveElapsed();
    }, 1000);

    return () => clearInterval(interval);
  }, [isLivePaused, incrementLiveElapsed]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggle = () => {
    if (isLivePaused) {
      resumeLive();
    } else {
      pauseLive();
    }
  };

  return {
    elapsed: liveElapsed,
    isPaused: isLivePaused,
    formattedTime: formatTime(liveElapsed),
    toggle,
    pause: pauseLive,
    resume: resumeLive,
  };
}
