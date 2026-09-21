import React, { useState } from 'react';
import { CapAlert } from '../../types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Send,
  ShieldCheck,
  Filter,
  FileCheck2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface AlertsProps {
  alerts: CapAlert[];
  onAcknowledgeAlert: (alertId: string, officerName: string) => void;
}

export const AlertsTab: React.FC<AlertsProps> = ({ alerts, onAcknowledgeAlert }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(null);
  const [officerNameInput, setOfficerNameInput] = useState<string>('Duty Officer S. Majumdar (SEOC)');
  const [broadcastSimulatedId, setBroadcastSimulatedId] = useState<string | null>(null);

  const handleSignOff = (alertId: string) => {
    onAcknowledgeAlert(alertId, officerNameInput);
    setAcknowledgingId(null);
  };

  const handleSimulateBroadcast = (alertId: string) => {
    setBroadcastSimulatedId(alertId);
    setTimeout(() => {
      setBroadcastSimulatedId(null);
    }, 2000);
  };

  const filtered = alerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'PENDING') return !a.acknowledged;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-6" id="alerts-cap-tab">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-100 text-red-900 border border-red-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 04 &bull; CAP COMPLIANT EARLY WARNING
            </span>
            <span className="text-xs text-slate-500 font-medium">Common Alerting Protocol (ITU / WMO Standard)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Statutory Early Warning & Multi-Channel Alert Distribution
          </h2>
          <p className="text-xs text-slate-600">
            Automated dissemination via Cell Broadcast Service (CBS), AIR Radio, SMS Gateways, and State Disaster Emergency Operations Centres.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-sm text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Warning Bulletins</option>
            <option value="PENDING">Pending Officer Acknowledgment</option>
            <option value="CRITICAL">Critical (Red Alert)</option>
            <option value="HIGH">High (Orange Warning)</option>
          </select>
        </div>
      </div>

      {/* 2. List of CAP Bulletins */}
      <div className="space-y-4">
        {filtered.map((alert) => {
          const isCrit = alert.severity === 'CRITICAL';
          const isAcknowledged = alert.acknowledged;
          const isSimulating = broadcastSimulatedId === alert.id;

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-sm border border-slate-300 p-5 shadow-sm transition-all space-y-4 ${
                isCrit
                  ? 'border-l-4 border-l-red-600'
                  : 'border-l-4 border-l-amber-500'
              }`}
            >
              {/* Top Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCrit ? 'bg-red-700 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {alert.severity} ALERT
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    {alert.capRefId}
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-xs text-slate-600 font-semibold">
                    {alert.district}, {alert.state}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Effective: {alert.effectiveTime}
                  </span>
                  {isAcknowledged ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Statutory Sign-off Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-bold animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      Pending Duty Officer Sign
                    </span>
                  )}
                </div>
              </div>

              {/* Headline & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{alert.headline}</h3>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-sm border border-slate-200">
                  {alert.description}
                </p>
              </div>

              {/* Statutory Instructions */}
              <div className="p-3 bg-red-50/60 border-l-4 border-red-700 rounded-r-sm text-xs space-y-1 text-slate-900">
                <span className="font-bold text-red-900 uppercase text-[10px] block tracking-wider">
                  Mandatory Public Directives & Standard Operating Protocol:
                </span>
                <p className="text-slate-800 text-xs leading-relaxed font-medium">{alert.instruction}</p>
              </div>

              {/* Broadcast Channels & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase font-mono mr-1">Dispatched Via:</span>
                  {alert.broadcastChannels.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-sm text-[10px] font-mono text-slate-700"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleSimulateBroadcast(alert.id)}
                    disabled={isSimulating}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Radio className={`w-3.5 h-3.5 text-[#002D62] ${isSimulating ? 'animate-ping' : ''}`} />
                    <span>{isSimulating ? 'Pinging Cell Towers...' : 'Simulate CBS Alert'}</span>
                  </button>

                  {!isAcknowledged ? (
                    <button
                      onClick={() => setAcknowledgingId(alert.id)}
                      className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-sm text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Duty Officer Sign-off</span>
                    </button>
                  ) : (
                    <div className="text-right text-[10px] font-mono text-slate-500">
                      Signed by: <strong className="text-slate-800">{alert.acknowledgedBy}</strong> ({alert.acknowledgedAt})
                    </div>
                  )}
                </div>
              </div>

              {/* Sign-off Inlined Form if clicked */}
              {acknowledgingId === alert.id && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-800" />
                    <span className="font-bold text-xs text-amber-950">
                      Duty Officer Statutory Sign-off & Acknowledgment
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={officerNameInput}
                      onChange={(e) => setOfficerNameInput(e.target.value)}
                      placeholder="Officer Name & Designation"
                      className="w-full sm:flex-1 px-3 py-1.5 bg-white border border-amber-400 rounded-sm text-xs font-semibold focus:outline-hidden"
                    />
                    <button
                      onClick={() => handleSignOff(alert.id)}
                      className="w-full sm:w-auto px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-sm transition-colors cursor-pointer"
                    >
                      Confirm Digital Stamp
                    </button>
                    <button
                      onClick={() => setAcknowledgingId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
