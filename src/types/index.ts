export type RoleType =
  | "public"
  | "client_portal"
  | "kiosks"
  | "agents"
  | "turnkey"
  | "executive";

export type ClientCategory =
  | "door_supplier"
  | "cabinetry_maker"
  | "direct_client"
  | "ecosystem_vendor";

export type EdgeTapeType = "none" | "0.8mm" | "1.0mm" | "2.0mm";

export interface CutlistPanel {
  id: string;
  label: string;
  length: number; // mm
  width: number; // mm
  thickness: number; // mm (e.g. 18mm, 9mm)
  quantity: number;
  edgeTop: EdgeTapeType;
  edgeBottom: EdgeTapeType;
  edgeLeft: EdgeTapeType;
  edgeRight: EdgeTapeType;
  material: string;
  grainOrientation: "length" | "width" | "none";
  confidence?: number; // 0 to 1 for OCR detection
}

export type JobStatus =
  | "intake_pending"
  | "deposit_pending"
  | "queued_for_saw"
  | "cutting_in_progress"
  | "edge_banding_queue"
  | "edge_banding_in_progress"
  | "door_press_queue"
  | "door_press_in_progress"
  | "qc_inspection"
  | "ready_for_pickup"
  | "completed_gatepass";

export type StationType =
  | "intake"
  | "panel_saw"
  | "edge_bander"
  | "cnc_router"
  | "membrane_press"
  | "qc_gatepass";

export interface FactoryJob {
  id: string;
  jobCode: string;
  clientName: string;
  clientCategory: ClientCategory;
  phone: string;
  whatsappSynced: boolean;
  boardType: string;
  sheetCount: number;
  totalLinearMeters: number;
  totalCuts: number;
  status: JobStatus;
  currentStation: StationType;
  totalAmount: number;
  depositPaid: number;
  balanceDue: number;
  createdAt: string;
  estimatedCompletion: string;
  priority: "standard" | "urgent" | "vip";
  panels: CutlistPanel[];
  nestingEfficiencyPct: number;
  qrCodeUrl: string;
  notes?: string;
  actualDurationMins?: number;
  completedAt?: string;
  operatorName?: string;
}

export interface DoorProcessingJob {
  id: string;
  orderCode: string;
  clientName: string;
  phone: string;
  doorCategory: "panel_door" | "flush_door" | "grooved_shaker" | "membrane_press";
  coreType: "solid_timber_core" | "semi_solid_honeycomb" | "tubular_chipboard";
  skinType: "3.2mm_hdf_skin" | "6mm_mdf_skin" | "wood_veneer_teak" | "pvc_membrane_foil";
  foilColor: string;
  dimensions: string;
  quantity: number;
  pressCycleTemp: number;
  pressCycleMinutes: number;
  status: "staged" | "pressing" | "trimming" | "qc_approved" | "released";
  costPerDoor: number;
  totalCost: number;
  depositPaid: number;
  readyForPickup: boolean;
  completedAt?: string;
}

export interface TurnkeyMilestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  status: "pending" | "in_progress" | "approved" | "paid";
  description: string;
  dueDate: string;
}

export interface TurnkeyProject {
  id: string;
  projectCode: string;
  title: string;
  clientName: string;
  clientCompany: string;
  location: string;
  scopeType: "luxury_kitchen" | "master_wardrobes" | "full_penthouse_fitout" | "commercial_doors";
  status: "site_survey" | "cad_3d_approval" | "factory_production" | "installation" | "handed_over";
  totalBoQ: number;
  paidAmount: number;
  currentMilestoneIndex: number;
  render3DUrl: string;
  completionPct: number;
  milestones: TurnkeyMilestone[];
  materialSpecs: {
    carcase: string;
    shutters: string;
    hardware: string;
    countertop: string;
    edgeBanding: string;
  };
}

export interface MachineHealthMetrics {
  id: string;
  name: string;
  station: StationType;
  model: string;
  status: "operational" | "warning" | "maintenance_due" | "idle";
  healthPct: number;
  bladeLifeCuts?: number;
  maxBladeCuts?: number;
  gluePotTemp?: number;
  gluePotTarget?: number;
  linearMetersToday: number;
  sheetsCutToday: number;
  powerKwhToday: number;
  lastServiceDate: string;
  nextScheduledService: string;
}

export interface Mem0ClientProfile {
  id: string;
  clientName: string;
  businessName: string;
  phone: string;
  category: ClientCategory;
  loyaltyTier: "Gold Partner" | "Silver Artisan" | "Standard";
  discountRatePct: number;
  favoriteBoard: string;
  preferredTapeThickness: string;
  grainRule: string;
  lifetimeJobsCount: number;
  lifetimeSpend: number;
  lastActive: string;
  customNotes: string[];
}

export interface ChatMessage {
  id: string;
  sender: "client" | "factory_pm" | "system_agent";
  senderName: string;
  senderRole?: string;
  content: string;
  timestamp: string;
  auditHash: string; // Immutable SHA audit verification
  actionBadge?:
    | "CUTLIST_SIGNED_OFF"
    | "PAYMENT_RECEIPT_VERIFIED"
    | "SPEC_REVISION_REQUESTED"
    | "GATEPASS_ISSUED"
    | "SNAG_TICKET_RAISED";
  attachment?: {
    type: "image" | "pdf" | "audio" | "cutlist";
    name: string;
    url: string;
    size?: string;
  };
}

export interface SnagTicket {
  id: string;
  ticketCode: string;
  jobCode: string;
  clientName: string;
  issueType: "tape_color_mismatch" | "size_tolerance" | "surface_chip" | "grain_direction" | "missing_panel";
  description: string;
  reportedAt: string;
  status: "open" | "rework_in_progress" | "resolved_reinspected";
  resolutionAction: string;
  supervisorSignOff: string;
}
