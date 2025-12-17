import { GoogleGenAI } from "@google/genai";
import { ClientProfile, ClientStatus, Gender, SocioEconomicStatus, InvestmentObjective, PaymentPlan, SalesTone } from "../types";

const mapEnumToText = (profile: ClientProfile): string => {
  const statusMap = {
    [ClientStatus.PROSPECT]: "Prospecto (apenas conociendo, necesita convencimiento)",
    [ClientStatus.INTERESTED]: "Interesado (ya conoce, necesita cierre o resolver dudas finales)"
  };
  const genderMap = {
    [Gender.MALE]: "Masculino",
    [Gender.FEMALE]: "Femenino",
    [Gender.OTHER]: "Neutro"
  };
  const sesMap = {
    [SocioEconomicStatus.LOW]: "Nivel Básico (Sensible al precio)",
    [SocioEconomicStatus.MEDIUM]: "Clase Media (Busca valor/precio)",
    [SocioEconomicStatus.HIGH]: "Nivel Alto (Busca exclusividad/ROI)"
  };
  const objMap = {
    [InvestmentObjective.BUILD_HOME]: "Construir su casa para vivir",
    [InvestmentObjective.LONG_TERM]: "Ahorro patrimonial a largo plazo",
    [InvestmentObjective.RESELL]: "Revender para ganar plusvalía rápida",
    [InvestmentObjective.COMMERCIAL]: "Poner un negocio o local"
  };
  const payMap = {
    [PaymentPlan.CASH]: "Pago de Contado (busca descuentos)",
    [PaymentPlan.INSTALLMENTS]: "Pago a Plazos (busca mensualidades cómodas)",
    [PaymentPlan.UNDECIDED]: "Indeciso sobre la forma de pago"
  };
  const toneMap = {
    [SalesTone.FORMAL]: "Formal y Profesional",
    [SalesTone.FRIENDLY]: "Amigable y Empático",
    [SalesTone.PERSUASIVE]: "Persuasivo y Enfocado a Cierre",
    [SalesTone.DIRECT]: "Directo y Conciso"
  };

  const lotText = profile.lotInfo?.lote 
    ? `Interesado en Lote ${profile.lotInfo.lote}, Manzana ${profile.lotInfo.manzana}, Proyecto: ${profile.lotInfo.location} (${profile.lotInfo.category})`
    : "Sin lote específico asignado todavía.";

  return `
    - Nombre: ${profile.name || "Cliente"}
    - Edad: ${profile.age} años
    - Sexo: ${genderMap[profile.gender]}
    - Ocupación: ${profile.occupation || "No especificada"}
    - Estado: ${statusMap[profile.status]}
    - ¿Visitó el terreno?: ${profile.hasVisited ? "SÍ, ya conoció físicamente el desarrollo" : "NO, solo ha visto información digital"}
    - Nivel Socioeconómico: ${sesMap[profile.ses]}
    - Objetivo: ${objMap[profile.objective]}
    - Pago: ${payMap[profile.paymentPlan]}
    - Tono: ${toneMap[profile.tone]}
    - Terreno de Interés: ${lotText}
    - Notas: ${profile.notes || "Ninguna"}
  `;
};

export const generateSalesScript = async (profile: ClientProfile, lang: 'es' | 'en'): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API_KEY is missing");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const clientDetails = mapEnumToText(profile);
  
  const languageInstruction = lang === 'es' 
    ? "Genera la respuesta TOTALMENTE EN ESPAÑOL." 
    : "Generate the response IN ENGLISH.";

  const prompt = `
    Actúa como un Asesor Inmobiliario experto en venta de terrenos.
    Tarea: Generar un guion de diálogo persuasivo.
    
    Contexto Crítico: ${profile.hasVisited ? "El cliente YA VISITÓ el lote. Enfócate en el cierre, en la emoción de haber estado ahí, en apartar la ubicación antes de que se gane otra persona y en resolver dudas de financiamiento finales." : "El cliente NO HA VISITADO. Tu objetivo principal es despertar curiosidad y AGENDAR UNA VISITA física para que se enamore del lugar."}
    
    Perfil:
    ${clientDetails}
    
    Instrucciones:
    1. ${languageInstruction}
    2. Usa el tono: ${profile.tone}.
    3. Estructura:
       - **Estrategia**: Qué psicología usar (ej. urgencia, exclusividad).
       - **Rompehielo**: Frase de conexión.
       - **Diálogo**: Escena Asesor vs Cliente.
       - **Call to Action**: Próximo paso claro.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.7 }
    });
    return response.text || "Error.";
  } catch (error) {
    throw error;
  }
};