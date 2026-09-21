import React from 'react';
import { SituationReport } from '../../types';
import { Shield, Printer, Download, CheckCircle2, X, FileText, QrCode } from 'lucide-react';

interface ModalProps {
  sitRep: SituationReport;
  isOpen: boolean;
  onClose: () => void;
}

export const SituationReportModal: React.FC<ModalProps> = ({ sitRep, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" id="sitrep-modal-backdrop">
      <div className="bg-white text-slate-900 rounded-sm shadow-2xl max-w-4xl w-full border border-slate-300 max-h-[90vh] flex flex-col overflow-hidden my-auto" id="sitrep-modal-content">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="bg-[#002D62] text-white px-6 py-3 flex items-center justify-between border-b border-[#001D40] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Official Government Situation Report (SitRep)</span>
            <span className="px-2 py-0.5 bg-red-800 text-red-100 rounded-full text-[10px] font-mono font-bold">
              GAZETTE NOTIFICATION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-sm text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              id="sitrep-print-button"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-slate-200 hover:text-white rounded-sm cursor-pointer transition-colors"
              id="sitrep-close-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Gazette Document Body */}
        <div className="p-8 sm:p-10 overflow-y-auto text-slate-900 bg-[#fafafa] font-serif leading-relaxed">
          {/* Gazette Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-[#002D62] text-amber-400 rounded-full flex items-center justify-center p-2">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-700">
              भारत का राजपत्र &bull; THE GAZETTE OF INDIA (EXTRAORDINARY)
            </p>
            <h2 className="text-lg font-bold text-slate-950 uppercase tracking-tight mt-1 font-sans">
              NATIONAL DISASTER MANAGEMENT AUTHORITY & GEOLOGICAL SURVEY OF INDIA
            </h2>
            <p className="text-xs font-sans text-slate-600">
              JOINT DISASTER EMERGENCY OPERATION CENTRE &bull; NEW DELHI / SHILLONG
            </p>
            <div className="mt-3 inline-block border border-slate-800 px-4 py-1 rounded-sm bg-white text-xs font-mono font-bold text-slate-900">
              GAZETTE REF NO: {sitRep.gazetteNumber}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-slate-300 rounded-sm font-sans text-xs mb-6">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Report Reference:</span>
              <span className="font-mono font-bold text-slate-900">{sitRep.reportId}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Date & Time of Issue:</span>
              <span className="font-bold text-slate-900">{sitRep.dateGenerated}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">National Threat Level:</span>
              <span className="inline-block px-2 py-0.5 bg-red-700 text-white font-bold rounded-full text-[10px]">
                {sitRep.nationalThreatLevel} (INDEX: {sitRep.overallScore}/100)
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Authorizing Officer:</span>
              <span className="font-bold text-slate-900">Director General, NDMA</span>
            </div>
          </div>

          {/* Summary Text */}
          <div className="mb-6">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-500 border-b border-slate-300 pb-1 mb-2">
              1. Executive Operational Assessment
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 text-justify">
              {sitRep.summaryText}
            </p>
          </div>

          {/* Key Disaster Metrics Table */}
          <div className="mb-6 font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-300 pb-1 mb-3">
              2. Field Resource & Impact Telemetry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-red-50 border border-red-200 border-l-4 border-l-red-600 rounded-sm">
                <span className="text-[11px] text-red-800 font-bold block">Critical Slope Sectors</span>
                <span className="text-2xl font-bold text-red-900">{sitRep.criticalZonesCount}</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-sm">
                <span className="text-[11px] text-amber-800 font-bold block">High Risk Corridors</span>
                <span className="text-2xl font-bold text-amber-900">{sitRep.highRiskZonesCount}</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 border-l-4 border-l-[#002D62] rounded-sm">
                <span className="text-[11px] text-blue-800 font-bold block">Pre-emptively Evacuated</span>
                <span className="text-2xl font-bold text-[#002D62]">{sitRep.displacedPersons}</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-600 rounded-sm">
                <span className="text-[11px] text-emerald-800 font-bold block">Active NDRF Battalions</span>
                <span className="text-2xl font-bold text-emerald-900">{sitRep.ndrfTeamsEngaged}</span>
              </div>
            </div>
          </div>

          {/* Directives Section */}
          <div className="mb-8">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-500 border-b border-slate-300 pb-1 mb-2">
              3. Statutory Directives under Section 34, Disaster Management Act 2005
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-800">
              {sitRep.keyDirectives.map((d, i) => (
                <li key={i} className="pl-1">
                  <strong>Order 0{i + 1}:</strong> {d}
                </li>
              ))}
            </ol>
          </div>

          {/* Digital Signature & Verification Seal Box */}
          <div className="border-t-2 border-slate-900 pt-6 flex flex-wrap items-center justify-between gap-6 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded-sm flex items-center justify-center">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div className="text-[11px]">
                <p className="font-bold text-slate-900">Digitally Signed & Certified by NIC</p>
                <p className="text-slate-600 font-mono text-[10px] break-all max-w-xs">{sitRep.digitalSignatureHash}</p>
                <p className="text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Statutory Validity Confirmed
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block border border-dashed border-slate-400 p-2 text-center rounded-sm bg-slate-50">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Official Seal</p>
                <p className="text-xs font-bold text-slate-900">GOVT OF INDIA &bull; NDMA</p>
                <p className="text-[9px] text-slate-600">DISASTER INTELLIGENCE CELL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
