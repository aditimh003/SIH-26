import React, { useState, useEffect } from 'react';
import { HistoricalReplayFrame } from '../../types';
import { HISTORICAL_REPLAY_FRAMES } from '../../data/mockData';
import {
  History,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Activity,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const HistoricalReplayTab: React.FC = () => {
  const frames = HISTORICAL_REPLAY_FRAMES;
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setFrameIndex((prev) => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, frames.length]);

  const currentFrame = frames[frameIndex];

  return (
    <div className="space-y-6" id="historical-replay-tab">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 07 &bull; FORENSIC TIME-MACHINE
            </span>
            <span className="text-xs text-slate-500 font-medium">Post-Disaster Audit & Model Validation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Historical Supercell Cloudburst & Mass Failure Forensic Replay
          </h2>
          <p className="text-xs text-slate-600">
            Case Study: Aizawl NH-54 Corridor Supercell Event (378mm cumulative rainfall) &ndash; Validating AI early warning lead time against physical rupture timeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFrameIndex(0);
              setIsPlaying(true);
            }}
            className="px-3.5 py-2 bg-[#002D62] hover:bg-[#003d82] text-white rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay From Start</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Scrubber Timeline Ribbon */}
      <div className="bg-[#001D40] text-white p-6 rounded-sm border border-slate-800 shadow-inner space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide">Forensic Timeline Scrubber</span>
            <span className="px-2 py-0.5 bg-[#002D62] text-amber-300 font-mono text-xs rounded-sm border border-slate-600">
              {currentFrame.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-sm text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Replay' : 'Play Timeline'}</span>
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={frames.length - 1}
            value={frameIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setFrameIndex(Number(e.target.value));
            }}
            className="w-full h-2.5 bg-slate-700 rounded-sm appearance-none cursor-pointer accent-amber-400"
          />

          <div className="grid grid-cols-5 text-center text-[10px] font-mono text-slate-300">
            {frames.map((f, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsPlaying(false);
                  setFrameIndex(i);
                }}
                className={`py-1 rounded-sm text-center transition-colors cursor-pointer ${
                  frameIndex === i
                    ? 'text-amber-400 font-bold bg-[#002D62] border border-slate-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.hourLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Replay Phase Display Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Synchronized Telemetry Multi-Stat Visualizer */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  currentFrame.severity === 'CRITICAL'
                    ? 'bg-red-700 text-white'
                    : currentFrame.severity === 'HIGH'
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {currentFrame.severity} PHASE
              </span>
              <h3 className="text-sm font-bold text-slate-900">{currentFrame.phaseTitle}</h3>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-500">
              Frame {frameIndex + 1} of {frames.length}
            </span>
          </div>

          {/* Metric Telemetry 4-Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Rainfall Rate</span>
              <span className="text-xl font-bold text-[#002D62] font-mono">
                {currentFrame.rainfallMmHr} <span className="text-xs">mm/h</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                24h: {currentFrame.cumulativeRainfall24h} mm
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Soil Moisture</span>
              <span className="text-xl font-bold text-indigo-900 font-mono">
                {currentFrame.soilMoisturePct}%
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">TDR Saturated</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Pore Overpressure</span>
              <span className="text-xl font-bold text-amber-900 font-mono">
                {currentFrame.porePressureKpa} <span className="text-xs">kPa</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Critical: 145 kPa</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Extensometer Slip</span>
              <span className="text-xl font-bold text-red-700 font-mono">
                {currentFrame.slopeDisplacementMm} <span className="text-xs">mm</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Creep Velocity</span>
            </div>
          </div>

          {/* Detailed Event Narrative */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2 text-xs">
            <span className="font-bold text-slate-900 text-xs block uppercase tracking-wider">
              Forensic Physical Dynamics & Sensor Observation:
            </span>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              {currentFrame.eventDescription}
            </p>
          </div>
        </div>

        {/* Right 1 Col: Early Warning & Evacuation Lead-Time Audit */}
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              Statutory Warning Audit
            </h3>
          </div>

          <div className="p-3.5 bg-amber-50 border-l-4 border-l-amber-500 border border-amber-300 rounded-sm space-y-2 text-xs">
            <span className="font-bold text-amber-950 text-xs block uppercase">
              Advisory Issued at this Timestamp:
            </span>
            <p className="text-slate-900 font-medium leading-relaxed font-mono text-[11px]">
              {currentFrame.advisoryIssued}
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 border-l-4 border-l-emerald-600 border border-emerald-300 rounded-sm space-y-1.5 text-xs text-emerald-950">
            <span className="font-bold flex items-center gap-1 text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              AI Lead-Time Validation Result
            </span>
            <p className="text-[11px] leading-relaxed">
              NER-SHIELD issued the mandatory Red Alert pre-emptive evacuation directive <strong>72 minutes</strong> prior to the catastrophic physical slope collapse, permitting 100% successful evacuation of all 42 households.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
