import React from 'react';
import {
  HazardZone,
  CapAlert,
  TelemetrySource,
  ResponseResource,
} from '../../types';
import {
  AlertTriangle,
  Activity,
  ShieldCheck,
  Radio,
  Truck,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Users,
  AlertOctagon,
  ChevronRight,
} from 'lucide-react';

interface OverviewProps {
  zones: HazardZone[];
  alerts: CapAlert[];
  telemetry: TelemetrySource[];
  resources: ResponseResource[];
  onSelectZone: (zoneId: string) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenSitRep: () => void;
}

export const OverviewDashboard: React.FC<OverviewProps> = ({
  zones,
  alerts,
  telemetry,
  resources,
  onSelectZone,
  onNavigateTab,
  onOpenSitRep,
}) => {
  const criticalZones = zones.filter((z) => z.severity === 'CRITICAL');
  const highZones = zones.filter((z) => z.severity === 'HIGH');
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);
  const activeDeployments = resources.filter((r) => r.readinessStatus === 'DEPLOYED');

  const averageRisk = Math.round(
    zones.reduce((acc, z) => acc + z.risk, 0) / (zones.length || 1)
  );

  return (
    <div className="space-y-6" id="overview-dashboard-view">
      {/* 1. National Hazard Command Level Hero Banner */}
      <div className="bg-[#002D62] text-white rounded-sm p-6 sm:p-8 shadow-sm border border-[#001D40] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#001D40] border border-blue-400/30 rounded-sm text-amber-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Live Geotechnical Hazard Vigilance &bull; DEFCON-2
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              National Landslide Risk Assessment: High Vigilance
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed opacity-90">
              Real-time multi-sensor telemetry combining IMD Automated Weather Stations, GSI InSAR spaceborne deformation radar, borehole piezometers, and ground field verification squads across the Northeastern corridor.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('ai')}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-sm shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                id="hero-run-ai-prediction"
              >
                <span>Run XAI Hazard Analysis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('gis')}
                className="px-4 py-2 bg-[#001D40] hover:bg-[#00142d] text-white font-semibold text-xs rounded-sm border border-slate-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                id="hero-view-gis-routes"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-300" />
                <span>GIS Evacuation Map</span>
              </button>
              <button
                onClick={onOpenSitRep}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-sm border border-white/30 transition-colors cursor-pointer"
              >
                View Gazette SitRep
              </button>
            </div>
          </div>

          {/* National Threat Score Gauge Card */}
          <div className="bg-[#001D40] border border-slate-700 rounded-sm p-5 flex flex-col items-center justify-center text-center min-w-[200px] shadow-sm">
            <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase font-mono">
              REGIONAL THREAT INDEX
            </span>
            <div className="my-2 relative flex items-center justify-center">
              <span className="text-5xl font-bold text-amber-400 font-mono">{averageRisk}</span>
              <span className="text-xs text-slate-400 self-end mb-1 ml-1 font-mono">/100</span>
            </div>
            <div className="inline-block px-3 py-1 bg-red-900/80 text-red-200 border border-red-700 rounded-sm text-xs font-bold uppercase tracking-wider">
              HIGH RISK MONSOON PHASE
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">
              AI Confidence: 94.2% &bull; ISO 27001
            </p>
          </div>
        </div>
      </div>

      {/* 2. Official KPI Metric Tiles with Professional Polish Accent Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="overview-metrics-grid">
        {/* Metric 1 */}
        <div className="bg-white border-l-4 border-red-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Critical Sectors</span>
            <span className="p-1.5 bg-red-100 text-red-700 rounded-sm">
              <AlertOctagon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{criticalZones.length}</span>
            <span className="text-xs text-slate-500 font-medium">Red Alert Zones</span>
          </div>
          <div className="mt-2 text-[11px] text-red-600 font-semibold flex items-center gap-1">
            <span>&bull; Aizawl NH-54 Corridor: 94% Risk</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border-l-4 border-amber-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending CAP Alerts</span>
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-sm">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{unacknowledgedAlerts.length}</span>
            <span className="text-xs text-slate-500 font-medium">Awaiting Officer Sign</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex items-center gap-1">
            <span>{alerts.length} Total Warnings Broadcasted</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Telemetry Health</span>
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-sm">
              <Radio className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">345 / 350</span>
            <span className="text-xs text-slate-500 font-medium">Sensors Streaming Live</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 98.6% Network Availability
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border-l-4 border-[#002D62] p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tactical Responders</span>
            <span className="p-1.5 bg-blue-100 text-[#002D62] rounded-sm">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeDeployments.length}</span>
            <span className="text-xs text-slate-500 font-medium">Battalions Deployed</span>
          </div>
          <div className="mt-2 text-[11px] text-[#002D62] font-semibold flex items-center gap-1">
            <span>169 Personnel Staged in Forward Camps</span>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monitored Corridors Threat Matrix */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#002D62]" />
                Strategic Transport & Slope Corridors Threat Matrix
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Live ranking by AI calculated failure probability index</p>
            </div>
            <button
              onClick={() => onNavigateTab('ai')}
              className="text-xs font-semibold text-[#002D62] hover:text-[#003d82] flex items-center gap-1 cursor-pointer"
            >
              Analyze All &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100 space-y-1">
            {zones.map((zone) => {
              const isCrit = zone.severity === 'CRITICAL';
              const isHigh = zone.severity === 'HIGH';
              return (
                <div
                  key={zone.id}
                  className="py-3 px-3 rounded-sm hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-transparent hover:border-slate-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isCrit
                            ? 'bg-red-100 text-red-800'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {zone.severity}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{zone.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">{zone.district}, {zone.state}</span> &bull; {zone.highway}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>🌧️ {zone.rainfall_mm_hr} mm/hr</span>
                      <span>💧 {zone.soil_saturation_pct}% Saturation</span>
                      <span>⛰️ {zone.slope_gradient_deg}&deg; Slope</span>
                      <span>👥 {zone.population_exposed.toLocaleString()} Exposed</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-slate-900">{zone.risk}%</span>
                      <span className="text-[10px] block text-slate-400 uppercase font-semibold">Risk Index</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectZone(zone.id);
                        onNavigateTab('ai');
                      }}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-[#002D62] hover:text-white text-slate-700 text-xs font-semibold rounded-sm border border-slate-300 transition-colors cursor-pointer"
                    >
                      Audit Risk
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Telemetry Feed & AI Recommended Directives */}
        <div className="space-y-6">
          {/* Data Freshness Card */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-3">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                Data Ingestion Telemetry
              </h4>
              <button
                onClick={() => onNavigateTab('data')}
                className="text-[11px] text-[#002D62] font-semibold hover:underline"
              >
                Pipeline &rarr;
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {telemetry.slice(0, 4).map((t) => (
                <div key={t.id} className="p-2.5 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block text-[11px]">{t.category}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Sync: {t.lastSync}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-700 font-mono">{t.confidencePct}% Conf</span>
                    <span className="block text-[9px] text-slate-500 uppercase font-bold">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Immediate Recommended Actions Card */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#002D62]" />
                Statutory Directives Matrix
              </h4>
              <p className="text-[11px] text-slate-500">Auto-generated for Incident Commanders</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-950 rounded-r-sm text-[11px] leading-snug border-y border-r border-slate-200">
                <strong>1. NH-54 Road Blockade:</strong> Execute statutory traffic diversion via Durtlang-Selesih Ridge bypass immediately.
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-950 rounded-r-sm text-[11px] leading-snug border-y border-r border-slate-200">
                <strong>2. Chite Veng Pre-emptive Evac:</strong> Relocate 42 vulnerable hillside households to Selesih designated shelter.
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-[#002D62] text-blue-950 rounded-r-sm text-[11px] leading-snug border-y border-r border-slate-200">
                <strong>3. BRO Excavator Pre-positioning:</strong> Station heavy wheel loader at Sonapur Tunnel portal on NH-6.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
