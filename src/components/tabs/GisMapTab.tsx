import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { HazardZone, EvacuationRoute, FieldReport } from '../../types';
import {
  MapPin,
  Layers,
  Route as RouteIcon,
  Navigation,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  Compass,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface GisProps {
  zones: HazardZone[];
  routes: EvacuationRoute[];
  reports: FieldReport[];
  onSelectZone: (zoneId: string) => void;
}

export const GisMapTab: React.FC<GisProps> = ({
  zones,
  routes,
  reports,
  onSelectZone,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [selectedRouteId, setSelectedRouteId] = useState<string>(routes[0]?.id || 'r1');
  const [showHazardZones, setShowHazardZones] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showCitizenReports, setShowCitizenReports] = useState(true);
  const [activeZoneCard, setActiveZoneCard] = useState<HazardZone | null>(zones[0] || null);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [24.8, 92.8],
        zoom: 7,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &bull; National GIS Portal',
        maxZoom: 18,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const layerGroup = layerGroupRef.current;
    if (layerGroup) {
      layerGroup.clearLayers();

      // 1. Add Hazard Zones Pins & Hazard Circles
      if (showHazardZones) {
        zones.forEach((zone) => {
          const isCrit = zone.severity === 'CRITICAL';
          const isHigh = zone.severity === 'HIGH';
          const color = isCrit ? '#b91c1c' : isHigh ? '#d97706' : '#15803d';

          // Circle overlay
          L.circle([zone.lat, zone.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.25,
            radius: isCrit ? 18000 : 12000,
            weight: 2,
          }).addTo(layerGroup);

          // Marker
          const marker = L.circleMarker([zone.lat, zone.lng], {
            radius: 9,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
          }).addTo(layerGroup);

          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
              <strong style="color: ${color};">${zone.severity} ALERT</strong><br/>
              <b>${zone.name}</b><br/>
              Risk: <b>${zone.risk}%</b> | Rain: ${zone.rainfall_mm_hr} mm/hr<br/>
              <em>${zone.highway}</em>
            </div>
          `);

          marker.on('click', () => {
            setActiveZoneCard(zone);
          });
        });
      }

      // 2. Add Designated Evacuation Shelters
      if (showShelters) {
        const shelters = [
          { name: 'Lengpui NDRF Base Shelter', lat: 23.864, lng: 92.628, cap: 1500 },
          { name: 'Selesih Veterinary College Sports Complex', lat: 23.784, lng: 92.748, cap: 2400 },
          { name: 'Khliehriat Indoor Stadium Relief Hub', lat: 25.352, lng: 92.366, cap: 1800 },
          { name: 'Maibang Higher Secondary School Shelter', lat: 25.295, lng: 93.164, cap: 1200 },
        ];

        shelters.forEach((sh) => {
          const marker = L.circleMarker([sh.lat, sh.lng], {
            radius: 7,
            fillColor: '#2563eb',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.95,
          }).addTo(layerGroup);

          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px;">
              <strong style="color: #1d4ed8;">🏥 DESIGNATED EVACUATION SHELTER</strong><br/>
              <b>${sh.name}</b><br/>
              Capacity: <b>${sh.cap} Persons</b> &bull; Medical Ready
            </div>
          `);
        });
      }

      // 3. Add Live Field Reports
      if (showCitizenReports) {
        reports.forEach((rep) => {
          const marker = L.circleMarker([rep.latitude, rep.longitude], {
            radius: 6,
            fillColor: '#9333ea',
            color: '#ffffff',
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.9,
          }).addTo(layerGroup);

          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 11px;">
              <strong style="color: #7e22ce;">📍 VERIFIED FIELD REPORT</strong><br/>
              <b>${rep.incidentType}</b><br/>
              Location: ${rep.location}<br/>
              Score: <b>${rep.verificationScore}% Verified</b>
            </div>
          `);
        });
      }
    }
  }, [zones, reports, showHazardZones, showShelters, showCitizenReports]);

  const currentRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="space-y-6" id="gis-map-tab">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-sm border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-[#002D62] border border-blue-200 rounded-sm text-[10px] font-bold uppercase tracking-wider font-mono">
              PHASE 03 &bull; GIS & SAFE EVACUATION
            </span>
            <span className="text-xs text-slate-500 font-medium">National Geotechnical Spatial Information System</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Real-Time GIS Hazard Layer & Evacuation Corridor Optimizer
          </h2>
          <p className="text-xs text-slate-600">
            Interactive spatial telemetry layer displaying active landslide risk envelopes, road blockages, bridge health, and safe evacuation corridors.
          </p>
        </div>

        {/* Map Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowHazardZones(!showHazardZones)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              showHazardZones
                ? 'bg-red-50 text-red-900 border-red-300'
                : 'bg-slate-50 text-slate-600 border-slate-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Hazard Zones</span>
          </button>

          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              showShelters
                ? 'bg-blue-50 text-blue-900 border-blue-300'
                : 'bg-slate-50 text-slate-600 border-slate-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Shelters & Camps</span>
          </button>

          <button
            onClick={() => setShowCitizenReports(!showCitizenReports)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              showCitizenReports
                ? 'bg-purple-50 text-purple-900 border-purple-300'
                : 'bg-slate-50 text-slate-600 border-slate-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span>Field Reports</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Map Container */}
      <div className="bg-white rounded-sm border border-slate-300 shadow-sm overflow-hidden">
        <div className="p-3 bg-[#002D62] text-white flex flex-wrap items-center justify-between text-xs px-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-bold">National Spatial GIS Viewer (Datum: WGS84 &bull; Scale: 1:50,000)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Critical Zone</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> High Risk</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> Designated Shelter</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> Field Report</span>
          </div>
        </div>

        {/* The Leaflet Map DOM Element */}
        <div
          ref={mapContainerRef}
          style={{ height: '480px', width: '100%', zIndex: 1 }}
          className="w-full bg-slate-100"
          id="gis-leaflet-canvas"
        />
      </div>

      {/* 3. Evacuation Corridor Optimizer & Road Risk Split Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Corridor Routing Comparison */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <RouteIcon className="w-4 h-4 text-[#002D62]" />
                Strategic Road Corridor Rerouting & Traffic Advisories
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Statutory route clearance issued in coordination with Border Roads Organisation</p>
            </div>
          </div>

          {/* Route Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {routes.map((route) => {
              const isSelected = route.id === selectedRouteId;
              const isAvoid = route.status === 'AVOID';
              const isRec = route.status === 'RECOMMENDED';
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-4 rounded-sm border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#002D62] bg-blue-50/50 shadow-xs ring-1 ring-[#002D62]'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{route.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isAvoid
                          ? 'bg-red-700 text-white'
                          : isRec
                          ? 'bg-emerald-700 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">{route.corridor}</p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono border-t border-slate-200 pt-2 text-slate-700">
                    <span>🛣️ {route.distanceKm} km</span>
                    <span>⏱️ ~{route.estimatedTimeMin} mins</span>
                    <span className={`font-bold ${isAvoid ? 'text-red-700' : 'text-emerald-700'}`}>
                      Risk: {route.riskScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Route Information Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">
                Corridor Condition Details: {currentRoute.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Inspected by: {currentRoute.lastInspectedBy}
              </span>
            </div>

            <p className="text-slate-700 text-xs leading-relaxed">
              <strong>Status:</strong> {currentRoute.roadCondition}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 bg-red-50/80 border border-red-200 rounded-sm">
                <span className="font-bold text-red-900 text-[11px] block mb-1">⚠️ Active Hazard Bottlenecks:</span>
                <ul className="list-disc list-inside text-[11px] text-red-800 space-y-0.5">
                  {currentRoute.bottlenecks.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-sm">
                <span className="font-bold text-emerald-900 text-[11px] block mb-1">🛡️ Designated Safe Havens on Route:</span>
                <ul className="list-disc list-inside text-[11px] text-emerald-800 space-y-0.5">
                  {currentRoute.safeHavens.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Hazard Zone Inspection Sidecard */}
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-700" />
              Zone Inspector Card
            </h3>
            {activeZoneCard && (
              <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded-full text-[10px]">
                {activeZoneCard.severity}
              </span>
            )}
          </div>

          {activeZoneCard ? (
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{activeZoneCard.name}</h4>
                <p className="text-[11px] text-slate-600">{activeZoneCard.district}, {activeZoneCard.state}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Coordinates: {activeZoneCard.lat.toFixed(4)}&deg;N, {activeZoneCard.lng.toFixed(4)}&deg;E
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-sm border border-slate-200 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px]">Calculated Risk</span>
                  <span className="font-bold text-red-700 text-base">{activeZoneCard.risk}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Precipitation</span>
                  <span className="font-bold text-slate-900">{activeZoneCard.rainfall_mm_hr} mm/hr</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Soil Saturation</span>
                  <span className="font-bold text-slate-900">{activeZoneCard.soil_saturation_pct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Exposed Pop.</span>
                  <span className="font-bold text-slate-900">{activeZoneCard.population_exposed.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-sm text-[11px] text-amber-950">
                <strong>Recommended Action:</strong>
                <p className="mt-0.5 text-slate-800">{activeZoneCard.recommendedAction}</p>
              </div>

              <div className="border-t border-slate-200 pt-2 text-[11px]">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Nodal Officer:</span>
                <span className="font-bold text-slate-900">{activeZoneCard.nodalOfficer}</span>
                <span className="text-slate-600 block font-mono">{activeZoneCard.contactNumber}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Click any circle marker on the map to inspect geotechnical details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
