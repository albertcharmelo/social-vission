// ── Client Types ──────────────────────────────────────────────

export type ClientDealStatus =
  | "pending_payment"
  | "paid"
  | "in_progress"
  | "delivered"
  | "revision_requested"
  | "completed"
  | "cancelled";

export type OpportunityStatus = "open" | "in_review" | "closed";

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  stats: {
    totalSpent: number;
    activeDeals: number;
    completedDeals: number;
    totalImpact: number;
    openOpportunities: number;
    serviciosContratados: number;
  };
}

export interface HiredService {
  id: string;
  dealId: string;
  title: string;
  description: string;
  providerName: string;
  providerAvatar: string;
  amount: number;
  status: ClientDealStatus;
  category: string;
  causeName: string;
  impactAmount: number;
  startDate: string;
  dueDate: string;
  deliveredAt?: string;
  completedAt?: string;
}

export interface DealMessage {
  id: string;
  author: "client" | "provider" | "system";
  authorName: string;
  text: string;
  timestamp: string;
  attachment?: string;
}

export interface DealDeliverable {
  id: string;
  name: string;
  type: "file" | "link";
  url: string;
  uploadedAt: string;
}

export interface ClientDeal {
  id: string;
  serviceTitle: string;
  serviceId: string;
  providerName: string;
  providerEmail: string;
  amount: number;
  platformFee: number;
  impactAmount: number;
  netToProvider: number;
  status: ClientDealStatus;
  causeName: string;
  category: string;
  brief: string;
  startDate: string;
  dueDate: string;
  deliveredAt?: string;
  completedAt?: string;
  revisionsAllowed: number;
  revisionsUsed: number;
  messages: DealMessage[];
  deliverables: DealDeliverable[];
  invoiceNumber: string;
  paymentMethod: string;
  paymentDate: string;
}

export interface PublishedOpportunity {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  category: string;
  status: OpportunityStatus;
  proposals: number;
  createdAt: string;
  requirements: string[];
}

export interface OpportunityProposal {
  id: string;
  opportunityId: string;
  providerName: string;
  providerRating: number;
  providerPlan: "free" | "pro";
  message: string;
  price: number;
  deliveryDays: number;
  submittedAt: string;
}

export interface ImpactEntry {
  date: string;
  amount: number;
  causeName: string;
  dealTitle: string;
}

// ── Mock Data ──────────────────────────────────────────────────

export const mockClient: ClientProfile = {
  id: "client-001",
  name: "Juan Perez",
  email: "juan@empresa.com",
  avatar: "",
  joinedAt: "2025-08-10",
  stats: {
    totalSpent: 3170,
    activeDeals: 3,
    completedDeals: 8,
    totalImpact: 317,
    openOpportunities: 2,
    serviciosContratados: 11,
  },
};

export const mockHiredServices: HiredService[] = [
  {
    id: "hs-001",
    dealId: "cd-001",
    title: "Diseno de marca completo",
    description: "Logo, paleta de colores, tipografia y guia de estilo.",
    providerName: "Maria Gonzalez",
    providerAvatar: "",
    amount: 450,
    status: "in_progress",
    category: "Diseno",
    causeName: "Educacion Digital",
    impactAmount: 45,
    startDate: "2026-02-20",
    dueDate: "2026-03-15",
  },
  {
    id: "hs-002",
    dealId: "cd-002",
    title: "Rediseno de sitio web",
    description: "Rediseno completo con enfoque en UX y conversion.",
    providerName: "Carlos Vela",
    providerAvatar: "",
    amount: 800,
    status: "delivered",
    category: "Desarrollo",
    causeName: "Medio Ambiente",
    impactAmount: 80,
    startDate: "2026-02-18",
    dueDate: "2026-03-20",
    deliveredAt: "2026-03-01",
  },
  {
    id: "hs-003",
    dealId: "cd-003",
    title: "Pack redes sociales",
    description: "30 templates editables para Instagram y LinkedIn.",
    providerName: "Ana Reyes",
    providerAvatar: "",
    amount: 150,
    status: "in_progress",
    category: "Marketing",
    causeName: "Educacion Digital",
    impactAmount: 15,
    startDate: "2026-02-25",
    dueDate: "2026-03-10",
  },
  {
    id: "hs-004",
    dealId: "cd-004",
    title: "Consultoria de marca",
    description: "Sesion de 2 horas para definir estrategia de marca.",
    providerName: "Maria Gonzalez",
    providerAvatar: "",
    amount: 120,
    status: "completed",
    category: "Consultoria",
    causeName: "Salud Comunitaria",
    impactAmount: 12,
    startDate: "2026-02-05",
    dueDate: "2026-02-10",
    completedAt: "2026-02-10",
  },
  {
    id: "hs-005",
    dealId: "cd-005",
    title: "Ilustraciones personalizadas",
    description: "Set de 10 ilustraciones vectoriales a medida.",
    providerName: "Sofia Muñoz",
    providerAvatar: "",
    amount: 350,
    status: "completed",
    category: "Diseno",
    causeName: "Educacion Digital",
    impactAmount: 35,
    startDate: "2026-01-15",
    dueDate: "2026-02-01",
    completedAt: "2026-01-30",
  },
  {
    id: "hs-006",
    dealId: "cd-006",
    title: "Motion graphics intro",
    description: "Video animado de 15 segundos para tu marca.",
    providerName: "Diego Paredes",
    providerAvatar: "",
    amount: 250,
    status: "completed",
    category: "Video",
    causeName: "Medio Ambiente",
    impactAmount: 25,
    startDate: "2025-12-10",
    dueDate: "2026-01-05",
    completedAt: "2025-12-28",
  },
  {
    id: "hs-007",
    dealId: "cd-007",
    title: "Pack redes sociales",
    description: "30 templates editables para Instagram y LinkedIn.",
    providerName: "Ana Reyes",
    providerAvatar: "",
    amount: 150,
    status: "cancelled",
    category: "Marketing",
    causeName: "Educacion Digital",
    impactAmount: 0,
    startDate: "2026-01-28",
    dueDate: "2026-02-15",
  },
  {
    id: "hs-008",
    dealId: "cd-008",
    title: "Auditoria visual de marca",
    description: "Analisis completo de tu identidad visual actual.",
    providerName: "Maria Gonzalez",
    providerAvatar: "",
    amount: 200,
    status: "completed",
    category: "Consultoria",
    causeName: "Salud Comunitaria",
    impactAmount: 20,
    startDate: "2025-11-20",
    dueDate: "2025-12-05",
    completedAt: "2025-12-03",
  },
];

export const mockClientDeals: ClientDeal[] = [
  {
    id: "cd-001",
    serviceTitle: "Diseno de marca completo",
    serviceId: "svc-001",
    providerName: "Maria Gonzalez",
    providerEmail: "maria@studio.com",
    amount: 450,
    platformFee: 22.5,
    impactAmount: 45,
    netToProvider: 382.5,
    status: "in_progress",
    causeName: "Educacion Digital",
    category: "Diseno",
    brief: "Necesito una identidad visual completa para mi startup de tecnologia educativa. El logo debe transmitir innovacion y confianza. Paleta en tonos azul y verde.",
    startDate: "2026-02-20",
    dueDate: "2026-03-15",
    revisionsAllowed: 1,
    revisionsUsed: 0,
    invoiceNumber: "INV-2026-0041",
    paymentMethod: "Visa **** 4242",
    paymentDate: "2026-02-20",
    messages: [
      { id: "m1", author: "system", authorName: "Sistema", text: "Trato iniciado. El proveedor ha sido notificado.", timestamp: "2026-02-20T10:00:00" },
      { id: "m2", author: "provider", authorName: "Maria Gonzalez", text: "Hola Juan! He recibido tu brief. Empezare con los conceptos iniciales esta semana.", timestamp: "2026-02-20T11:30:00" },
      { id: "m3", author: "client", authorName: "Juan Perez", text: "Perfecto Maria. Recuerda que el publico objetivo es 25-40 años, sector tecnologico.", timestamp: "2026-02-20T12:00:00" },
      { id: "m4", author: "provider", authorName: "Maria Gonzalez", text: "Anotado. Esta semana te envio los primeros 3 conceptos de logo.", timestamp: "2026-02-21T09:15:00" },
    ],
    deliverables: [],
  },
  {
    id: "cd-002",
    serviceTitle: "Rediseno de sitio web",
    serviceId: "svc-002",
    providerName: "Carlos Vela",
    providerEmail: "carlos@webdev.com",
    amount: 800,
    platformFee: 40,
    impactAmount: 80,
    netToProvider: 680,
    status: "delivered",
    causeName: "Medio Ambiente",
    category: "Desarrollo",
    brief: "Necesito redisenar mi sitio web corporativo. Actualmente es obsoleto y no es mobile-friendly. Quiero un diseno moderno, rapido y con buena conversion.",
    startDate: "2026-02-18",
    dueDate: "2026-03-20",
    deliveredAt: "2026-03-01",
    revisionsAllowed: 1,
    revisionsUsed: 0,
    invoiceNumber: "INV-2026-0038",
    paymentMethod: "Mastercard **** 8901",
    paymentDate: "2026-02-18",
    messages: [
      { id: "m1", author: "system", authorName: "Sistema", text: "Trato iniciado.", timestamp: "2026-02-18T14:00:00" },
      { id: "m2", author: "provider", authorName: "Carlos Vela", text: "Hola! He revisado tu sitio actual. Tengo ideas geniales para modernizarlo.", timestamp: "2026-02-19T10:00:00" },
      { id: "m3", author: "system", authorName: "Sistema", text: "El proveedor ha subido un entregable.", timestamp: "2026-03-01T16:00:00" },
      { id: "m4", author: "provider", authorName: "Carlos Vela", text: "Listo Juan! He subido el sitio rediseñado. Puedes revisarlo en el enlace de abajo.", timestamp: "2026-03-01T16:05:00" },
    ],
    deliverables: [
      { id: "d1", name: "Sitio web rediseñado (preview)", type: "link", url: "https://preview.webdev.com/juan-corp-v2", uploadedAt: "2026-03-01T16:00:00" },
      { id: "d2", name: "Archivos fuente (Figma + código)", type: "file", url: "/deliverables/juan-corp-v2.zip", uploadedAt: "2026-03-01T16:00:00" },
    ],
  },
  {
    id: "cd-004",
    serviceTitle: "Consultoria de marca",
    serviceId: "svc-005",
    providerName: "Maria Gonzalez",
    providerEmail: "maria@studio.com",
    amount: 120,
    platformFee: 6,
    impactAmount: 12,
    netToProvider: 102,
    status: "completed",
    causeName: "Salud Comunitaria",
    category: "Consultoria",
    brief: "Necesito una sesion de consultoria para definir el posicionamiento de mi marca.",
    startDate: "2026-02-05",
    dueDate: "2026-02-10",
    completedAt: "2026-02-10",
    revisionsAllowed: 1,
    revisionsUsed: 0,
    invoiceNumber: "INV-2026-0022",
    paymentMethod: "Visa **** 4242",
    paymentDate: "2026-02-05",
    messages: [
      { id: "m1", author: "system", authorName: "Sistema", text: "Trato completado. Gracias por usar Social Vission!", timestamp: "2026-02-10T11:00:00" },
    ],
    deliverables: [
      { id: "d1", name: "Resumen de sesion de consultoria", type: "file", url: "/deliverables/consultoria-resumen.pdf", uploadedAt: "2026-02-10T10:00:00" },
    ],
  },
];

export const mockClientNotifications = [
  { id: "cn-001", type: "deal" as const, title: "Entrega recibida", description: "Carlos Vela subio los entregables para Rediseno de sitio web.", timestamp: "2026-03-01T16:05:00", read: false },
  { id: "cn-002", type: "opportunity" as const, title: "Nueva propuesta", description: "Recibiste 2 propuestas para Logo para ONG ambiental.", timestamp: "2026-02-28T10:00:00", read: false },
  { id: "cn-003", type: "system" as const, title: "Pago procesado", description: "Se proceso el pago de $450 para Diseno de marca completo.", timestamp: "2026-02-20T10:05:00", read: true },
  { id: "cn-004", type: "deal" as const, title: "Trato iniciado", description: "Ana Reyes acepto tu orden de Pack redes sociales.", timestamp: "2026-02-25T14:00:00", read: true },
  { id: "cn-005", type: "system" as const, title: "Impacto social", description: "Tu compra contribuyo $80 a la causa Medio Ambiente.", timestamp: "2026-02-18T14:10:00", read: true },
  { id: "cn-006", type: "opportunity" as const, title: "Oportunidad cerrada", description: "Tu solicitud Rediseno de newsletter fue cerrada.", timestamp: "2026-02-15T09:00:00", read: true },
  { id: "cn-007", type: "deal" as const, title: "Trato completado", description: "Consultoria de marca fue marcada como completada.", timestamp: "2026-02-10T11:05:00", read: true },
];

export const mockPublishedOpportunities: PublishedOpportunity[] = [
  {
    id: "pub-opp-001",
    title: "Logo para mi startup de tecnologia",
    description: "Busco disenador para crear logo moderno y minimalista para startup edtech. Debe funcionar en blanco y negro y en colores.",
    budget: 300,
    deadline: "2026-03-20",
    category: "Diseno",
    status: "open",
    proposals: 4,
    createdAt: "2026-02-25",
    requirements: ["Vector editable", "Versiones en color y B/N", "Manual basico de uso"],
  },
  {
    id: "pub-opp-002",
    title: "App movil de facturacion simple",
    description: "Necesito una app movil (iOS/Android) muy simple para emitir facturas en campo. Sin backend propio, puede usar APIs de terceros.",
    budget: 1200,
    deadline: "2026-04-15",
    category: "Desarrollo",
    status: "in_review",
    proposals: 7,
    createdAt: "2026-02-10",
    requirements: ["React Native", "PDF export", "Sin servidor propio", "Soporte offline"],
  },
  {
    id: "pub-opp-003",
    title: "Copywriting para landing page",
    description: "Necesito textos persuasivos para mi landing page de SaaS B2B. Que comuniquen el valor claramente.",
    budget: 200,
    deadline: "2026-03-10",
    category: "Marketing",
    status: "closed",
    proposals: 5,
    createdAt: "2026-01-20",
    requirements: ["5 secciones", "Tono profesional", "SEO optimizado"],
  },
];

export const mockOpportunityProposals: OpportunityProposal[] = [
  {
    id: "prop-001",
    opportunityId: "pub-opp-001",
    providerName: "Maria Gonzalez",
    providerRating: 4.8,
    providerPlan: "pro",
    message: "Hola! Tengo 8 años de experiencia en branding y estaria encantada de crear el logo para tu startup edtech. Mi portfolio incluye varios proyectos del sector tecnologico.",
    price: 280,
    deliveryDays: 7,
    submittedAt: "2026-02-26T10:00:00",
  },
  {
    id: "prop-002",
    opportunityId: "pub-opp-001",
    providerName: "Diego Paredes",
    providerRating: 4.5,
    providerPlan: "free",
    message: "Puedo hacer el logo en 5 dias. Trabajo con Illustrator y entrego todos los formatos.",
    price: 250,
    deliveryDays: 5,
    submittedAt: "2026-02-26T14:30:00",
  },
  {
    id: "prop-003",
    opportunityId: "pub-opp-001",
    providerName: "Carolina Vega",
    providerRating: 4.9,
    providerPlan: "pro",
    message: "Especialista en identidad visual para startups tech. Te propongo 3 conceptos iniciales para elegir el que mas te guste.",
    price: 320,
    deliveryDays: 10,
    submittedAt: "2026-02-27T09:00:00",
  },
  {
    id: "prop-004",
    opportunityId: "pub-opp-001",
    providerName: "Felipe Morales",
    providerRating: 4.2,
    providerPlan: "free",
    message: "Disenador con experiencia en logos para el sector digital.",
    price: 200,
    deliveryDays: 7,
    submittedAt: "2026-02-27T16:00:00",
  },
];

export const mockImpactHistory: ImpactEntry[] = [
  { date: "2026-02-20", amount: 45, causeName: "Educacion Digital", dealTitle: "Diseno de marca completo" },
  { date: "2026-02-18", amount: 80, causeName: "Medio Ambiente", dealTitle: "Rediseno de sitio web" },
  { date: "2026-02-25", amount: 15, causeName: "Educacion Digital", dealTitle: "Pack redes sociales" },
  { date: "2026-02-05", amount: 12, causeName: "Salud Comunitaria", dealTitle: "Consultoria de marca" },
  { date: "2026-01-15", amount: 35, causeName: "Educacion Digital", dealTitle: "Ilustraciones personalizadas" },
  { date: "2025-12-10", amount: 25, causeName: "Medio Ambiente", dealTitle: "Motion graphics intro" },
  { date: "2025-11-20", amount: 20, causeName: "Salud Comunitaria", dealTitle: "Auditoria visual de marca" },
  { date: "2025-10-05", amount: 18, causeName: "Educacion Digital", dealTitle: "Pack redes sociales" },
  { date: "2025-09-12", amount: 30, causeName: "Medio Ambiente", dealTitle: "Rediseno de sitio web" },
  { date: "2025-08-20", amount: 37, causeName: "Educacion Digital", dealTitle: "Diseno de marca completo" },
];

// ── Impact by cause aggregated ─────────────────────────────────

export const mockImpactByCause = [
  { causeId: "cause-001", causeName: "Educacion Digital", category: "Educacion", totalContributed: 180, transactions: 5 },
  { causeId: "cause-002", causeName: "Medio Ambiente", category: "Medio Ambiente", totalContributed: 105, transactions: 3 },
  { causeId: "cause-003", causeName: "Salud Comunitaria", category: "Salud", totalContributed: 32, transactions: 2 },
];

// ── Helpers ────────────────────────────────────────────────────

export const clientDealStatusConfig: Record<ClientDealStatus, {
  variant: "completed" | "pending" | "cancelled" | "category";
  label: string;
  color: string;
}> = {
  pending_payment: { variant: "pending", label: "Pago pendiente", color: "text-terra" },
  paid: { variant: "category", label: "Pagado", color: "text-sky" },
  in_progress: { variant: "pending", label: "En progreso", color: "text-terra" },
  delivered: { variant: "category", label: "Entregado", color: "text-sky" },
  revision_requested: { variant: "pending", label: "En revision", color: "text-terra" },
  completed: { variant: "completed", label: "Completado", color: "text-meadow" },
  cancelled: { variant: "cancelled", label: "Cancelado", color: "text-blush" },
};

export const dealStatusSteps: ClientDealStatus[] = [
  "paid",
  "in_progress",
  "delivered",
  "completed",
];
