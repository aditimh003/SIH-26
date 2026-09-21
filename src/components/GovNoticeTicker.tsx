import React, { useState } from 'react';
import { AlertCircle, Pause, Play, Bell, Volume2, ShieldAlert } from 'lucide-react';

interface TickerProps {
  urgentAlertText: string;
  onSelectAlertsTab: () => void;
}

export const GovNoticeTicker: React.FC<TickerProps> = ({
  urgentAlertText,
  onSelectAlertsTab,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const playSirenChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Audio context might be restricted before user interaction
    }
  };

  return (
    <div
      className="bg-red-800 text-white px-4 py-2 flex items-center justify-between gap-3 text-xs border-y border-red-900 shadow-inner overflow-hidden"
      id="emergency-broadcast-ticker"
    >
      <div className="flex items-center gap-2 font-black uppercase tracking-wider flex-shrink-0 bg-red-950/80 px-2.5 py-1 rounded border border-red-700">
        <ShieldAlert className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="text-amber-300">STATUTORY FLASH BULLETIN:</span>
      </div>

      {/* Marquee Text Container */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`whitespace-nowrap font-medium tracking-wide ${
            isPaused ? '' : 'animate-marquee'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="inline-block mr-8">
            &bull; {urgentAlertText}
          </span>
          <span className="inline-block mr-8 text-amber-200">
            &bull; [CAP-ID: 2026-0908-MZ-RED] Order under Disaster Management Act Sec 34 in effect. Pre-emptive evacuation in progress.
          </span>
          <span className="inline-block mr-8 text-white">
            &bull; Safe Route B-1 (Durtlang-Selesih Ridge Bypass) is fully open for emergency vehicular transit.
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={playSirenChime}
          className="p-1 rounded bg-red-900 hover:bg-red-950 text-red-200 hover:text-white border border-red-700 cursor-pointer"
          title="Test Alert Chime"
          id="ticker-sound-test"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 rounded bg-red-900 hover:bg-red-950 text-red-200 hover:text-white border border-red-700 cursor-pointer"
          title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
          id="ticker-pause-play"
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={onSelectAlertsTab}
          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] rounded transition-colors cursor-pointer"
          id="ticker-view-all-alerts"
        >
          View All Warnings &rarr;
        </button>
      </div>
    </div>
  );
};
