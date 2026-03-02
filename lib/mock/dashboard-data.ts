// ── Types ──────────────────────────────────────────────────────

export type ServiceStatus = "active" | "draft" | "paused";
export type DealStatus = "in_progress" | "completed" | "cancelled";
export type NotificationType = "deal" | "review" | "system" | "payment" | "opportunity";
export type PlanType = "free" | "pro";

export interface ProviderProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  specialties: string[];
  plan: PlanType;
  joinedAt: string;
  completionPercent: number;
  stats: {
    totalRevenue: number;
    monthlyRevenue: number;
    pendingRevenue: number;
    donatedTotal: number;
    activeDeals: number;
    completedDeals: number;
    totalServices: number;
    averageRating: number;
    totalReviews: number;
    rankPosition: number;
    rankTotal: number;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: ServiceStatus;
  image: string;
  sales: number;
  rating: number;
  reviews: number;
  causeId: string;
  causeName: string;
  donationPercent: number;
  createdAt: string;
}

export interface Deal {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceTitle: string;
  amount: number;
  status: DealStatus;
  date: string;
  dueDate: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceTitle: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "donation" | "fee";
  date: string;
}

export interface RankingFactor {
  label: string;
  score: number;
  maxScore: number;
}

export interface LeaderboardEntry {
  position: number;
  name: string;
  avatar: string;
  score: number;
  isYou?: boolean;
}

export interface Cause {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  totalRaised: number;
  goal: number;
  yourContribution: number;
  servicesLinked: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  category: string;
  clientName: string;
  proposals: number;
  applied?: boolean;
}

export interface PlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// ── Mock Data ──────────────────────────────────────────────────

export const mockProvider: ProviderProfile = {
  id: "prov-001",
  name: "Maria Gonzalez",
  email: "maria@studio.com",
  avatar: "",
  bio: "Diseñadora con 8 años de experiencia en branding e identidad visual.",
  specialties: ["Branding", "UI/UX", "Ilustracion"],
  plan: "pro",
  joinedAt: "2025-06-15",
  completionPercent: 85,
  stats: {
    totalRevenue: 12480,
    monthlyRevenue: 4250,
    pendingRevenue: 1200,
    donatedTotal: 1248,
    activeDeals: 8,
    completedDeals: 34,
    totalServices: 6,
    averageRating: 4.8,
    totalReviews: 42,
    rankPosition: 12,
    rankTotal: 156,
  },
};

export const mockServices: Service[] = [
  {
    id: "svc-001",
    title: "Diseno de marca completo",
    description: "Logo, paleta de colores, tipografia y guia de estilo.",
    price: 450,
    category: "Diseno",
    status: "active",
    image: "",
    sales: 18,
    rating: 4.9,
    reviews: 15,
    causeId: "cause-001",
    causeName: "Educacion Digital",
    donationPercent: 10,
    createdAt: "2025-07-10",
  },
  {
    id: "svc-002",
    title: "Rediseno de sitio web",
    description: "Rediseno completo con enfoque en UX y conversion.",
    price: 800,
    category: "Desarrollo",
    status: "active",
    image: "",
    sales: 12,
    rating: 4.7,
    reviews: 10,
    causeId: "cause-002",
    causeName: "Medio Ambiente",
    donationPercent: 10,
    createdAt: "2025-08-22",
  },
  {
    id: "svc-003",
    title: "Pack redes sociales",
    description: "30 templates editables para Instagram y LinkedIn.",
    price: 150,
    category: "Marketing",
    status: "active",
    image: "",
    sales: 28,
    rating: 4.6,
    reviews: 9,
    causeId: "cause-001",
    causeName: "Educacion Digital",
    donationPercent: 10,
    createdAt: "2025-09-05",
  },
  {
    id: "svc-004",
    title: "Ilustraciones personalizadas",
    description: "Set de 10 ilustraciones vectoriales a medida.",
    price: 350,
    category: "Diseno",
    status: "paused",
    image: "",
    sales: 5,
    rating: 5.0,
    reviews: 4,
    causeId: "cause-003",
    causeName: "Salud Comunitaria",
    donationPercent: 10,
    createdAt: "2025-10-12",
  },
  {
    id: "svc-005",
    title: "Consultoria de marca",
    description: "Sesion de 2 horas para definir estrategia de marca.",
    price: 120,
    category: "Consultoria",
    status: "active",
    image: "",
    sales: 8,
    rating: 4.8,
    reviews: 4,
    causeId: "cause-002",
    causeName: "Medio Ambiente",
    donationPercent: 10,
    createdAt: "2025-11-01",
  },
  {
    id: "svc-006",
    title: "Motion graphics intro",
    description: "Video animado de 15 segundos para tu marca.",
    price: 250,
    category: "Video",
    status: "draft",
    image: "",
    sales: 0,
    rating: 0,
    reviews: 0,
    causeId: "cause-001",
    causeName: "Educacion Digital",
    donationPercent: 10,
    createdAt: "2026-01-20",
  },
  {
    id: "svc-007",
    title: "Auditoria visual de marca",
    description: "Analisis completo de tu identidad visual actual.",
    price: 200,
    category: "Consultoria",
    status: "active",
    image: "",
    sales: 3,
    rating: 4.5,
    reviews: 2,
    causeId: "cause-003",
    causeName: "Salud Comunitaria",
    donationPercent: 10,
    createdAt: "2026-02-05",
  },
  {
    id: "svc-008",
    title: "Naming y eslogan",
    description: "Creacion de nombre de marca y eslogan.",
    price: 180,
    category: "Marketing",
    status: "draft",
    image: "",
    sales: 0,
    rating: 0,
    reviews: 0,
    causeId: "cause-002",
    causeName: "Medio Ambiente",
    donationPercent: 10,
    createdAt: "2026-02-28",
  },
];

export const mockDeals: Deal[] = [
  {
    id: "deal-001",
    clientName: "Carlos Ruiz",
    clientAvatar: "",
    serviceTitle: "Diseno de marca completo",
    amount: 450,
    status: "in_progress",
    date: "2026-02-20",
    dueDate: "2026-03-15",
  },
  {
    id: "deal-002",
    clientName: "Ana Torres",
    clientAvatar: "",
    serviceTitle: "Rediseno de sitio web",
    amount: 800,
    status: "in_progress",
    date: "2026-02-18",
    dueDate: "2026-03-20",
  },
  {
    id: "deal-003",
    clientName: "Luis Martinez",
    clientAvatar: "",
    serviceTitle: "Pack redes sociales",
    amount: 150,
    status: "completed",
    date: "2026-02-10",
    dueDate: "2026-02-25",
  },
  {
    id: "deal-004",
    clientName: "Sofia Herrera",
    clientAvatar: "",
    serviceTitle: "Consultoria de marca",
    amount: 120,
    status: "completed",
    date: "2026-02-05",
    dueDate: "2026-02-10",
  },
  {
    id: "deal-005",
    clientName: "Miguel Sanchez",
    clientAvatar: "",
    serviceTitle: "Diseno de marca completo",
    amount: 450,
    status: "in_progress",
    date: "2026-02-15",
    dueDate: "2026-03-10",
  },
  {
    id: "deal-006",
    clientName: "Patricia Leon",
    clientAvatar: "",
    serviceTitle: "Pack redes sociales",
    amount: 150,
    status: "cancelled",
    date: "2026-01-28",
    dueDate: "2026-02-15",
  },
  {
    id: "deal-007",
    clientName: "Roberto Diaz",
    clientAvatar: "",
    serviceTitle: "Rediseno de sitio web",
    amount: 800,
    status: "completed",
    date: "2026-01-15",
    dueDate: "2026-02-20",
  },
  {
    id: "deal-008",
    clientName: "Elena Castro",
    clientAvatar: "",
    serviceTitle: "Ilustraciones personalizadas",
    amount: 350,
    status: "in_progress",
    date: "2026-02-22",
    dueDate: "2026-03-22",
  },
  {
    id: "deal-009",
    clientName: "Javier Moreno",
    clientAvatar: "",
    serviceTitle: "Consultoria de marca",
    amount: 120,
    status: "completed",
    date: "2026-01-10",
    dueDate: "2026-01-15",
  },
  {
    id: "deal-010",
    clientName: "Laura Vargas",
    clientAvatar: "",
    serviceTitle: "Diseno de marca completo",
    amount: 450,
    status: "completed",
    date: "2025-12-20",
    dueDate: "2026-01-20",
  },
  {
    id: "deal-011",
    clientName: "Diego Ramos",
    clientAvatar: "",
    serviceTitle: "Pack redes sociales",
    amount: 150,
    status: "in_progress",
    date: "2026-02-25",
    dueDate: "2026-03-10",
  },
  {
    id: "deal-012",
    clientName: "Camila Ortiz",
    clientAvatar: "",
    serviceTitle: "Auditoria visual de marca",
    amount: 200,
    status: "cancelled",
    date: "2026-02-01",
    dueDate: "2026-02-15",
  },
];

export const mockNotifications: Notification[] = [
  { id: "notif-001", type: "deal", title: "Nuevo trato recibido", description: "Carlos Ruiz contrato Diseno de marca completo.", timestamp: "2026-02-28T14:30:00", read: false },
  { id: "notif-002", type: "review", title: "Nueva resena", description: "Ana Torres dejo una resena de 5 estrellas.", timestamp: "2026-02-28T10:15:00", read: false },
  { id: "notif-003", type: "payment", title: "Pago recibido", description: "Se acredito $150 por Pack redes sociales.", timestamp: "2026-02-27T18:00:00", read: false },
  { id: "notif-004", type: "system", title: "Perfil incompleto", description: "Completa tu perfil para mejorar tu ranking.", timestamp: "2026-02-27T09:00:00", read: true },
  { id: "notif-005", type: "opportunity", title: "Nueva oportunidad", description: "Un cliente busca diseno de logo con impacto social.", timestamp: "2026-02-26T16:45:00", read: true },
  { id: "notif-006", type: "deal", title: "Trato completado", description: "Luis Martinez confirmo la entrega.", timestamp: "2026-02-25T11:30:00", read: true },
  { id: "notif-007", type: "payment", title: "Donacion realizada", description: "Se dono $45 a Educacion Digital.", timestamp: "2026-02-25T11:30:00", read: true },
  { id: "notif-008", type: "review", title: "Nueva resena", description: "Sofia Herrera dejo una resena de 4 estrellas.", timestamp: "2026-02-24T14:20:00", read: true },
  { id: "notif-009", type: "system", title: "Actualizacion de ranking", description: "Subiste 2 posiciones en el ranking.", timestamp: "2026-02-23T08:00:00", read: true },
  { id: "notif-010", type: "deal", title: "Trato cancelado", description: "Patricia Leon cancelo Pack redes sociales.", timestamp: "2026-02-22T15:10:00", read: true },
  { id: "notif-011", type: "opportunity", title: "Nueva oportunidad", description: "Empresa necesita rediseno de sitio web.", timestamp: "2026-02-21T12:00:00", read: true },
  { id: "notif-012", type: "payment", title: "Pago recibido", description: "Se acredito $800 por Rediseno de sitio web.", timestamp: "2026-02-20T17:45:00", read: true },
  { id: "notif-013", type: "system", title: "Mejora a Pro", description: "Desbloquea mas funcionalidades con el plan Pro.", timestamp: "2026-02-19T10:00:00", read: true },
  { id: "notif-014", type: "review", title: "Nueva resena", description: "Roberto Diaz dejo una resena de 5 estrellas.", timestamp: "2026-02-18T09:30:00", read: true },
  { id: "notif-015", type: "deal", title: "Nuevo trato recibido", description: "Elena Castro contrato Ilustraciones personalizadas.", timestamp: "2026-02-17T13:00:00", read: true },
];

export const mockReviews: Review[] = [
  { id: "rev-001", clientName: "Ana Torres", clientAvatar: "", serviceTitle: "Rediseno de sitio web", rating: 5, comment: "Increible trabajo. Supero mis expectativas completamente.", date: "2026-02-28" },
  { id: "rev-002", clientName: "Luis Martinez", clientAvatar: "", serviceTitle: "Pack redes sociales", rating: 5, comment: "Templates de altisima calidad, muy faciles de personalizar.", date: "2026-02-25" },
  { id: "rev-003", clientName: "Sofia Herrera", clientAvatar: "", serviceTitle: "Consultoria de marca", rating: 4, comment: "Muy buena sesion, ideas claras y accionables.", date: "2026-02-24" },
  { id: "rev-004", clientName: "Roberto Diaz", clientAvatar: "", serviceTitle: "Rediseno de sitio web", rating: 5, comment: "Profesionalismo y creatividad excepcional.", date: "2026-02-18" },
  { id: "rev-005", clientName: "Laura Vargas", clientAvatar: "", serviceTitle: "Diseno de marca completo", rating: 5, comment: "La marca quedo perfecta, exactamente lo que buscaba.", date: "2026-01-25" },
  { id: "rev-006", clientName: "Javier Moreno", clientAvatar: "", serviceTitle: "Consultoria de marca", rating: 4, comment: "Buena consultoria, me hubiera gustado mas tiempo.", date: "2026-01-15" },
  { id: "rev-007", clientName: "Patricia Leon", clientAvatar: "", serviceTitle: "Pack redes sociales", rating: 5, comment: "Excelente calidad visual. Muy recomendable.", date: "2025-12-20" },
  { id: "rev-008", clientName: "Miguel Sanchez", clientAvatar: "", serviceTitle: "Diseno de marca completo", rating: 4, comment: "Buen trabajo, solo ajustes menores necesarios.", date: "2025-12-10" },
];

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: "Sep", amount: 1200 },
  { month: "Oct", amount: 1800 },
  { month: "Nov", amount: 2100 },
  { month: "Dic", amount: 2650 },
  { month: "Ene", amount: 3200 },
  { month: "Feb", amount: 4250 },
];

export const mockWeeklyRevenue = [320, 180, 450, 280, 520, 390, 610];

export const mockTransactions: Transaction[] = [
  { id: "tx-001", description: "Diseno de marca — Carlos Ruiz", amount: 450, type: "income", date: "2026-02-28" },
  { id: "tx-002", description: "Donacion a Educacion Digital", amount: -45, type: "donation", date: "2026-02-28" },
  { id: "tx-003", description: "Comision plataforma", amount: -22.5, type: "fee", date: "2026-02-28" },
  { id: "tx-004", description: "Pack redes — Luis Martinez", amount: 150, type: "income", date: "2026-02-25" },
  { id: "tx-005", description: "Donacion a Educacion Digital", amount: -15, type: "donation", date: "2026-02-25" },
  { id: "tx-006", description: "Rediseno web — Roberto Diaz", amount: 800, type: "income", date: "2026-02-20" },
  { id: "tx-007", description: "Donacion a Medio Ambiente", amount: -80, type: "donation", date: "2026-02-20" },
  { id: "tx-008", description: "Comision plataforma", amount: -40, type: "fee", date: "2026-02-20" },
];

export const mockRankingFactors: RankingFactor[] = [
  { label: "Valoracion promedio", score: 96, maxScore: 100 },
  { label: "Tratos completados", score: 85, maxScore: 100 },
  { label: "Tiempo de respuesta", score: 78, maxScore: 100 },
  { label: "Impacto social", score: 92, maxScore: 100 },
  { label: "Perfil completo", score: 85, maxScore: 100 },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { position: 1, name: "Daniel Vega", avatar: "", score: 982 },
  { position: 2, name: "Carolina Mendez", avatar: "", score: 971 },
  { position: 3, name: "Andres Paredes", avatar: "", score: 965 },
  { position: 4, name: "Valentina Rios", avatar: "", score: 958 },
  { position: 5, name: "Felipe Cortes", avatar: "", score: 950 },
];

export const mockCauses: Cause[] = [
  {
    id: "cause-001",
    name: "Educacion Digital",
    description: "Acceso a herramientas tecnologicas para comunidades rurales.",
    category: "Educacion",
    image: "",
    totalRaised: 8500,
    goal: 15000,
    yourContribution: 680,
    servicesLinked: 3,
  },
  {
    id: "cause-002",
    name: "Medio Ambiente",
    description: "Reforestacion y conservacion de ecosistemas locales.",
    category: "Medio Ambiente",
    image: "",
    totalRaised: 12300,
    goal: 20000,
    yourContribution: 420,
    servicesLinked: 2,
  },
  {
    id: "cause-003",
    name: "Salud Comunitaria",
    description: "Clinicas moviles para zonas sin acceso a salud basica.",
    category: "Salud",
    image: "",
    totalRaised: 5200,
    goal: 10000,
    yourContribution: 148,
    servicesLinked: 2,
  },
];

export const mockOpportunities: Opportunity[] = [
  { id: "opp-001", title: "Logo para ONG ambiental", description: "Necesitamos un logo que refleje nuestra mision de conservacion.", budget: 300, deadline: "2026-03-15", category: "Diseno", clientName: "ONG Verde Futuro", proposals: 4 },
  { id: "opp-002", title: "Sitio web para cooperativa", description: "Web informativa con catalogo de productos artesanales.", budget: 600, deadline: "2026-03-20", category: "Desarrollo", clientName: "Cooperativa Manos Unidas", proposals: 7 },
  { id: "opp-003", title: "Campana en redes sociales", description: "Estrategia y contenido para campana de recaudacion.", budget: 250, deadline: "2026-03-10", category: "Marketing", clientName: "Fundacion Sonrisas", proposals: 3 },
  { id: "opp-004", title: "Branding completo", description: "Identidad visual completa para startup social.", budget: 500, deadline: "2026-04-01", category: "Diseno", clientName: "ImpactHub LATAM", proposals: 6 },
  { id: "opp-005", title: "Video institucional", description: "Video de 1 minuto para presentar nuestra causa.", budget: 400, deadline: "2026-03-25", category: "Video", clientName: "Red de Voluntarios", proposals: 2 },
  { id: "opp-006", title: "Rediseno de newsletter", description: "Templates para newsletter mensual de la fundacion.", budget: 150, deadline: "2026-03-12", category: "Marketing", clientName: "Fundacion Esperanza", proposals: 5, applied: true },
];

export const mockPlans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Para empezar a ofrecer servicios con impacto.",
    features: [
      "Hasta 3 servicios activos",
      "Comision del 8%",
      "Soporte por email",
      "Perfil basico",
      "1 causa vinculada",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "Para profesionales que quieren crecer.",
    features: [
      "Servicios ilimitados",
      "Comision del 5%",
      "Soporte prioritario",
      "Perfil destacado",
      "Causas ilimitadas",
      "Badge Pro visible",
      "Acceso a oportunidades",
      "Estadisticas avanzadas",
    ],
    highlighted: true,
  },
];

export const mockPlanComparison: PlanFeature[] = [
  { name: "Servicios activos", free: "3", pro: "Ilimitados" },
  { name: "Comision por venta", free: "8%", pro: "5%" },
  { name: "Causas vinculadas", free: "1", pro: "Ilimitadas" },
  { name: "Badge Pro", free: false, pro: true },
  { name: "Perfil destacado", free: false, pro: true },
  { name: "Acceso a oportunidades", free: false, pro: true },
  { name: "Estadisticas avanzadas", free: false, pro: true },
  { name: "Soporte prioritario", free: false, pro: true },
];

// ── Helpers ──────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(dateStr: string): string {
  const now = new Date("2026-03-02T12:00:00");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `hace ${diffMins}m`;
  if (diffHours < 24) return `hace ${diffHours}h`;
  if (diffDays < 7) return `hace ${diffDays}d`;
  return formatDate(dateStr);
}
