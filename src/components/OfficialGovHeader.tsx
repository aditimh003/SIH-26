import React, { useState } from 'react';
import {
  Shield,
  Lock,
  ChevronDown,
  ChevronUp,
  Globe,
  PhoneCall,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Bot,
} from 'lucide-react';

interface HeaderProps {
  fontSizeLevel: number;
  setFontSizeLevel: (fn: (prev: number) => number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onOpenSitRep: () => void;
  onOpenAiAgent?: () => void;
  activeRedAlertsCount: number;
}

export const OfficialGovHeader: React.FC<HeaderProps> = ({
  fontSizeLevel,
  setFontSizeLevel,
  highContrast,
  setHighContrast,
  language,
  setLanguage,
  onOpenSitRep,
  onOpenAiAgent,
  activeRedAlertsCount,
}) => {
  const [showTrustDrawer, setShowTrustDrawer] = useState(false);
  const [isReadingAudio, setIsReadingAudio] = useState(false);

  const toggleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isReadingAudio) {
        window.speechSynthesis.cancel();
        setIsReadingAudio(false);
      } else {
        const text =
          'NER-SHIELD National Landslide and Disaster Early Warning Intelligence Portal. Ministry of Earth Sciences and National Disaster Management Authority. Real-time monitoring active with ' +
          activeRedAlertsCount +
          ' critical red alerts.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = () => setIsReadingAudio(false);
        utterance.onerror = () => setIsReadingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsReadingAudio(true);
      }
    }
  };

  return (
    <header className="w-full bg-[#002D62] text-white flex-none sticky top-0 z-40 shadow-sm" id="official-header">
      {/* 1. National Tricolor Accent Ribbon */}
      <div className="h-1.5 w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Official Government Top Trust Bar */}
      <div className="bg-[#001D40] text-slate-200 text-[10px] uppercase tracking-widest px-6 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-[#00142d]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-4 h-3 bg-slate-800 border border-slate-600 rounded-2xs overflow-hidden flex-shrink-0">
              <span className="block h-1 bg-[#FF9933]"></span>
              <span className="block h-1 bg-white"></span>
              <span className="block h-1 bg-[#138808]"></span>
            </span>
            <span>Official Portal of National Disaster Management Bureau</span>
          </div>
          <span className="opacity-50 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline font-mono">Security Tier: Tier 2 Authorized</span>
          <span className="opacity-50 hidden md:inline">|</span>
          <button
            onClick={() => setShowTrustDrawer(!showTrustDrawer)}
            className="text-slate-300 hover:text-white underline decoration-dotted flex items-center gap-1 cursor-pointer lowercase first-letter:uppercase"
            id="trust-drawer-toggle"
            aria-expanded={showTrustDrawer}
          >
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Here's how you know</span>
            {showTrustDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3 ml-auto opacity-95">
          {/* Text Size Accessibility Controls */}
          <div className="flex items-center bg-[#00142d] rounded-sm px-2 py-0.5 border border-slate-700" title="Text Size Adjust">
            <span className="text-[10px] text-slate-400 mr-1.5 hidden sm:inline font-mono">Font:</span>
            <button
              onClick={() => setFontSizeLevel((p) => Math.max(-1, p - 1))}
              className={`px-1 text-[11px] font-bold hover:text-white ${fontSizeLevel === -1 ? 'text-amber-400 font-extrabold' : 'text-slate-300'}`}
              title="Decrease Font Size"
              id="font-decrease"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(() => 0)}
              className={`px-1 text-[11px] font-bold hover:text-white ${fontSizeLevel === 0 ? 'text-amber-400 font-extrabold' : 'text-slate-300'}`}
              title="Standard Font Size"
              id="font-normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel((p) => Math.min(2, p + 1))}
              className={`px-1 text-[11px] font-bold hover:text-white ${fontSizeLevel >= 1 ? 'text-amber-400 font-extrabold' : 'text-slate-300'}`}
              title="Increase Font Size"
              id="font-increase"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast((p) => !p)}
            className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider border flex items-center gap-1 cursor-pointer ${
              highContrast ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-[#00142d] text-slate-200 border-slate-700 hover:text-white'
            }`}
            title="Toggle High-Contrast Accessibility Mode"
            id="high-contrast-toggle"
          >
            <span className="w-2 h-2 rounded-full border border-current bg-transparent"></span>
            <span className="hidden sm:inline">Contrast</span>
          </button>

          {/* Screen Reader Audio TTS */}
          <button
            onClick={toggleTextToSpeech}
            className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider border flex items-center gap-1 cursor-pointer ${
              isReadingAudio ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse' : 'bg-[#00142d] text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Read Summary Aloud"
            id="tts-toggle"
          >
            {isReadingAudio ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            <span className="hidden md:inline">{isReadingAudio ? 'Stop' : 'Audio'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-[#00142d] rounded-sm px-1.5 py-0.5 border border-slate-700">
            <Globe className="w-3 h-3 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-[10px] font-medium border-none focus:outline-hidden cursor-pointer"
              id="language-select"
            >
              <option value="en" className="bg-[#001D40] text-white">English</option>
              <option value="hi" className="bg-[#001D40] text-white">हिन्दी (Hindi)</option>
              <option value="mz" className="bg-[#001D40] text-white">Mizo (Mizoram)</option>
              <option value="as" className="bg-[#001D40] text-white">অসমীয়া (Assamese)</option>
              <option value="bn" className="bg-[#001D40] text-white">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Trust Verification Drawer */}
      {showTrustDrawer && (
        <div className="bg-[#00142d] text-slate-200 px-6 sm:px-8 py-4 border-b border-slate-700 text-xs shadow-inner animate-in fade-in duration-200" id="trust-drawer">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-[#001f44] p-3 rounded-sm border border-slate-700">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-100">Official National Domain & Government Infrastructure</p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  This service is hosted on secure Government Cloud infrastructure managed by the National Informatics Centre (NIC), Ministry of Electronics & IT (MeitY).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-[#001f44] p-3 rounded-sm border border-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-100">Statutory Authority & Compliance</p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Operating under Section 34 of the Disaster Management Act, 2005. Compliant with GIGW 3.0 (Guidelines for Indian Government Websites) and ISO 27001 Security Standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Main Official Branding Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Emblem & Portal Title */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
            <div className="w-full h-full border-2 border-[#002D62] rounded-full flex items-center justify-center bg-slate-50">
              <Shield className="w-6 h-6 text-[#002D62]" />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none text-white flex items-center gap-2">
              <span>NER-SHIELD</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#001D40] text-amber-300 border border-slate-600 rounded-sm font-bold uppercase tracking-wider">
                Gov-Portal v4.2
              </span>
            </h1>
            <p className="text-xs opacity-85 uppercase tracking-wider mt-1 font-medium text-slate-200">
              Department of Disaster Early Warning & Digital Risk Compliance
            </p>
          </div>
        </div>

        {/* Official Quick Action Buttons */}
        <div className="flex items-center space-x-2.5 ml-auto">
          {/* AI Disaster Assistant Trigger */}
          {onOpenAiAgent && (
            <button
              onClick={onOpenAiAgent}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-sm transition-colors shadow-sm cursor-pointer border border-amber-300"
              id="header-ai-agent-button"
            >
              <Bot className="w-3.5 h-3.5 text-slate-900" />
              <span>Apna Mitr AI</span>
            </button>
          )}

          {/* Situation Report Trigger */}
          <button
            onClick={onOpenSitRep}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-sm font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            id="view-sitrep-button"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Official Gazette</span> SitRep
          </button>

          {/* Emergency Helpline Direct Button */}
          <a
            href="tel:1070"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold text-xs shadow-sm transition-colors cursor-pointer border border-red-500"
            id="emergency-call-button"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
            <span>Emergency 1070 / 112</span>
          </a>
        </div>
      </div>
    </header>
  );
};
