import React, { useState } from 'react';
import { TelemetrySource } from '../../types';
import {
  Radio,
  RefreshCw,
  Download,
  Database,
  Satellite,
  CloudRain,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
} from 'lucide-react';

interface DataPipelineProps {
  telemetry: TelemetrySource[];
}

export const DataPipelineTab: React.FC<DataPipelineProps> = ({ telemetry }) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [simulatingSync, setSimulatingSync] = useState(false);

  const handleManualSync = () => {
    setSimulatingSync(true);
    setTimeout(() => {
      setSimulatingSync(false);
    }, 1200);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Category,Name,StationCount,LastSync,ConfidencePct,PacketLossPct,Status\n' +
      telemetry
        .map(
          (t) =>
            `"${t.id}","${t.category}","${t.name}",${t.stationCount},"${t.lastSync}",${t.confidencePct},${t.packetLossPct},"${t.status}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gov_telemetry_manifest_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = telemetry.filter((t) => {
    const matchCategory = filterCategory === 'ALL' || t.category.includes(filterCategory);
    const matchSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6" id="data-pipeline-tab">
      {/* Tab Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] border border-blue-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 01 &bull; TELEMETRY & INGESTION
            </span>
            <span className="text-xs text-slate-500 font-medium">Statutory Sensor Ingestion Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Multi-Sensor Environmental & Geotechnical Pipeline
          </h2>
          <p className="text-xs text-slate-600">
            Real-time automated polling from Indian Meteorological Department AWS, ISRO InSAR satellites, and Geological Survey of India borehole arrays.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleManualSync}
            disabled={simulatingSync}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-sm text-xs font-semibold transition-colors cursor-pointer"
            id="sync-telemetry-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#002D62] ${simulatingSync ? 'animate-spin' : ''}`} />
            <span>{simulatingSync ? 'Syncing Network...' : 'Force Polling Cycle'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#002D62] hover:bg-[#003d82] text-white rounded-sm text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            id="export-csv-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Manifest</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Architecture Pipeline Stream */}
      <div className="bg-[#002D62] text-white p-6 rounded-sm border border-[#001D40] shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2 font-mono">
          <Database className="w-4 h-4 text-amber-400" />
          End-to-End Statutory Data Ingestion Flow (ISO 27001 Certified)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">🌧️</span>
            <span className="text-[11px] font-bold text-white block">AWS Rainfall</span>
            <span className="text-[10px] text-emerald-400 font-mono">142 Stations</span>
          </div>
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">💧</span>
            <span className="text-[11px] font-bold text-white block">TDR Soil Moisture</span>
            <span className="text-[10px] text-emerald-400 font-mono">86 Probes</span>
          </div>
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">🛰️</span>
            <span className="text-[11px] font-bold text-white block">InSAR Radar</span>
            <span className="text-[10px] text-emerald-400 font-mono">ISRO RISAT-1A</span>
          </div>
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">📉</span>
            <span className="text-[11px] font-bold text-white block">Piezometers</span>
            <span className="text-[10px] text-emerald-400 font-mono">64 Boreholes</span>
          </div>
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">⛰️</span>
            <span className="text-[11px] font-bold text-white block">LiDAR DEM</span>
            <span className="text-[10px] text-slate-300 font-mono">0.5m High-Res</span>
          </div>
          <div className="bg-[#001D40] p-3 rounded-sm border border-slate-700">
            <span className="text-2xl block mb-1">📍</span>
            <span className="text-[11px] font-bold text-white block">Field Reports</span>
            <span className="text-[10px] text-amber-300 font-mono">GPS Verified</span>
          </div>
          <div className="bg-amber-400 text-slate-950 p-3 rounded-sm font-bold flex flex-col justify-center items-center shadow-xs">
            <span className="text-2xl block mb-1">🧠</span>
            <span className="text-[11px] uppercase tracking-wide">XAI Prediction</span>
            <span className="text-[10px] font-mono">94.2% Conf</span>
          </div>
        </div>
      </div>

      {/* 3. Ingestion Manifest Table & Search */}
      <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Sensor Networks
            </span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-sm font-mono font-semibold text-slate-700">
              {filtered.length} Arrays
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search telemetry feed..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-hidden focus:border-[#002D62] w-48 sm:w-60"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">All Networks</option>
              <option value="Rainfall">Rainfall (AWS)</option>
              <option value="Soil">Soil Saturation (TDR)</option>
              <option value="InSAR">Radar InSAR</option>
              <option value="Piezometer">Piezometer</option>
              <option value="Seismic">Seismic Tremor</option>
            </select>
          </div>
        </div>

        {/* Telemetry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Network Stream</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Active Probes</th>
                <th className="py-2.5 px-3">Last Polling Heartbeat</th>
                <th className="py-2.5 px-3 text-center">Confidence</th>
                <th className="py-2.5 px-3 text-center">Packet Loss</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold text-slate-900">
                    {t.name}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-600">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-sm text-[10px] font-semibold">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900">
                    {t.stationCount}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{t.lastSync}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700">
                    {t.confidencePct}%
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">
                    {t.packetLossPct}%
                  </td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
