import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  CheckCircle2,
  Shield,
  Phone,
  Building2,
  Lock,
  ExternalLink,
  Award,
  Download,
} from 'lucide-react';

export const PublicRegistryTab: React.FC<{ onOpenSitRep: () => void }> = ({ onOpenSitRep }) => {
  const [searchSitRepId, setSearchSitRepId] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchSitRepId.trim()) return;
    if (
      searchSitRepId.includes('NDMA-SITREP-NER-2026-0908-01') ||
      searchSitRepId.includes('894') ||
      searchSitRepId.includes('2026')
    ) {
      setVerificationResult('VALID');
    } else {
      setVerificationResult('NOT_FOUND');
    }
  };

  const districtOfficers = [
    {
      district: 'Aizawl District (Mizoram)',
      officer: 'Shri L. Renthlei (IAS), District Magistrate & Chairman DDMA',
      deocPhone: '+91-389-2322201 / 1070',
      email: 'dc-aizawl@mizoram.gov.in',
      controlRoom: 'Aizawl DC Office Complex, Treasury Square',
    },
    {
      district: 'East Jaintia Hills (Meghalaya)',
      officer: 'Dr. S. Sangma (IAS), Deputy Commissioner & DDMA Chair',
      deocPhone: '+91-3655-230221',
      email: 'dc-ejh-meg@gov.in',
      controlRoom: 'Khliehriat District Emergency Operation Centre',
    },
    {
      district: 'East Khasi Hills (Meghalaya)',
      officer: 'Smti. R. Lyngdoh (IAS), Deputy Commissioner Shillong',
      deocPhone: '+91-364-2224010 / 1077',
      email: 'dc-ekh-meg@nic.in',
      controlRoom: 'Shillong DC Office Control Room',
    },
    {
      district: 'Dima Hasao (Assam)',
      officer: 'Shri D. Hojai (ACS), Executive Magistrate & DDMA Officer',
      deocPhone: '+91-3673-236224',
      email: 'ddma-dimahasao@assam.gov.in',
      controlRoom: 'Haflong Emergency Control Room',
    },
    {
      district: 'West Kameng (Arunachal Pradesh)',
      officer: 'Col. V. Nair (BRO) / DC Bomdila',
      deocPhone: '+91-3780-222212',
      email: 'dc-westkameng@arunachal.gov.in',
      controlRoom: 'Bomdila District Headquarters',
    },
    {
      district: 'East Sikkim (Sikkim)',
      officer: 'Shri T. Bhutia (SCS), Addl District Magistrate Gangtok',
      deocPhone: '+91-3592-202695',
      email: 'dc-eastsikkim@sikkim.gov.in',
      controlRoom: 'Gangtok District Control Centre',
    },
  ];

  return (
    <div className="space-y-6" id="public-registry-tab">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] border border-blue-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 08 &bull; PUBLIC REGISTRY & VERIFICATION
            </span>
            <span className="text-xs text-slate-500 font-medium">GIGW 3.0 & RTI Disclosure Portal</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Official Document Verification & Emergency Authority Directory
          </h2>
          <p className="text-xs text-slate-600">
            Verify the digital authenticity of Gazette orders, view district nodal officer contact registries, and inspect ISO 27001 audit credentials.
          </p>
        </div>
      </div>

      {/* 2. Gazette SitRep Barcode / Reference Verification Card */}
      <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            SitRep Gazette Notification Authenticity Checker
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">SHA-256 Digital Verification</span>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={searchSitRepId}
            onChange={(e) => {
              setSearchSitRepId(e.target.value);
              setVerificationResult(null);
            }}
            placeholder="Enter Gazette Ref / SitRep ID (e.g. NDMA-SITREP-NER-2026-0908-01)"
            className="w-full sm:flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs font-mono focus:bg-white focus:outline-hidden focus:border-[#002D62]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#002D62] hover:bg-[#003d82] text-white font-semibold text-xs rounded-sm transition-colors cursor-pointer"
          >
            Verify Authenticity
          </button>
        </form>

        {verificationResult === 'VALID' && (
          <div className="p-4 bg-emerald-50 border-l-4 border-l-emerald-600 border border-emerald-300 rounded-sm space-y-2 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>OFFICIALLY VERIFIED: Gazette Notification is authentic and legally active.</span>
            </div>
            <p className="text-slate-700 text-[11px] font-mono">
              Ref: NDMA-SITREP-NER-2026-0908-01 &bull; Signed by Director General NDMA &bull; Timestamp: 08 Sep 2026, 07:30 IST
            </p>
            <button
              onClick={onOpenSitRep}
              className="mt-1 px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-sm text-xs font-semibold transition-colors cursor-pointer"
            >
              View Full Gazette Document &rarr;
            </button>
          </div>
        )}

        {verificationResult === 'NOT_FOUND' && (
          <div className="p-3 bg-red-50 border-l-4 border-l-red-600 border border-red-300 rounded-sm text-xs text-red-900 font-semibold animate-in fade-in">
            ⚠️ Record not found in central registry. Please verify the Gazette Reference Number or test with <code>NDMA-SITREP-NER-2026-0908-01</code>.
          </div>
        )}
      </div>

      {/* 3. District Emergency Operations Center (DEOC) Helpline Directory */}
      <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#002D62]" />
              District Emergency Operation Centres (DEOC) Nodal Directory
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">24x7 Statutory Control Rooms & District Magistrate contacts</p>
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-300">
            6 Nodal Districts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {districtOfficers.map((d, i) => (
            <div
              key={i}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-2 text-xs hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{d.district}</span>
                <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] text-[10px] font-bold rounded-full">
                  24x7 ACTIVE
                </span>
              </div>

              <p className="text-slate-800 font-semibold text-xs">{d.officer}</p>

              <div className="space-y-1 text-[11px] text-slate-600 font-mono border-t border-slate-200/80 pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#002D62]" />
                  <span>Control Helpline: <strong>{d.deocPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">✉️</span>
                  <span>E-mail: <strong>{d.email}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📍</span>
                  <span>Base: {d.controlRoom}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
