
import { 
  ClientStatus, 
  Gender, 
  SocioEconomicStatus, 
  InvestmentObjective, 
  PaymentPlan, 
  SalesTone,
  Language 
} from './types';

export const LABELS = {
  es: {
    appTitle: 'AI Asesor Inmobiliario',
    appSubtitle: 'Generador de Guiones de Venta',
    formTitle: 'Perfil del Cliente',
    name: 'Nombre del Cliente',
    age: 'Edad',
    gender: 'Sexo',
    occupation: 'Ocupación',
    status: 'Estado del Cliente',
    ses: 'Nivel Socioeconómico',
    objective: 'Objetivo de Inversión',
    payment: 'Preferencia de Pago',
    tone: 'Tono del Discurso',
    notes: 'Notas Adicionales',
    generateBtn: 'Generar Guion',
    generating: 'Escribiendo guion...',
    resultTitle: 'Guion Sugerido',
    copyBtn: 'Copiar Texto',
    copied: '¡Copiado!',
    clearBtn: 'Limpiar',
    saveBtn: 'Guardar Perfil',
    savedProfiles: 'Mis Clientes Guardados',
    noProfiles: 'Aún no tienes clientes guardados.',
    placeholderNotes: 'Ej: Tiene hijos, le gusta la naturaleza...',
    delete: 'Eliminar',
    load: 'Cargar',
    deleteConfirm: '¿Estás seguro de que deseas eliminar este perfil?',
    searchPlaceholder: 'Buscar por nombre u ocupación...',
    
    // Visit & Lot Info
    visitStatus: 'Estado de Visita',
    hasVisited: 'Ya visitó el terreno',
    notVisited: 'Aún no visita',
    lotDetails: 'Detalles del Lote Interés',
    location: 'Ubicación / Proyecto',
    manzana: 'Manzana',
    lote: 'Lote #',
    category: 'Categoría (Ej: Premium)',
    lotTracker: 'Potenciales por Lote',
    
    // Data Management
    exportData: 'Exportar Datos',
    importData: 'Importar Datos',
    importSuccess: '¡Datos importados con éxito!',
    importError: 'Error al importar el archivo.',

    // Select Options
    gender_male: 'Masculino',
    gender_female: 'Femenino',
    gender_other: 'Otro',
    
    status_prospect: 'Prospecto (Explorando)',
    status_interested: 'Interesado (Listo para comprar)',
    
    ses_low: 'Entrada / Económico',
    ses_medium: 'Medio',
    ses_high: 'Alto / Premium',
    
    obj_build: 'Construir Casa Habitación',
    obj_long_term: 'Patrimonio / Ahorro a Largo Plazo',
    obj_resell: 'Inversión para Reventa',
    obj_commercial: 'Uso Comercial',
    
    pay_cash: 'Contado',
    pay_installments: 'A Plazos / Crédito',
    pay_undecided: 'Indeciso',

    tone_formal: 'Formal y Profesional',
    tone_friendly: 'Amigable y Empático',
    tone_persuasive: 'Persuasivo y Enfocado a Cierre',
    tone_direct: 'Directo y Conciso',
    
    error_api_key: 'Falta la API Key en el entorno.',
    error_generic: 'Ocurrió un error al generar el guion.',
  },
  en: {
    appTitle: 'AI Real Estate Advisor',
    appSubtitle: 'Sales Script Generator',
    formTitle: 'Client Profile',
    name: 'Client Name',
    age: 'Age',
    gender: 'Gender',
    occupation: 'Occupation',
    status: 'Client Status',
    ses: 'Socioeconomic Status',
    objective: 'Investment Objective',
    payment: 'Payment Preference',
    tone: 'Speech Tone',
    notes: 'Additional Notes',
    generateBtn: 'Generate Script',
    generating: 'Writing script...',
    resultTitle: 'Suggested Script',
    copyBtn: 'Copy Text',
    copied: 'Copied!',
    clearBtn: 'Clear',
    saveBtn: 'Save Profile',
    savedProfiles: 'My Saved Clients',
    noProfiles: 'No saved clients yet.',
    placeholderNotes: 'Ex: Has kids, likes nature...',
    delete: 'Delete',
    load: 'Load',
    deleteConfirm: 'Are you sure you want to delete this profile?',
    searchPlaceholder: 'Search by name or occupation...',

    // Visit & Lot Info
    visitStatus: 'Visit Status',
    hasVisited: 'Visited the lot',
    notVisited: 'Has not visited',
    lotDetails: 'Lot Details of Interest',
    location: 'Location / Project',
    manzana: 'Block',
    lote: 'Lot #',
    category: 'Category (e.g. Premium)',
    lotTracker: 'Potential Buyers by Lot',

    // Data Management
    exportData: 'Export Data',
    importData: 'Import Data',
    importSuccess: 'Data imported successfully!',
    importError: 'Error importing file.',

    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',
    
    status_prospect: 'Prospect (Exploring)',
    status_interested: 'Interested (Ready to buy)',
    
    ses_low: 'Entry Level',
    ses_medium: 'Medium',
    ses_high: 'High / Premium',
    
    obj_build: 'Build Home',
    obj_long_term: 'Long Term / Heritage',
    obj_resell: 'Investment for Resale',
    obj_commercial: 'Commercial Use',
    
    pay_cash: 'Cash',
    pay_installments: 'Installments / Credit',
    pay_undecided: 'Undecided',

    tone_formal: 'Formal & Professional',
    tone_friendly: 'Friendly & Empathetic',
    tone_persuasive: 'Persuasive & Closing Focused',
    tone_direct: 'Direct & Concise',

    error_api_key: 'Missing API Key in environment.',
    error_generic: 'An error occurred generating the script.',
  }
};

export const DEFAULT_PROFILE = {
  name: '',
  age: 35,
  gender: Gender.MALE,
  status: ClientStatus.PROSPECT,
  ses: SocioEconomicStatus.MEDIUM,
  occupation: '',
  objective: InvestmentObjective.LONG_TERM,
  paymentPlan: PaymentPlan.INSTALLMENTS,
  tone: SalesTone.FRIENDLY,
  notes: '',
  hasVisited: false,
  lotInfo: {
    location: '',
    manzana: '',
    lote: '',
    category: ''
  }
};
