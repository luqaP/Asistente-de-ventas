export enum ClientStatus {
  PROSPECT = 'PROSPECT', // Prospecto (Frio/Tibio)
  INTERESTED = 'INTERESTED', // Interesado (Caliente/Cierre)
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum SocioEconomicStatus {
  LOW = 'LOW', // Acceso básico
  MEDIUM = 'MEDIUM', // Clase media
  HIGH = 'HIGH', // Alta / Inversionista fuerte
}

export enum InvestmentObjective {
  BUILD_HOME = 'BUILD_HOME', // Construir casa
  LONG_TERM = 'LONG_TERM', // Ahorro a largo plazo / Plusvalía
  RESELL = 'RESELL', // Revender rápido
  COMMERCIAL = 'COMMERCIAL', // Negocio
}

export enum PaymentPlan {
  CASH = 'CASH', // Contado
  INSTALLMENTS = 'INSTALLMENTS', // Plazo/Crédito
  UNDECIDED = 'UNDECIDED',
}

export enum SalesTone {
  FORMAL = 'FORMAL',
  FRIENDLY = 'FRIENDLY',
  PERSUASIVE = 'PERSUASIVE',
  DIRECT = 'DIRECT',
}

export interface LotInfo {
  location: string;
  manzana: string;
  lote: string;
  category: string;
}

export interface ClientProfile {
  id?: string;
  name: string;
  age: number;
  gender: Gender;
  status: ClientStatus;
  ses: SocioEconomicStatus;
  occupation: string;
  objective: InvestmentObjective;
  paymentPlan: PaymentPlan;
  tone: SalesTone;
  notes?: string;
  hasVisited: boolean;
  lotInfo?: LotInfo;
  updatedAt?: number;
}

export type Language = 'es' | 'en';

export interface GeneratedScript {
  content: string;
  timestamp: number;
}