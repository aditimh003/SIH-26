import React from 'react';
import {
  Shield,
  PhoneCall,
  MapPin,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Package,
  Navigation,
  Compass,
  Radio,
  FileText,
} from 'lucide-react';
import { AiDisasterAgent } from '../AiDisasterAgent';
import { HazardZone } from '../../types';

interface AiAgentTabProps {
  currentZone?: HazardZone;
  onNavigateTab: (tab: string) => void;
  onOpenSitRep: () => void;
}

export const AiAgentTab: React.FC<AiAgentTabProps> = ({
  currentZone,
  onNavigateTab,
  onOpenSitRep,
}) => {
  return (
    <div className="space-y-6" id="ai-agent-tab">
      {/* 1. Official Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] border border-blue-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 09 &bull; CITIZEN & RESPONDER AI ASSISTANT
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Powered by Gemini 3.8 Flash & NDMA Knowledge Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            NER-SHIELD Apna Mitr (अपना मित्र) Disaster AI Agent
          </h2>
          <p className="text-xs text-slate-600">
            24x7 intelligent guidance for distressed citizens, village councils, and incident commanders during active slope instability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSitRep}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Read Gazette SitRep</span>
          </button>
          <a
            href="tel:112"
            className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-sm text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>Call 112 Unified SOS</span>
          </a>
        </div>
      </div>

      {/* 2. Main 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Full Embedded AI Chat Interface */}
        <div className="lg:col-span-8 flex flex-col">
          <AiDisasterAgent
            isOpen={true}
            onClose={() => {}}
            isFloating={false}
            currentZone={currentZone}
            onNavigateTab={onNavigateTab}
          />
        </div>

        {/* Right 4 Cols: Quick Disaster Safety Reference Cards */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card A: Active Relief Shelters */}
          <div className="bg-white p-4 rounded-sm border border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#002D62]" />
                Emergency Relief Camps
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                4 Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Ramhlun North Stadium</span>
                  <span className="text-blue-700 font-mono text-[11px]">420/850</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Aizawl &bull; Food, Water & Medical Staged</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-700 h-full w-[49%]"></div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Chite Veng Community Hall</span>
                  <span className="text-amber-700 font-mono text-[11px]">310/400</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Aizawl &bull; Quick Evac Point</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full w-[78%]"></div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Lumshnong Parish Relief</span>
                  <span className="text-emerald-700 font-mono text-[11px]">180/500</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">East Jaintia Hills, Meghalaya</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[36%]"></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('gis')}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-sm border border-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-700" />
              <span>View Evacuation Routes on GIS Map &rarr;</span>
            </button>
          </div>

          {/* Card B: Highway Clearance Status */}
          <div className="bg-white p-4 rounded-sm border border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Key Transport Arteries
              </h3>
              <span className="text-[10px] font-mono text-slate-500">BRO Pushpak</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-red-50 border border-red-200 border-l-4 border-l-red-600 rounded-sm">
                <span className="font-bold text-red-900 block">NH-54 (Aizawl - Lunglei)</span>
                <span className="text-[11px] text-red-800">
                  BLOCKED at Km 14+200. Heavy debris fall. Transit prohibited. Use Armed Veng bypass.
                </span>
              </div>

              <div className="p-2 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-sm">
                <span className="font-bold text-amber-900 block">NH-10 (Siliguri - Gangtok)</span>
                <span className="text-[11px] text-amber-800">
                  RESTRICTED at 9th Mile. Light vehicles only with police escort.
                </span>
              </div>

              <div className="p-2 bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-600 rounded-sm">
                <span className="font-bold text-emerald-900 block">Armed Veng Emergency Bypass</span>
                <span className="text-[11px] text-emerald-800">
                  OPEN for emergency ambulances, NDRF convoys, and evacuation buses.
                </span>
              </div>
            </div>
          </div>

          {/* Card C: Emergency Go-Bag Checklist */}
          <div className="bg-white p-4 rounded-sm border border-slate-300 shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Package className="w-4 h-4 text-indigo-700" />
              Pre-Evacuation Go-Bag Checklist
            </h3>
            <ul className="text-xs space-y-1.5 text-slate-700">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Identification documents & insurance in waterproof pouch</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>3 days of essential prescription medicines</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Charged power bank, battery torch & whistle</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Dry rations, energy bars, and bottled water</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Sturdy waterproof footwear and rain poncho</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
