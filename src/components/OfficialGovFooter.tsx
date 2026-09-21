import React from 'react';
import {
  Shield,
  FileCheck,
  Building,
  HelpCircle,
  ExternalLink,
  Lock,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

export const OfficialGovFooter: React.FC<{ lastUpdated: string }> = ({ lastUpdated }) => {
  return (
    <footer className="bg-[#001D40] text-slate-300 text-xs border-t border-[#00142d] mt-16" id="official-footer">
      {/* 1. National Helpline & Quick Contact Bar */}
      <div className="bg-[#00132b] border-b border-[#001D40] py-6 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-red-900/60 border border-red-700 flex items-center justify-center text-red-300">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">National Disaster Helpline</p>
              <p className="text-base font-bold text-white">1070 / 1078 (Toll Free)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-blue-900/60 border border-blue-600 flex items-center justify-center text-blue-300">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">National Emergency Services</p>
              <p className="text-base font-bold text-white">112 (All Emergency Services)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-emerald-900/60 border border-emerald-600 flex items-center justify-center text-emerald-300">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Control Room E-Mail</p>
              <p className="text-xs font-bold text-white font-mono">control-room@ndma.gov.in</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-900/60 border border-amber-600 flex items-center justify-center text-amber-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Joint Operation Centre</p>
              <p className="text-xs font-semibold text-white">NDMA Bhawan, Safdarjung, New Delhi</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Government Links & Policies */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Emblem & Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-amber-400" />
              <span className="font-bold text-white text-sm tracking-tight">NER-SHIELD PORTAL</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Joint disaster risk reduction and landslide early warning initiative by Geological Survey of India (GSI), National Disaster Management Authority (NDMA), India Meteorological Department (IMD), and North Eastern Council (NEC).
            </p>
            <div className="mt-4 p-2.5 bg-[#00132b] border border-slate-700 rounded-sm text-[11px]">
              <span className="text-emerald-400 font-bold">● NIC Cloud Verified:</span>
              <p className="text-slate-300 mt-0.5 font-mono">Instance: DEL-NDC-NDMA-09</p>
            </div>
          </div>

          {/* Col 2: Statutory Compliance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Statutory Links & RTI
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rti" onClick={(e) => { e.preventDefault(); alert("Right to Information (RTI Act 2005): Central Public Information Officer (CPIO) details available under Section 4(1)(b) of the RTI Act."); }} className="text-slate-300 hover:text-amber-400 transition-colors">
                  &bull; Right to Information (RTI Act 2005)
                </a>
              </li>
              <li>
                <a href="#charter" onClick={(e) => { e.preventDefault(); alert("Citizen's Charter: Standard Response Time for Red Alerts is < 15 minutes."); }} className="text-slate-300 hover:text-amber-400 transition-colors">
                  &bull; Citizen's Charter & Standard SOPs
                </a>
              </li>
              <li>
                <a href="#cpgrams" onClick={(e) => { e.preventDefault(); alert("CPGRAMS Grievance Redressal: Public grievances can be lodged at pgportal.gov.in"); }} className="text-slate-300 hover:text-amber-400 transition-colors">
                  &bull; Public Grievances (CPGRAMS)
                </a>
              </li>
              <li>
                <a href="#act" onClick={(e) => { e.preventDefault(); alert("Disaster Management Act 2005 (Act No. 53 of 2005), Government of India."); }} className="text-slate-300 hover:text-amber-400 transition-colors">
                  &bull; Disaster Management Act, 2005
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Policies */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Portal Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  &bull; Hyperlinking Policy
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  &bull; Privacy Policy & Cookie Disclaimer
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  &bull; Copyright & Open Data Licensing (NDSAP)
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  &bull; Web Information Manager Contact
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-amber-400 cursor-pointer">
                  &bull; Accessibility Statement (GIGW 3.0 Level AA)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Statistics & Security Stamp */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-b border-slate-700 pb-1.5">
              Audit & Verification
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-[#00132b] p-2.5 rounded-sm border border-slate-700">
                <p className="text-slate-400 text-[10px] uppercase font-mono">Content Last Updated</p>
                <p className="text-amber-300 font-semibold">{lastUpdated}</p>
              </div>

              <div className="bg-[#00132b] p-2.5 rounded-sm border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Visitor Hits</p>
                  <p className="text-white font-bold text-sm tracking-widest font-mono">1,489,320</p>
                </div>
                <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-700 rounded-sm text-[9px] font-bold">
                  STQC AUDITED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal Disclaimer & NIC Stamp */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            <p>
              &copy; 2026 Ministry of Earth Sciences & National Disaster Management Authority, Government of India. All Rights Reserved.
            </p>
            <p className="mt-0.5 text-slate-300">
              Designed, Developed and Hosted by National Informatics Centre (NIC).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#00132b] border border-slate-700 rounded-sm text-slate-300 font-mono text-[10px]">
              SHA-256 SECURED
            </span>
            <span className="px-2 py-1 bg-[#00132b] border border-slate-700 rounded-sm text-slate-300 font-mono text-[10px]">
              ISO 27001:2022
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
