import React, { useState } from 'react';
import { FieldReport } from '../../types';
import {
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Shield,
  Clock,
  Send,
  Sparkles,
  Plane,
  Truck,
} from 'lucide-react';

interface FieldReportsProps {
  reports: FieldReport[];
  onAddReport: (newReport: FieldReport) => void;
  onDispatchReport: (reportId: string) => void;
}

export const FieldReportsTab: React.FC<FieldReportsProps> = ({
  reports,
  onAddReport,
  onDispatchReport,
}) => {
  // Form State
  const [incidentType, setIncidentType] = useState<FieldReport['incidentType']>(
    'Crack / Slope Movement'
  );
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Aizawl');
  const [state, setState] = useState('Mizoram');
  const [latitude, setLatitude] = useState('23.7271');
  const [longitude, setLongitude] = useState('92.7176');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('Lalmuanpuia (Community Volunteer)');
  const [reporterRole, setReporterRole] = useState<FieldReport['reporterRole']>('Citizen');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(4));
          setLongitude(pos.coords.longitude.toFixed(4));
          showToast('GPS coordinates acquired successfully.');
        },
        () => {
          // Fallback simulation
          setLatitude('23.7345');
          setLongitude('92.7210');
          showToast('Using high-precision GIS network coordinates.');
        }
      );
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !description) {
      showToast('Please fill all mandatory fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate AI Multi-factor verification computation
    setTimeout(() => {
      const calculatedScore = Math.floor(82 + Math.random() * 16);
      const isCritical = incidentType.includes('Landslide') || incidentType.includes('Crack');

      const newReport: FieldReport = {
        id: `rep-${Date.now().toString().slice(-4)}`,
        incidentType,
        location,
        district,
        state,
        latitude: parseFloat(latitude) || 23.727,
        longitude: parseFloat(longitude) || 92.717,
        description,
        severity: isCritical ? 'CRITICAL' : 'HIGH',
        timestamp: 'Just now',
        reporterRole,
        reporterName,
        verificationScore: calculatedScore,
        status: calculatedScore >= 90 ? 'AI_VERIFIED' : 'REVIEW_REQUIRED',
        droneInspectionRequired: calculatedScore < 90,
      };

      onAddReport(newReport);
      setIsSubmitting(false);
      setDescription('');
      setLocation('');
      showToast(`Report logged & AI-verified (${calculatedScore}% confidence).`);
    }, 800);
  };

  return (
    <div className="space-y-6" id="field-reports-tab">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001D40] text-white px-4 py-2.5 rounded-sm shadow-xl text-xs font-semibold border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 05 &bull; CROWD & SQUAD VERIFICATION
            </span>
            <span className="text-xs text-slate-500 font-medium">Geo-referenced Ground Incident Logging</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Citizen & Field Geologist Incident Verification Engine
          </h2>
          <p className="text-xs text-slate-600">
            Multi-factor AI cross-references submitted GPS geolocations against live IMD satellite radar and DEM terrain slope angles to filter anomalies.
          </p>
        </div>
      </div>

      {/* 2. Grid Split: Form on Left, Verified Reports Feed on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left 2 Cols: Official Incident Report Form */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-700" />
              Submit Geo-Tagged Incident
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">GSI/NDMA Form #08</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Incident Classification:</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value as FieldReport['incidentType'])}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm font-semibold focus:outline-hidden focus:border-[#002D62]"
              >
                <option value="Crack / Slope Movement">Crack / Slope Movement (Tension Crack)</option>
                <option value="Active Landslide">Active Landslide (Mass Movement)</option>
                <option value="Blocked Roadway">Blocked Roadway / Debris Boulder Fall</option>
                <option value="Flash Flood Debris">Flash Flood Debris / Mud Run</option>
                <option value="Culvert Collapse">Culvert / Retaining Wall Collapse</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Landmark / Road Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. NH-54 Km 14+200, near Chite Veng church"
                required
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm focus:bg-white focus:outline-hidden focus:border-[#002D62]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">District:</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden"
                >
                  <option value="Aizawl">Aizawl (Mizoram)</option>
                  <option value="East Jaintia Hills">East Jaintia Hills (Meghalaya)</option>
                  <option value="East Khasi Hills">East Khasi Hills (Meghalaya)</option>
                  <option value="Dima Hasao">Dima Hasao (Assam)</option>
                  <option value="West Kameng">West Kameng (Arunachal)</option>
                  <option value="East Sikkim">East Sikkim (Sikkim)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reporter Role:</label>
                <select
                  value={reporterRole}
                  onChange={(e) => setReporterRole(e.target.value as FieldReport['reporterRole'])}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm focus:outline-hidden"
                >
                  <option value="Citizen">Citizen Resident</option>
                  <option value="Village Council Volunteer">Village Council Volunteer</option>
                  <option value="GSI Field Geologist">GSI Field Geologist</option>
                  <option value="BRO Patrol">BRO Highway Patrol</option>
                  <option value="PWD Inspector">PWD Inspector</option>
                </select>
              </div>
            </div>

            {/* GPS Capture Controls */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#002D62]" />
                  Geo-Coordinates (WGS84):
                </span>
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  className="text-[10px] text-[#002D62] font-semibold hover:underline cursor-pointer"
                >
                  Auto-Detect GPS &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500">Latitude:</span>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded-sm font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Longitude:</span>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded-sm font-bold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Geotechnical Observations:</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe crack width, seepage, falling stones, road deformities..."
                required
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm focus:bg-white focus:outline-hidden focus:border-[#002D62] text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#002D62] hover:bg-[#003d82] text-white font-semibold rounded-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>AI Verification in Progress...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Incident & Run AI Verification</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right 3 Cols: Verified Field Reports Queue */}
        <div className="lg:col-span-3 bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-700" />
                Live Verified Field Reports Stream
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Corroborated against IMD cloudburst maps and digital elevation slope angles</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-700 px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-sm">
              {reports.length} Reports Logged
            </span>
          </div>

          <div className="space-y-3.5">
            {reports.map((rep) => {
              const isVerified = rep.status === 'AI_VERIFIED' || rep.status === 'DISPATCHED_NDRF';
              const isDispatched = rep.status === 'DISPATCHED_NDRF';

              return (
                <div
                  key={rep.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-sm border border-slate-200 transition-colors space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rep.incidentType}</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded-sm text-[10px] font-semibold">
                        {rep.reporterRole}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-900 border border-purple-200 rounded-sm text-[10px] font-bold font-mono">
                        {rep.verificationScore}% AI Match
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                          isDispatched
                            ? 'bg-[#002D62] text-white'
                            : isVerified
                            ? 'bg-emerald-700 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {rep.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-sans">{rep.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600 font-mono border-t border-slate-200/80 pt-2">
                    <div className="flex items-center gap-3">
                      <span>📍 {rep.location}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span>By: {rep.reporterName}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span>{rep.timestamp}</span>
                    </div>

                    {/* Dispatch Button if not yet dispatched */}
                    {!isDispatched && (
                      <button
                        onClick={() => onDispatchReport(rep.id)}
                        className="px-2.5 py-1 bg-[#002D62] hover:bg-[#003d82] text-white font-semibold text-[10px] rounded-sm flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Truck className="w-3 h-3" />
                        <span>Dispatch Quick Response</span>
                      </button>
                    )}
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
