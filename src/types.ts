export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'NORMAL';
export type TrendDirection = 'INCREASING' | 'STABLE' | 'DECREASING';
export type FreshnessStatus = 'FRESH' | 'MODERATE' | 'STALE' | 'REFERENCE';

export interface HazardZone {
  id: string;
  name: string;
  state: string;
  district: string;
  highway: string;
  lat: number;
  lng: number;
  risk: number;
  severity: RiskSeverity;
  trend: TrendDirection;
  confidence: number;
  rainfall_mm_hr: number;
  soil_saturation_pct: number;
  slope_gradient_deg: number;
  pore_pressure_kpa: number;
  insar_velocity_mm_yr: number;
  population_exposed: number;
  lastUpdated: string;
  activeAlert?: string;
  recommendedAction: string;
  nodalOfficer: string;
  contactNumber: string;
}

export interface TelemetrySource {
  id: string;
  name: string;
  category: 'AWS Rainfall' | 'TDR Soil Sensor' | 'InSAR Radar' | 'Piezometer' | 'LiDAR DEM' | 'Seismic Tremor';
  stationCount: number;
  lastSync: string;
  freshness: FreshnessStatus;
  confidencePct: number;
  packetLossPct: number;
  status: 'OPERATIONAL' | 'DEGRADED' | 'CALIBRATING';
}

export interface XAiDriver {
  factor: string;
  category: 'Atmospheric' | 'Geotechnical' | 'Topographic' | 'Historical' | 'Anthropogenic';
  contributionPct: number;
  observedValue: string;
  baselineThreshold: string;
  riskWeight: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
}

export interface EvacuationRoute {
  id: string;
  name: string;
  corridor: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  estimatedTimeMin: number;
  riskScore: number;
  severity: RiskSeverity;
  status: 'RECOMMENDED' | 'AVOID' | 'RESTRICTED' | 'ESCORT_ONLY';
  roadCondition: string;
  bottlenecks: string[];
  safeHavens: string[];
  lastInspectedBy: string;
}

export interface CapAlert {
  id: string;
  capRefId: string;
  headline: string;
  zoneId: string;
  zoneName: string;
  district: string;
  state: string;
  severity: RiskSeverity;
  urgency: 'Immediate' | 'Expected' | 'Future';
  certainty: 'Observed' | 'Likely' | 'Possible';
  effectiveTime: string;
  expiresTime: string;
  sender: string;
  description: string;
  instruction: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  broadcastChannels: string[];
}

export interface FieldReport {
  id: string;
  incidentType: 'Crack / Slope Movement' | 'Active Landslide' | 'Blocked Roadway' | 'Flash Flood Debris' | 'Culvert Collapse';
  location: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  description: string;
  severity: RiskSeverity;
  timestamp: string;
  reporterRole: 'Citizen' | 'Village Council Volunteer' | 'GSI Field Geologist' | 'BRO Patrol' | 'PWD Inspector';
  reporterName: string;
  verificationScore: number;
  status: 'AI_VERIFIED' | 'REVIEW_REQUIRED' | 'DISPATCHED_NDRF' | 'RESOLVED';
  photoUrl?: string;
  droneInspectionRequired: boolean;
}

export interface ResponseResource {
  id: string;
  unitName: string;
  agency: 'NDRF' | 'SDRF' | 'BRO' | 'PWD' | 'State Police' | 'Health & Medical';
  stationBase: string;
  personnelCount: number;
  equipment: string[];
  readinessStatus: 'DEPLOYED' | 'STAGED' | 'STANDBY' | 'MAINTENANCE';
  assignedZone: string;
  commandingOfficer: string;
  etaMinutes: number;
}

export interface HistoricalReplayFrame {
  timestamp: string;
  hourLabel: string;
  rainfallMmHr: number;
  cumulativeRainfall24h: number;
  soilMoisturePct: number;
  porePressureKpa: number;
  slopeDisplacementMm: number;
  riskScore: number;
  severity: RiskSeverity;
  phaseTitle: string;
  eventDescription: string;
  advisoryIssued: string;
}

export interface SituationReport {
  reportId: string;
  gazetteNumber: string;
  dateGenerated: string;
  generatedBy: string;
  nationalThreatLevel: RiskSeverity;
  overallScore: number;
  criticalZonesCount: number;
  highRiskZonesCount: number;
  displacedPersons: number;
  sheltersOperational: number;
  ndrfTeamsEngaged: number;
  summaryText: string;
  keyDirectives: string[];
  digitalSignatureHash: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  source?: string;
  isUrgent?: boolean;
}
