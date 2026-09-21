import React, { useState } from 'react';
import { ResponseResource } from '../../types';
import {
  ShieldAlert,
  Truck,
  Users,
  CheckSquare,
  Square,
  Clock,
  Radio,
  PhoneCall,
  Activity,
  Award,
} from 'lucide-react';

interface CommandProps {
  resources: ResponseResource[];
}

export const CommandCenterTab: React.FC<CommandProps> = ({ resources }) => {
  // Statutory SOP Checklist state
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3]);

  const sopSteps = [
    {
      id: 1,
      title: 'Geotechnical Threat Verification',
      desc: 'Verify piezometric pore pressure & rainfall AWS threshold exceedance with GSI & IMD nodal scientists.',
      mandatory: true,
    },
    {
      id: 2,
      title: 'Enact Section 34 of Disaster Management Act 2005',
      desc: 'Issue official executive magistrate order prohibiting unauthorized civilian entry into red zones.',
      mandatory: true,
    },
    {
      id: 3,
      title: 'Common Alerting Protocol (CAP) Broadcast',
      desc: 'Disseminate geotargeted Cell Broadcast Service (CBS) alarms to mobile subscribers in designated pin codes.',
      mandatory: true,
    },
    {
      id: 4,
      title: 'Strategic Bypass Highway Diversion',
      desc: 'Deploy State Police & Traffic Police to reroute heavy commercial trucks via designated alternate bypass.',
      mandatory: true,
    },
    {
      id: 5,
      title: 'Pre-positioning NDRF & BRO Heavy Equipment',
      desc: 'Move tracked excavators, rock breakers, and canine search squads to forward base camps.',
      mandatory: true,
    },
    {
      id: 6,
      title: 'Designated Shelter Readiness Audit',
      desc: 'Ensure emergency medical staff, food rations, clean water tankers, and satellite telecom are online at relief camps.',
      mandatory: true,
    },
    {
      id: 7,
      title: 'Hourly Situation Report (SitRep) Gazette Transmission',
      desc: 'Transmit digitally certified situation reports to Central Control Room, NDMA New Delhi.',
      mandatory: false,
    },
  ];

  const toggleStep = (id: number) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((s) => s !== id));
    } else {
      setCompletedSteps([...completedSteps, id]);
    }
  };

  return (
    <div className="space-y-6" id="command-center-tab">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] border border-blue-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 06 &bull; COMMAND & CONTROL
            </span>
            <span className="text-xs text-slate-500 font-medium">National Emergency Operations Center (NEOC)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Multi-Agency Unified Command & Tactical Resource Center
          </h2>
          <p className="text-xs text-slate-600">
            Real-time deployment tracker and statutory Standard Operating Procedure (SOP) execution log under the National Disaster Management Authority.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 px-3 py-1.5 rounded-sm border border-slate-300 text-xs font-mono text-slate-800">
            <span>SOP Compliance: </span>
            <strong className="text-[#002D62] font-bold">
              {Math.round((completedSteps.length / sopSteps.length) * 100)}%
            </strong>
          </div>
        </div>
      </div>

      {/* 2. Command Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-sm border border-slate-300 border-l-4 border-l-[#002D62] shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">NDRF Battalions</span>
          <span className="text-2xl font-bold text-[#002D62] mt-1 block">45 Responders</span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">&bull; Task Force Alpha Active</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-slate-300 border-l-4 border-l-slate-600 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">BRO Heavy Fleet</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">9 Machines</span>
          <span className="text-[11px] text-slate-600 mt-0.5 block">&bull; 2x CAT Excavators Staged</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-slate-300 border-l-4 border-l-emerald-600 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Relief Shelters</span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">14 Activated</span>
          <span className="text-[11px] text-slate-600 mt-0.5 block">&bull; 6,900 Total Capacity</span>
        </div>

        <div className="bg-white p-4 rounded-sm border border-slate-300 border-l-4 border-l-amber-500 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Mean Response ETA</span>
          <span className="text-2xl font-bold text-amber-700 mt-1 block">12 Minutes</span>
          <span className="text-[11px] text-slate-600 mt-0.5 block">&bull; Forward Posts Manning</span>
        </div>
      </div>

      {/* 3. Grid Split: Tactical Units on Left, Statutory SOP Checklist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Deployed Multi-Agency Tactical Units */}
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#002D62]" />
                Deployed Multi-Agency Tactical Formations
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Live operational status of emergency disaster management units</p>
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-700 px-2 py-0.5 bg-slate-100 rounded-sm border border-slate-300">
              {resources.length} Formations
            </span>
          </div>

          <div className="space-y-3">
            {resources.map((res) => {
              const isDeployed = res.readinessStatus === 'DEPLOYED';
              const isStaged = res.readinessStatus === 'STAGED';

              return (
                <div
                  key={res.id}
                  className="p-3.5 bg-slate-50 rounded-sm border border-slate-200 space-y-2 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{res.unitName}</span>
                      <span className="px-1.5 py-0.5 bg-blue-100 text-[#002D62] rounded-sm text-[10px] font-bold font-mono">
                        {res.agency}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                        isDeployed
                          ? 'bg-emerald-700 text-white'
                          : isStaged
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-600 text-white'
                      }`}
                    >
                      {res.readinessStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono">
                    <span>Base: <strong>{res.stationBase}</strong></span>
                    <span>Zone: <strong>{res.assignedZone}</strong></span>
                    <span>Personnel: <strong>{res.personnelCount} Specialists</strong></span>
                    <span>Arrival ETA: <strong className="text-[#002D62]">{res.etaMinutes} mins</strong></span>
                  </div>

                  <div className="text-[11px] text-slate-700 border-t border-slate-200 pt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-slate-900">Equipment:</span>
                    {res.equipment.map((eq, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded-sm text-[10px]">
                        {eq}
                      </span>
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-500 font-sans">
                    Commanding Officer: <strong>{res.commandingOfficer}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Incident Commander Statutory SOP Execution Checklist */}
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-700" />
                Statutory SOP Checklist (Disaster Act 2005)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Mandatory statutory sequence for Incident Commanders & District Magistrates</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {sopSteps.map((step) => {
              const isDone = completedSteps.includes(step.id);
              return (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`p-3 rounded-sm border transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-emerald-700 flex-shrink-0 cursor-pointer"
                  >
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isDone ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                        Step {step.id}: {step.title}
                      </span>
                      {step.mandatory && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded-sm text-[9px] font-bold">
                          STATUTORY
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
