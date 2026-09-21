import React, { useState } from 'react';
import { HazardZone } from '../../types';
import { XAI_FACTORS_MAP } from '../../data/mockData';
import {
  Brain,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
  Layers,
  FileCheck,
  CheckCircle2,
  RefreshCw,
  Copy,
  Languages,
} from 'lucide-react';

interface AiPredictionProps {
  zones: HazardZone[];
  selectedZoneId: string;
  onSelectZoneId: (id: string) => void;
  language: string;
}

export const AiPredictionTab: React.FC<AiPredictionProps> = ({
  zones,
  selectedZoneId,
  onSelectZoneId,
  language,
}) => {
  const currentZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const xaiDrivers = XAI_FACTORS_MAP[currentZone.id] || XAI_FACTORS_MAP['z1'];

  // Interactive Scenario Stress Testing Sliders
  const [simulatedRainfallAdd, setSimulatedRainfallAdd] = useState<number>(0);
  const [simulatedPorePressureAdd, setSimulatedPorePressureAdd] = useState<number>(0);
  const [simulatedSeismicTremor, setSimulatedSeismicTremor] = useState<number>(0);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [draftLanguage, setDraftLanguage] = useState<string>(language || 'en');

  // Recalculate dynamic stress score
  const dynamicRisk = Math.min(
    100,
    Math.round(
      currentZone.risk +
        simulatedRainfallAdd * 0.25 +
        simulatedPorePressureAdd * 0.3 +
        simulatedSeismicTremor * 6
    )
  );

  const factorOfSafety = Math.max(
    0.65,
    Number((1.42 - dynamicRisk * 0.008).toFixed(2))
  );

  const timeToFailure =
    dynamicRisk >= 90
      ? 'IMPENDING (< 45 min)'
      : dynamicRisk >= 75
      ? 'CRITICAL (1 to 3 hours)'
      : dynamicRisk >= 50
      ? 'MONITORED (12 to 24 hours)'
      : 'STABLE (> 48 hours)';

  // Multilingual Advisory Draft Generation
  const generateAdvisoryText = () => {
    if (draftLanguage === 'hi') {
      return `आपातकालीन निकासी आदेश - जिला मजिस्ट्रेट कार्यालय (${currentZone.district}, ${currentZone.state})\n\nराष्ट्रीय भूस्खलन प्रारंभिक चेतावनी प्रणाली (NER-SHIELD) के अनुसार, ${currentZone.name} क्षेत्र में अत्यधिक वर्षा (${(
        currentZone.rainfall_mm_hr + simulatedRainfallAdd
      ).toFixed(1)} मिमी/घंटा) एवं बढ़े हुए जल दबाव के कारण भूस्खलन का तात्कालिक जोखिम (${dynamicRisk}%) है।\n\nआपदा प्रबंधन अधिनियम 2005 की धारा 34 के तहत निम्नलिखित निर्देश जारी किए जाते हैं:\n1. ढलान के 300 मीटर के भीतर स्थित सभी बस्तियों को तत्काल खाली कराया जाए।\n2. ${currentZone.highway} पर सभी प्रकार के भारी यातायात को तत्काल रोका जाए।\n3. एनडीआरएफ एवं स्वास्थ्य दलों को तुरंत सक्रिय किया जाए।\n\nहस्ताक्षर: जिला मजिस्ट्रेट एवं अध्यक्ष, जिला आपदा प्रबंधन प्राधिकरण।`;
    }
    if (draftLanguage === 'mz') {
      return `THUPEK CHHUAHTU: DISTRICT DISASTER MANAGEMENT AUTHORITY (${currentZone.district}, ${currentZone.state})\n\nNER-SHIELD Disaster Early Warning hnen atanga dawn danin, ${currentZone.name} ah ruahtui tla nasa lutuk (${(
        currentZone.rainfall_mm_hr + simulatedRainfallAdd
      ).toFixed(1)} mm/hr) leh leilung tlahniam avangin leimin hlauhawm (${dynamicRisk}%) a awm mek a ni.\n\nDisaster Management Act 2005 hnuaiah:\n1. Chhehvel a chengte himna hmunah insaseng nghal tur a ni.\n2. ${currentZone.highway} kawngpui khar lailawk a ni.\n3. NDRF leh Relief team te hriattir nghal an ni.\n\nSd/- District Magistrate / DC ${currentZone.district}`;
    }
    return `STATUTORY EMERGENCY ADVISORY & EVACUATION ORDER\nOFFICE OF THE DISTRICT MAGISTRATE & DDMA (${currentZone.district.toUpperCase()}, ${currentZone.state.toUpperCase()})\n\nIn accordance with the National Landslide Early Warning System (NER-SHIELD), slope geotechnical sensors at ${currentZone.name} have confirmed critical hazard probability of ${dynamicRisk}% (Rainfall intensity: ${(
      currentZone.rainfall_mm_hr + simulatedRainfallAdd
    ).toFixed(1)} mm/hr, Factor of Safety: ${factorOfSafety}).\n\nUnder Section 34 of the Disaster Management Act, 2005, the following mandatory directives are enforced:\n1. IMMEDIATE PRE-EMPTIVE EVACUATION: Evacuate all residential structures within 300m of the slope crest to designated relief centers.\n2. HIGHWAY CORRIDOR RESTRICTION: Close ${currentZone.highway} to all non-emergency civilian transit; activate designated bypass routes.\n3. FIRST RESPONDER MOBILIZATION: Direct NDRF Battalions and PWD Heavy Excavator units to forward staging camps.\n\nAuthorized by: ${currentZone.nodalOfficer}\nIssued via: Joint Central Landslide Warning Cell & NDMA`;
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generateAdvisoryText());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="space-y-6" id="ai-prediction-tab">
      {/* 1. Header & Corridor Selector */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 02 &bull; EXPLAINABLE AI (XAI)
            </span>
            <span className="text-xs text-slate-500 font-medium">SHAP Feature Attribution Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Explainable AI Landslide Risk & Factor Attribution
          </h2>
          <p className="text-xs text-slate-600">
            Physics-informed machine learning synthesizing geotechnical shear limit equilibrium with multi-temporal satellite radar InSAR deformation.
          </p>
        </div>

        {/* Corridor Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <label className="text-xs font-semibold text-slate-700">Select Corridor:</label>
          <select
            value={selectedZoneId}
            onChange={(e) => {
              onSelectZoneId(e.target.value);
              setSimulatedRainfallAdd(0);
              setSimulatedPorePressureAdd(0);
              setSimulatedSeismicTremor(0);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#002D62] cursor-pointer shadow-xs max-w-xs"
            id="ai-zone-select"
          >
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} ({z.risk}% {z.severity})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Top Metric Cards for Selected Zone with Professional Polish Left Accent Borders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border-l-4 border-red-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Calculated Risk Score</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-700 font-mono">{dynamicRisk}%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 uppercase">
              {dynamicRisk >= 85 ? 'CRITICAL' : dynamicRisk >= 70 ? 'HIGH' : 'MODERATE'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">Baseline: {currentZone.risk}%</span>
        </div>

        <div className="bg-white border-l-4 border-amber-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Geotechnical Safety Margin</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-mono">Fs {factorOfSafety}</span>
            <span className="text-xs text-slate-500 font-medium">Limit Equilibrium</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
            {factorOfSafety < 1.0 ? '🚨 Fs < 1.0 (Slope Unstable)' : '⚠️ Margin Depleted'}
          </span>
        </div>

        <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Estimated Time-to-Failure</span>
          <div className="mt-2 text-base font-bold text-red-800">
            {timeToFailure}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Based on shear strain velocity</span>
        </div>

        <div className="bg-white border-l-4 border-[#002D62] p-4 shadow-sm border-y border-r border-slate-200 rounded-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Responsible Nodal Authority</span>
          <div className="mt-1 text-xs font-bold text-slate-900 line-clamp-2">
            {currentZone.nodalOfficer}
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">{currentZone.contactNumber}</span>
        </div>
      </div>

      {/* 3. Two Column Split: XAI SHAP Attribution & What-If Stress Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Why is this risk? (XAI Feature Breakdown) */}
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-700" />
                Explainable Geotechnical Drivers (SHAP Values)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Exact physical contribution percentage to the hazard index</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-sm font-mono font-bold">
              ISO-AI COMPLIANT
            </span>
          </div>

          <div className="space-y-3">
            {xaiDrivers.map((driver, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 rounded-sm border border-slate-200 space-y-2 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{driver.factor}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-sm font-mono font-semibold">
                      {driver.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-purple-800 font-mono">
                    +{driver.contributionPct}% Risk
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-700 h-2 rounded-full"
                    style={{ width: `${driver.contributionPct * 2.5}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                  <span>Observed: <strong>{driver.observedValue}</strong></span>
                  <span className="text-slate-500">Threshold: {driver.baselineThreshold}</span>
                </div>

                <p className="text-[11px] text-slate-700 font-sans leading-relaxed border-t border-slate-200/80 pt-1.5 mt-1">
                  {driver.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Scenario Stress Simulator & Multilingual Advisory Draft */}
        <div className="space-y-6">
          {/* Interactive Stress Tester Card */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#002D62]" />
                  What-If Scenario Stress Testing Simulator
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">Simulate impending cloudburst or seismic triggers</p>
              </div>
              <button
                onClick={() => {
                  setSimulatedRainfallAdd(0);
                  setSimulatedPorePressureAdd(0);
                  setSimulatedSeismicTremor(0);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                title="Reset simulation parameters"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Slider 1: Simulated Rainfall Influx */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>🌧️ Additional Cloudburst Rainfall:</span>
                <span className="font-mono text-blue-700 font-bold">+{simulatedRainfallAdd} mm/hr</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={simulatedRainfallAdd}
                onChange={(e) => setSimulatedRainfallAdd(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#002D62]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Current AWS: {currentZone.rainfall_mm_hr} mm</span>
                <span>Max Cloudburst: +80 mm/hr</span>
              </div>
            </div>

            {/* Slider 2: Pore Water Overpressure */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>💧 Pore Water Pressure Surge:</span>
                <span className="font-mono text-indigo-700 font-bold">+{simulatedPorePressureAdd} kPa</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={simulatedPorePressureAdd}
                onChange={(e) => setSimulatedPorePressureAdd(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Base Piezometer: {currentZone.pore_pressure_kpa} kPa</span>
                <span>Critical Limit: 160 kPa</span>
              </div>
            </div>

            {/* Slider 3: Seismic Micro-Tremor */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>⚡ Micro-Tremor Intensity:</span>
                <span className="font-mono text-red-700 font-bold">M {simulatedSeismicTremor.toFixed(1)} Richter</span>
              </div>
              <input
                type="range"
                min="0"
                max="4.5"
                step="0.5"
                value={simulatedSeismicTremor}
                onChange={(e) => setSimulatedSeismicTremor(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Quiet (M0.0)</span>
                <span>Moderate Shaking (M4.5)</span>
              </div>
            </div>
          </div>

          {/* Multilingual Official Evacuation Advisory Generator */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Official DM Advisory Draft Generator
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={draftLanguage}
                  onChange={(e) => setDraftLanguage(e.target.value)}
                  className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-sm text-xs font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="en">English (Official Gazette)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="mz">Mizo (Local District)</option>
                </select>

                <button
                  onClick={handleCopyDraft}
                  className="px-3 py-1.5 bg-[#002D62] hover:bg-[#003d82] text-white rounded-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  {copiedDraft ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <textarea
              readOnly
              rows={8}
              value={generateAdvisoryText()}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-sm font-mono text-[11px] text-slate-900 leading-relaxed resize-none focus:outline-hidden"
            />
            <p className="text-[10px] text-slate-500 font-sans">
              Statutory notice formatted in compliance with the National Disaster Management Guidelines for Landslide Risk Reduction (2026).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
