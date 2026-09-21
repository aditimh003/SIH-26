import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Bot,
  Send,
  PhoneCall,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  MapPin,
  AlertTriangle,
  LifeBuoy,
  Sparkles,
  Shield,
  Clock,
  Compass,
} from 'lucide-react';
import { ChatMessage, HazardZone } from '../types';

interface AiDisasterAgentProps {
  isOpen: boolean;
  onClose: () => void;
  isFloating?: boolean;
  currentZone?: HazardZone;
  onNavigateTab?: (tab: string) => void;
}

const PRESET_QUESTIONS = [
  {
    label: '🚨 Immediate Landslide Survival Rules',
    query: 'What should I do right now if a landslide or mudflow occurs near my house?',
  },
  {
    label: '🛣️ NH-54 Aizawl Highway Status',
    query: 'Is NH-54 between Aizawl and Lunglei open or blocked by landslide debris?',
  },
  {
    label: '🏕️ Emergency Relief Shelters',
    query: 'Where are the active emergency relief shelters and camps in Aizawl and East Jaintia Hills?',
  },
  {
    label: '📞 24x7 Statutory Helplines',
    query: 'Give me all official 24x7 emergency helpline numbers for disaster relief in the Northeast.',
  },
  {
    label: '⚠️ Slope Failure Signs to Look For',
    query: 'What are the early warning signs that a hillside or slope is about to collapse?',
  },
  {
    label: '📝 How to Report a Ground Crack',
    query: 'I noticed a large crack on the hillside. How should I report it and what precautions should my village take?',
  },
];

export const AiDisasterAgent: React.FC<AiDisasterAgentProps> = ({
  isOpen,
  onClose,
  isFloating = true,
  currentZone,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `**Namaste! I am "NER-SHIELD Apna Mitr" (अपना मित्र)**, the official 24x7 AI Disaster Emergency & Landslide Assistance Agent for the National Disaster Management Authority (NDMA) and Geological Survey of India (GSI).\n\n` +
        `I can immediately assist you with:\n` +
        `• **Immediate Life Safety & Evacuation Protocols** (What to do right now)\n` +
        `• **Road & Highway Status** (e.g. NH-54, NH-10 debris blockages & bypasses)\n` +
        `• **Nearest Relief Shelters** (Ramhlun Stadium, Chite Veng, Lumshnong)\n` +
        `• **24x7 Helplines** (112, 1077 DEOC, 1070 SDMA, NDRF control)\n` +
        `• **Recognizing Critical Warning Signs** (Tension cracks, bulging retaining walls)\n\n` +
        `*Click any quick prompt below or type your emergency query in English, Hindi, Mizo, Assamese, or Bengali.*`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      source: 'NER-SHIELD Disaster Intelligence Desk',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle Text-to-Speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, ',')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Handle Speech Recognition (Microphone)
  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  // Handle GPS location query
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation unavailable');
      return;
    }

    setLocationStatus('Pinpointing coordinates...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
        };
        setUserCoords(coords);
        setLocationStatus(`GPS: ${coords.lat}°N, ${coords.lng}°E`);
      },
      (err) => {
        console.warn('Geolocation denied:', err);
        setLocationStatus('GPS Access Denied (Defaulting to NER Sector)');
      },
      { timeout: 8000 }
    );
  };

  // Copy message text
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Submit Query to Server Gemini API
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-5).map((m) => ({ role: m.role, content: m.content })),
          userLocation: userCoords,
          emergencyContext: currentZone
            ? {
                zoneName: currentZone.name,
                district: currentZone.district,
                state: currentZone.state,
                severity: currentZone.severity,
                riskScore: currentZone.risk,
                porePressure: currentZone.pore_pressure_kpa,
                rainfall: currentZone.rainfall_mm_hr,
              }
            : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response generated. Please dial 112 for urgent assistance.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'NER-SHIELD Statutory Model',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Error communicating with AI agent:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        content:
          `**⚠️ EMERGENCY ADVISORY (Offline Mode Active):**\n\n` +
          `If you are experiencing slope instability or torrential rains, please take immediate safety precautions:\n` +
          `• **Evacuate:** Move to safe high ground away from drainage channels, ravines, and steep slopes.\n` +
          `• **Emergency Help:** Call **112** (National Emergency) or **1077** (District Disaster Control Room).\n` +
          `• **Aizawl Shelter:** Ramhlun North Higher Secondary Indoor Stadium is open for displaced families.\n` +
          `• **Highway Caution:** NH-54 is currently closed between Km 14+200 and Chite Veng. Avoid transit.`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        source: 'NER-SHIELD Emergency Offline Fallback',
        isUrgent: true,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset conversation with Apna Mitr AI Assistant?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content: 'Session refreshed. How can I assist you with disaster safety, route clearance, or relief services?',
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          source: 'NER-SHIELD Apna Mitr',
        },
      ]);
    }
  };

  if (!isOpen) return null;

  const containerClasses = isFloating
    ? isMaximized
      ? 'fixed inset-4 sm:inset-10 z-50 bg-white rounded-sm border border-slate-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150'
      : 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[460px] h-[640px] max-h-[85vh] bg-white rounded-sm border border-slate-300 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200'
    : 'w-full bg-white rounded-sm border border-slate-300 shadow-sm flex flex-col h-[750px] overflow-hidden';

  return (
    <div className={containerClasses} id="ai-disaster-agent-window">
      {/* 1. Header with Statutory Government Identification */}
      <div className="bg-[#002D62] text-white p-3.5 sm:p-4 flex flex-col gap-2.5 border-b border-[#001D40]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/10 rounded-full border border-white/25 flex items-center justify-center p-1.5 shadow-inner">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-wide">
                  Apna Mitr AI
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[9px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  24x7 ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                Official NDMA & GSI Landslide Safety Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-200">
            <button
              onClick={handleClearHistory}
              title="Reset Conversation"
              className="p-1.5 hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {isFloating && (
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? 'Restore Normal Size' : 'Maximize Window'}
                className="p-1.5 hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
              >
                {isMaximized ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              title="Close Assistant"
              className="p-1.5 hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rapid Statutory Emergency Call Strip */}
        <div className="flex items-center justify-between bg-[#001D40] rounded-sm p-1.5 px-2 text-[10px] border border-slate-700/60 font-mono">
          <span className="text-slate-300 flex items-center gap-1">
            <LifeBuoy className="w-3 h-3 text-red-400" />
            Direct Helpline:
          </span>
          <div className="flex items-center gap-2">
            <a
              href="tel:112"
              className="px-2 py-0.5 bg-red-700 hover:bg-red-600 text-white rounded font-bold transition-colors"
              title="National Unified Emergency"
            >
              112
            </a>
            <a
              href="tel:1077"
              className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold transition-colors"
              title="District Emergency Operation Centre (DEOC)"
            >
              1077
            </a>
            <a
              href="tel:1070"
              className="px-2 py-0.5 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold transition-colors"
              title="State Disaster Management Authority (SDMA)"
            >
              1070
            </a>
          </div>
        </div>
      </div>

      {/* 2. Chat Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70" id="chat-stream">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 px-1 text-[10px] font-mono text-slate-500">
                {isUser ? (
                  <span>Citizen / Field Responder</span>
                ) : (
                  <span className="flex items-center gap-1 text-[#002D62] font-semibold">
                    <Bot className="w-3 h-3 text-[#002D62]" />
                    Apna Mitr AI
                  </span>
                )}
                <span>&bull;</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] p-3.5 rounded-sm text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#002D62] text-white rounded-tr-none'
                    : msg.isUrgent
                    ? 'bg-red-50 text-slate-900 border-l-4 border-l-red-600 border border-red-200'
                    : 'bg-white text-slate-900 border-l-4 border-l-[#002D62] border border-slate-300'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="markdown-body prose prose-sm max-w-none text-slate-900 text-xs">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}

                {/* Assistant Message Quick Utilities */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono text-[9px] text-slate-400">
                      {msg.source || 'NDMA Verified'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-medium"
                        title="Listen to Instructions"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-medium"
                        title="Copy to Clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium p-3 bg-white border border-slate-200 rounded-sm w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Consulting GSI Slope Radar & NDMA Emergency Protocols...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Preset Emergency Quick Action Chips */}
      <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
          Quick Help:
        </span>
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q.query)}
            disabled={isLoading}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-medium rounded-full border border-slate-300 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* 4. Input & Voice Command Toolbar */}
      <div className="p-3 bg-white border-t border-slate-300">
        {locationStatus && (
          <div className="mb-2 text-[10px] font-mono text-slate-600 flex items-center justify-between bg-slate-50 px-2 py-1 rounded border border-slate-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              {locationStatus}
            </span>
            <button
              onClick={() => {
                setLocationStatus('');
                setUserCoords(null);
              }}
              className="text-slate-400 hover:text-slate-700 text-xs"
            >
              &times;
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleDetectLocation}
            className={`p-2 rounded-sm border transition-colors cursor-pointer ${
              userCoords
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-300'
            }`}
            title="Attach My GPS Location for nearby shelter/risk calculation"
          >
            <Compass className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-2 rounded-sm border transition-colors cursor-pointer ${
              isListening
                ? 'bg-red-600 text-white border-red-700 animate-pulse'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-300'
            }`}
            title={isListening ? 'Stop Voice Recording' : 'Speak Emergency Query (Speech-to-Text)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your emergency query or ask about shelters, NH-54, cracks..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-sm focus:bg-white focus:outline-hidden focus:border-[#002D62] text-slate-900 placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2 bg-[#002D62] hover:bg-[#003d82] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            id="ai-agent-send-button"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            24x7 Automated Disaster Response
          </span>
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab('field')}
              className="text-[#002D62] hover:underline font-semibold cursor-pointer"
            >
              Report Incident in Field Tab &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
