import React from 'react';
import { Bot, Sparkles, Shield, X, MessageSquare } from 'lucide-react';

interface AiFloatingTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  hasUrgentAlert?: boolean;
}

export const AiFloatingTrigger: React.FC<AiFloatingTriggerProps> = ({
  isOpen,
  onToggle,
  hasUrgentAlert = true,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2" id="ai-floating-trigger-container">
      {/* Tooltip callout when not open */}
      {!isOpen && (
        <div
          onClick={onToggle}
          className="bg-white text-slate-900 border border-slate-300 shadow-lg px-3 py-1.5 rounded-sm text-xs font-semibold flex items-center gap-2 cursor-pointer hover:border-[#002D62] transition-all animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span>Need Emergency Help? Ask <strong>Apna Mitr AI</strong></span>
        </div>
      )}

      {/* Primary Floating Action Button */}
      <button
        onClick={onToggle}
        className={`group flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-900 text-white'
            : 'bg-[#002D62] hover:bg-[#003d82] text-white border-2 border-amber-400/80 shadow-blue-900/30'
        }`}
        id="ai-agent-floating-btn"
        aria-label="Open 24x7 Disaster Emergency AI Assistant"
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <>
              <Bot className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#002D62]"></span>
            </>
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="leading-tight text-[11px] font-bold tracking-wide">
            {isOpen ? 'Close Assistant' : 'Apna Mitr AI'}
          </span>
          {!isOpen && (
            <span className="text-[9px] text-amber-300 font-mono leading-none">
              24x7 Disaster Help
            </span>
          )}
        </div>
      </button>
    </div>
  );
};
