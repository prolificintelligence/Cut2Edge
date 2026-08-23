export interface AgentStepTrace {
  id: string;
  name: string;
  agent: "WhatsApp OCR Parser" | "Nesting Engine" | "Inngest Orchestrator" | "Mem0 Memory" | "Machine Sentinel";
  status: "completed" | "in_progress" | "pending";
  latencyMs: number;
  tokens?: number;
  outputPayload: string;
}

export const SAMPLE_WHATSAPP_RAW_INPUT = `
*WhatsApp Message from Master Tunde (+234 803 445 9182)*:
"Good morning Cut2Edge. Abeg see my cutlist for Victoria Island kitchen job:
1. Base cabinet sides: 870mm by 580mm, 8 pcs, 1mm tape front and top
2. Base shelf: 564mm by 550mm, 12 pcs, 1mm front only
3. Tall pantry shaker doors: 2150mm by 595mm, 4 pcs, 2mm tape all 4 sides
4. Drawer fronts: 895mm by 295mm, 6 pcs, 2mm all round
Material: 18mm High Gloss White MDF (14 sheets total).
Pls make sure grain follows height. Calculate money let me pay deposit now now."
`;

export const SIMULATED_PARSED_JSON = {
  client: "Babatunde Alabi",
  phone: "+234 803 445 9182",
  boardType: "18mm High Gloss UV MDF (Pure White)",
  totalSheetsEstimated: 14,
  calculatedLinearMeters: 284.5,
  panels: [
    { label: "Base Cabinet Side (L)", length: 870, width: 580, qty: 8, edge: "1mm (Top, Left)" },
    { label: "Base Cabinet Shelf", length: 564, width: 550, qty: 12, edge: "1mm (Top)" },
    { label: "Tall Pantry Shaker Door", length: 2150, width: 595, qty: 4, edge: "2mm (All 4 sides)" },
    { label: "Drawer Fronts (Large)", length: 895, width: 295, qty: 6, edge: "2mm (All 4 sides)" }
  ],
  pricingSummary: {
    sheetCutting: "14 sheets x ₦3,500 = ₦49,000",
    edgeBanding1mm: "148.5 lm x ₦480 = ₦71,280",
    edgeBanding2mm: "136.0 lm x ₦750 = ₦102,000",
    grossTotal: 222280,
    loyaltyDiscount7_5Pct: -16671,
    netPayable: 205609,
    requiredDeposit70Pct: 143926
  }
};

export const SIMULATED_INNGEST_STEPS: AgentStepTrace[] = [
  {
    id: "step-1",
    name: "whatsapp.message.received",
    agent: "WhatsApp OCR Parser",
    status: "completed",
    latencyMs: 340,
    tokens: 420,
    outputPayload: "Extracted 4 unique panel specs (30 total pieces) from carpenter WhatsApp text/image."
  },
  {
    id: "step-2",
    name: "mem0.recall_client_context",
    agent: "Mem0 Memory",
    status: "completed",
    latencyMs: 120,
    tokens: 180,
    outputPayload: "Recalled Client ID 'mem-1': Gold Partner tier applied (-7.5% trade discount), preferred 2mm tape on drawer fronts verified."
  },
  {
    id: "step-3",
    name: "nesting.optimize_cutting_yield",
    agent: "Nesting Engine",
    status: "completed",
    latencyMs: 680,
    tokens: 0,
    outputPayload: "2D Bin-packing algorithm executed across 14 standard 2440x1220mm sheets. Yield efficiency: 92.4% (Scrap waste: 7.6%). Total cuts: 78."
  },
  {
    id: "step-4",
    name: "accounting.generate_boq_and_invoice",
    agent: "Inngest Orchestrator",
    status: "completed",
    latencyMs: 210,
    tokens: 150,
    outputPayload: "Invoice #INV-2026-891 generated (₦205,609). 70% deposit payment link (₦143,926) dispatched via WhatsApp webhook."
  },
  {
    id: "step-5",
    name: "station.dispatch_to_panel_saw",
    agent: "Inngest Orchestrator",
    status: "in_progress",
    latencyMs: 180,
    tokens: 0,
    outputPayload: "Deposit confirmed via Paystack. Job C2E-2026-891 auto-routed to Panel Saw Station #1 Kiosk. Barcode label sequence primed."
  }
];
