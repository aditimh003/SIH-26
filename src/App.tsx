import React, { useState } from 'react';
import {
  INITIAL_HAZARD_ZONES,
  TELEMETRY_SOURCES,
  EVACUATION_ROUTES,
  INITIAL_CAP_ALERTS,
  INITIAL_FIELD_REPORTS,
  RESPONSE_RESOURCES,
  INITIAL_SITREP,
} from './data/mockData';
import {
  HazardZone,
  TelemetrySource,
  EvacuationRoute,
  CapAlert,
  FieldReport,
  ResponseResource,
  SituationReport,
} from './types';

// Components
import { OfficialGovHeader } from './components/OfficialGovHeader';
import { GovNoticeTicker } from './components/GovNoticeTicker';
import { OfficialGovFooter } from './components/OfficialGovFooter';
import { SituationReportModal } from './components/modals/SituationReportModal';

// Tabs
import { OverviewDashboard } from './components/tabs/OverviewDashboard';
import { DataPipelineTab } from './components/tabs/DataPipelineTab';
import { AiPredictionTab } from './components/tabs/AiPredictionTab';
import { GisMapTab } from './components/tabs/GisMapTab';
import { AlertsTab } from './components/tabs/AlertsTab';
import { FieldReportsTab } from './components/tabs/FieldReportsTab';
import { CommandCenterTab } from './components/tabs/CommandCenterTab';
import { HistoricalReplayTab } from './components/tabs/HistoricalReplayTab';
import { PublicRegistryTab } from './components/tabs/PublicRegistryTab';
import { AiAgentTab } from './components/tabs/AiAgentTab';
import { AiDisasterAgent } from './components/AiDisasterAgent';
import { AiFloatingTrigger } from './components/AiFloatingTrigger';

// Icons for navigation
import {
  LayoutDashboard,
  Database,
  Brain,
  MapPin,
  Bell,
  Upload,
  ShieldAlert,
  History,
  FileCheck,
  Bot,
} from 'lucide-react';

export default function App() {
  // State Management
  const [zones, setZones] = useState<HazardZone[]>(INITIAL_HAZARD_ZONES);
  const [telemetry, setTelemetry] = useState<TelemetrySource[]>(TELEMETRY_SOURCES);
  const [routes, setRoutes] = useState<EvacuationRoute[]>(EVACUATION_ROUTES);
  const [alerts, setAlerts] = useState<CapAlert[]>(INITIAL_CAP_ALERTS);
  const [reports, setReports] = useState<FieldReport[]>(INITIAL_FIELD_REPORTS);
  const [resources, setResources] = useState<ResponseResource[]>(RESPONSE_RESOURCES);
  const [sitRep, setSitRep] = useState<SituationReport>(INITIAL_SITREP);

  // Active View & Filters
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('z1');
  const [isSitRepOpen, setIsSitRepOpen] = useState<boolean>(false);
  const [isAiAgentOpen, setIsAiAgentOpen] = useState<boolean>(false);

  // Accessibility State
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');

  // Actions
  const handleAcknowledgeAlert = (alertId: string, officerName: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? {
              ...a,
              acknowledged: true,
              acknowledgedBy: officerName,
              acknowledgedAt: new Date().toLocaleTimeString('en-IN') + ' IST',
            }
          : a
      )
    );
  };

  const handleAddReport = (newReport: FieldReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const handleDispatchReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: 'DISPATCHED_NDRF' } : r
      )
    );
  };

  const criticalAlertsCount = alerts.filter(
    (a) => a.severity === 'CRITICAL' && !a.acknowledged
  ).length;

  const fontScaleClass =
    fontSizeLevel === -1
      ? 'text-xs'
      : fontSizeLevel === 1
      ? 'text-base'
      : fontSizeLevel === 2
      ? 'text-lg'
      : '';

  const contrastClass = highContrast
    ? 'contrast-125 saturate-150 bg-amber-50 text-slate-950'
    : 'bg-[#F1F3F5] text-slate-900';

  const navItems = [
    { id: 'overview', label: 'Command Overview', icon: LayoutDashboard, badge: null },
    { id: 'ai-agent', label: '🤖 Apna Mitr AI', icon: Bot, badge: '24x7 Help', badgeColor: 'bg-amber-400 text-slate-950 font-bold' },
    { id: 'data', label: '01 · Data Pipeline', icon: Database, badge: '350 Live' },
    { id: 'ai', label: '02 · AI Prediction', icon: Brain, badge: 'XAI' },
    { id: 'gis', label: '03 · GIS & Safe Routes', icon: MapPin, badge: null },
    {
      id: 'alerts',
      label: '04 · Early Warnings',
      icon: Bell,
      badge: criticalAlertsCount > 0 ? `${criticalAlertsCount} Red` : null,
      badgeColor: 'bg-red-700 text-white',
    },
    { id: 'field', label: '05 · Field Reports', icon: Upload, badge: `${reports.length}` },
    { id: 'command', label: '06 · Command Centre', icon: ShieldAlert, badge: 'DEFCON 2' },
    { id: 'replay', label: '⏪ Forensic Replay', icon: History, badge: null },
    { id: 'registry', label: '📜 Public Registry', icon: FileCheck, badge: 'GIGW 3.0' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans ${contrastClass} ${fontScaleClass}`}>
      {/* 1. Official Government Trust Header */}
      <OfficialGovHeader
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        language={language}
        setLanguage={setLanguage}
        onOpenSitRep={() => setIsSitRepOpen(true)}
        onOpenAiAgent={() => setIsAiAgentOpen(true)}
        activeRedAlertsCount={criticalAlertsCount}
      />

      {/* 2. Statutory Emergency Ticker */}
      <GovNoticeTicker
        urgentAlertText="RED ALERT: Immediate Pre-emptive Evacuation ordered along Aizawl NH-54 Corridor due to critical pore pressure surge."
        onSelectAlertsTab={() => setActiveTab('alerts')}
      />

      {/* 3. Official Portal Breadcrumb Strip */}
      <div className="bg-white border-b border-slate-300 px-6 sm:px-8 py-2 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <p className="flex items-center space-x-1.5 font-medium">
          <span className="hover:text-slate-800 cursor-pointer">National Portal</span>
          <span>&gt;</span>
          <span className="hover:text-slate-800 cursor-pointer">Disaster Intelligence & Early Warning</span>
          <span>&gt;</span>
          <span className="hover:text-slate-800 cursor-pointer">Northeastern Region (NER)</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-bold font-mono">
            Desk #{activeTab.toUpperCase()}-2026-X12
          </span>
        </p>
        <div className="flex items-center space-x-3 text-[10px] uppercase font-mono text-slate-400">
          <span>System: Operational</span>
          <span>&bull;</span>
          <span className="text-emerald-700 font-bold">● NIC-Cloud Sync: Active</span>
        </div>
      </div>

      {/* 4. Official Government Navigation Bar */}
      <nav className="bg-[#002D62] text-white border-b border-[#001D40] shadow-sm sticky top-[108px] z-30 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-sm text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#001D40] text-white border-b-2 border-amber-400 shadow-inner'
                    : 'text-slate-200 hover:bg-[#003d82] hover:text-white'
                }`}
                id={`nav-tab-${item.id}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-300'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold ${
                      isActive
                        ? 'bg-amber-400 text-slate-950'
                        : item.badgeColor || 'bg-[#001D40] text-slate-300 border border-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 5. Main Tab View Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6" id="main-portal-content">
        {activeTab === 'overview' && (
          <OverviewDashboard
            zones={zones}
            alerts={alerts}
            telemetry={telemetry}
            resources={resources}
            onSelectZone={(id) => {
              setSelectedZoneId(id);
              setActiveTab('ai');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenSitRep={() => setIsSitRepOpen(true)}
          />
        )}

        {activeTab === 'data' && <DataPipelineTab telemetry={telemetry} />}

        {activeTab === 'ai' && (
          <AiPredictionTab
            zones={zones}
            selectedZoneId={selectedZoneId}
            onSelectZoneId={setSelectedZoneId}
            language={language}
          />
        )}

        {activeTab === 'gis' && (
          <GisMapTab
            zones={zones}
            routes={routes}
            reports={reports}
            onSelectZone={(id) => {
              setSelectedZoneId(id);
              setActiveTab('ai');
            }}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsTab
            alerts={alerts}
            onAcknowledgeAlert={handleAcknowledgeAlert}
          />
        )}

        {activeTab === 'field' && (
          <FieldReportsTab
            reports={reports}
            onAddReport={handleAddReport}
            onDispatchReport={handleDispatchReport}
          />
        )}

        {activeTab === 'command' && <CommandCenterTab resources={resources} />}

        {activeTab === 'replay' && <HistoricalReplayTab />}

        {activeTab === 'registry' && (
          <PublicRegistryTab onOpenSitRep={() => setIsSitRepOpen(true)} />
        )}

        {activeTab === 'ai-agent' && (
          <AiAgentTab
            currentZone={zones.find((z) => z.id === selectedZoneId)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenSitRep={() => setIsSitRepOpen(true)}
          />
        )}
      </main>

      {/* 5. Official Government Footer */}
      <OfficialGovFooter lastUpdated="08 September 2026, 07:45 IST" />

      {/* 6. Printable Official Gazette SitRep Modal */}
      <SituationReportModal
        sitRep={sitRep}
        isOpen={isSitRepOpen}
        onClose={() => setIsSitRepOpen(false)}
      />

      {/* 7. Persistent Floating AI Disaster Assistant Trigger */}
      <AiFloatingTrigger
        isOpen={isAiAgentOpen}
        onToggle={() => setIsAiAgentOpen(!isAiAgentOpen)}
        hasUrgentAlert={criticalAlertsCount > 0}
      />

      {/* 8. Floating AI Disaster Agent Modal / Window */}
      {isAiAgentOpen && (
        <AiDisasterAgent
          isOpen={isAiAgentOpen}
          onClose={() => setIsAiAgentOpen(false)}
          isFloating={true}
          currentZone={zones.find((z) => z.id === selectedZoneId)}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setIsAiAgentOpen(false);
          }}
        />
      )}
    </div>
  );
}
