/**
 * Banco de preguntas del curso Programática + IA.
 * 8 clases · ~6 preguntas por clase · mezcla V/F + multiple choice.
 * Cada explicación enseña el "por qué" — el quiz refuerza, no solo evalúa.
 */

export type TFQuestion = {
  type: "tf";
  question: string;
  answer: boolean;
  explanation: string;
};

export type MCQuestion = {
  type: "mc";
  question: string;
  options: string[];
  answer: number; // índice de la opción correcta
  explanation: string;
};

export type QuizQuestion = TFQuestion | MCQuestion;

/* ============================================================
 * CLASE 1 · Fundamentos
 * ============================================================ */
export const quizClase1: QuizQuestion[] = [
  {
    type: "tf",
    question:
      "La compra programática hoy representa aproximadamente el 91% del display en Estados Unidos.",
    answer: true,
    explanation:
      "Correcto. Concretamente el 91,3% del display en EE.UU. se compra de forma programática (2026). Es el motivo por el que la programática es la columna vertebral de la publicidad digital, no un canal accesorio.",
  },
  {
    type: "mc",
    question:
      "¿Cuáles son los tres motores de crecimiento actuales del programmatic que cualquier consultor debe dominar?",
    options: [
      "Banners desktop, SEM y Email marketing",
      "Connected TV (CTV), Retail Media e Inteligencia Artificial",
      "SMS, Notificaciones push y Display estándar",
      "Audio terrestre, Print digital y Native ads",
    ],
    answer: 1,
    explanation:
      "CTV, Retail Media e IA son los tres motores. CTV en EE.UU. va de $33,4B (2025) a $37,95B (2026); Retail Media global ya supera a TV global con $177B; y la IA es transversal a bidding, creatividad y attribution.",
  },
  {
    type: "tf",
    question:
      "El mercado europeo de digital advertising es estructuralmente igual al estadounidense en términos de penetración programática.",
    answer: false,
    explanation:
      "Falso. Europa es más reservation/direct: ~52–55% del display europeo es programmatic frente a 91% en EE.UU. Esto cambia la estrategia: en Europa hay más espacio para deals directos y PMPs.",
  },
  {
    type: "mc",
    question:
      "¿Cuánto representan los walled gardens (Google, Meta, Amazon) en la torta global de digital advertising?",
    options: ["20–25%", "40–45%", "75–80%", "Más del 95%"],
    answer: 2,
    explanation:
      "Los walled gardens concentran el 75–80% del gasto digital global. Por eso el primer split estratégico de cualquier plan programmatic es decidir cuánto va a walled gardens y cuánto a open web.",
  },
  {
    type: "tf",
    question:
      "Programmatic es un canal de marketing más, comparable a SEM o Email.",
    answer: false,
    explanation:
      "Falso. Programmatic no es un canal: es una forma automatizada de comprar publicidad en cualquier canal (display, video, CTV, audio, DOOH). Confundir canal con método es uno de los errores conceptuales más frecuentes.",
  },
  {
    type: "mc",
    question:
      "¿Qué decisión estratégica de 2024 reescribió el manual del programmatic en cuanto a cookies?",
    options: [
      "Apple eliminó Safari del mercado",
      "Google decidió NO eliminar las cookies de terceros en Chrome",
      "La UE prohibió el uso de cookies en toda Europa",
      "Microsoft compró The Trade Desk",
    ],
    answer: 1,
    explanation:
      "En julio 2024 Google anunció que no eliminaría las cookies de terceros, y en abril 2025 confirmó que ni siquiera mostraría un prompt al usuario. La industria ya había invertido en alternativas (UID2, contextual con IA, clean rooms), por lo que el cambio post-cookie sigue en marcha igual.",
  },
];

/* ============================================================
 * CLASE 2 · Ecosistema
 * ============================================================ */
export const quizClase2: QuizQuestion[] = [
  {
    type: "mc",
    question:
      "Una subasta RTB completa (desde que el usuario abre la página hasta que se sirve el anuncio) ocurre en aproximadamente:",
    options: ["10 segundos", "1 segundo", "100 milisegundos", "5 milisegundos"],
    answer: 2,
    explanation:
      "Menos de 100 ms. Es el tiempo que tiene cada DSP para evaluar la impresión, decidir si puja y a cuánto, antes de que el navegador termine de cargar la página. Por eso la infraestructura de bidding tiene que estar diseñada para ese SLA.",
  },
  {
    type: "tf",
    question:
      "DV360, Amazon DSP y The Trade Desk concentran aproximadamente el 86% del share de DSPs en Estados Unidos.",
    answer: true,
    explanation:
      "Correcto. DV360 ~47%, Amazon DSP ~20% y The Trade Desk ~19% suman 86%. Es un mercado altamente concentrado, lo cual condiciona la elección de stack en cualquier consultoría.",
  },
  {
    type: "mc",
    question: "¿Cuál de las siguientes NO es una pieza del stack programático?",
    options: [
      "DSP (Demand-Side Platform)",
      "SSP (Supply-Side Platform)",
      "ESP (Email Service Provider)",
      "Ad Exchange",
    ],
    answer: 2,
    explanation:
      "Un ESP gestiona email marketing, no transacciones de medios. DSPs, SSPs, Ad Exchanges, DMPs, CDPs y Clean Rooms son las piezas del ecosistema programmatic propiamente dicho.",
  },
  {
    type: "tf",
    question:
      "La fusión Omnicom + IPG cerrada en noviembre 2025 fue una de las consolidaciones más grandes de la historia del holding company space, valuada en aproximadamente $30B.",
    answer: true,
    explanation:
      "Correcto. La fusión Omnicom + IPG de ~$30B (noviembre 2025) es uno de los movimientos de consolidación más importantes del sector. WPP Media, otro de los grandes, gestiona más de $60.000M anuales en 80 mercados.",
  },
  {
    type: "mc",
    question: "¿Cuál es la principal diferencia funcional entre un DMP y una CDP?",
    options: [
      "El DMP es más caro que la CDP",
      "El DMP trabaja con datos anónimos (cookies, IDs) y la CDP con first-party data identificada por usuario",
      "El DMP es un producto de Google y la CDP de Amazon",
      "No hay diferencia funcional, son sinónimos",
    ],
    answer: 1,
    explanation:
      "El DMP gestiona datos anónimos/semianónimos para targeting (cookies, mobile IDs, segmentos audience). La CDP unifica first-party data identificada (email, CRM, transacciones) para activación cross-canal. En la era post-cookie, la CDP es estructuralmente más relevante.",
  },
  {
    type: "tf",
    question:
      "Las Clean Rooms permiten que dos partes (anunciante y publisher, o anunciante y retailer) combinen sus datos sin compartirlos directamente.",
    answer: true,
    explanation:
      "Correcto. La clean room ejecuta queries sobre datasets combinados pero ninguna parte ve los datos crudos de la otra. Es la infraestructura base para Retail Media, identity matching y planning post-cookie.",
  },
];

/* ============================================================
 * CLASE 3 · AI en bidding, optimización y attribution
 * ============================================================ */
export const quizClase3: QuizQuestion[] = [
  {
    type: "mc",
    question: "¿Qué problema resuelve concretamente el bid shading?",
    options: [
      "Que las cookies de terceros desaparezcan",
      "Que en subastas de primer precio el anunciante no pague exactamente su puja máxima cuando podría haber ganado pagando menos",
      "Que los anuncios se muestren al usuario equivocado",
      "Que los publishers no cobren lo suficiente",
    ],
    answer: 1,
    explanation:
      "Bid shading es un modelo ML que estima cuánto pujan los competidores en subastas de primer precio y baja tu puja a un nivel óptimo donde ganás con alta probabilidad pero pagás menos. Todos los DSPs grandes lo ofrecen out-of-the-box.",
  },
  {
    type: "tf",
    question:
      "TTD Kokai, DV360 Enhanced Automation y Amazon DSP Performance+ son ejemplos de plataformas de bidding AI-first.",
    answer: true,
    explanation:
      "Correcto. Son las tres plataformas AI-first más relevantes en 2025–2026. Kokai reportó 5x ROAS, -43% CPUR, -24% CPC y -27% CPA en 665 campañas US/CA; DV360 reportó -60% CPA mediano por insertion order; Amazon DSP Performance+ mostró -51% CPA vs campañas legacy.",
  },
  {
    type: "mc",
    question:
      "¿Aproximadamente qué porcentaje del gasto digital sobre-atribuye el modelo last-click?",
    options: ["10%", "30%", "Hasta el 60%", "Más del 90%"],
    answer: 2,
    explanation:
      "El last-click sobre-atribuye hasta el 60% del gasto digital al canal de cierre, ignorando los touchpoints upper-funnel. Por eso MTA, MMM y AI-driven attribution son hoy las prácticas correctas para decisiones de presupuesto.",
  },
  {
    type: "tf",
    question:
      "Más del 50% de las organizaciones B2B en UK ya usa Multi-Touch Attribution (MTA).",
    answer: false,
    explanation:
      "Falso. Solo el 24% de las organizaciones B2B en UK usa MTA según Gartner 2025. La mayoría sigue con last-click o atribución manual, lo cual es una oportunidad de mejora consultiva clara.",
  },
  {
    type: "mc",
    question:
      "Según McKinsey, ¿qué impacto tiene el AI forecasting en la reducción de errores de predicción de inversión publicitaria?",
    options: ["1–5%", "5–10%", "20–50%", "Más del 80%"],
    answer: 2,
    explanation:
      "AI forecasting reduce errores de predicción en un 20–50% según McKinsey. Es uno de los argumentos más fuertes para incorporar IA en el planning de medios, especialmente en campañas con múltiples canales y estacionalidad.",
  },
  {
    type: "tf",
    question:
      "Si un cliente te dice 'queremos usar IA pero solo en la creatividad, no en bidding', es una decisión estratégicamente sólida.",
    answer: false,
    explanation:
      "Falso. Bidding y attribution son donde la IA tiene impacto más directo y medible sobre eficiencia (CPA, ROAS). Limitar la IA a creatividad deja sobre la mesa el 60–80% de la ganancia de eficiencia. Lo recomendable es desplegar IA full-stack: bidding + creative + attribution.",
  },
];

/* ============================================================
 * CLASE 4 · DCO 2.0
 * ============================================================ */
export const quizClase4: QuizQuestion[] = [
  {
    type: "mc",
    question: "¿Cuál es la principal diferencia entre DCO clásico y DCO 2.0?",
    options: [
      "DCO 2.0 es más barato",
      "DCO clásico combina assets existentes según reglas; DCO 2.0 usa LLMs y modelos generativos para crear assets nuevos on-the-fly",
      "DCO 2.0 solo funciona en mobile",
      "No hay diferencia, son lo mismo",
    ],
    answer: 1,
    explanation:
      "DCO clásico se limita a combinar assets ya existentes (5–10 layouts × product feed × reglas). DCO 2.0 usa LLMs (GPT, Gemini, Claude) + modelos de imagen (Firefly, DALL-E) + video (Runway, Sora) para generar variantes ilimitadas específicas para cada segmento o impresión.",
  },
  {
    type: "tf",
    question: "En 2024, el 82% de los anunciantes ya usaba alguna forma de DCO.",
    answer: true,
    explanation:
      "Correcto. La adopción de DCO está madura: 82% de anunciantes en 2024 y el 99% de las agencias considera DCO relevante en su mix según la encuesta Digiday/Clinch.",
  },
  {
    type: "mc",
    question:
      "Persado, una plataforma de generación de copy AI, reporta que supera al copy escrito por humanos en aproximadamente:",
    options: [
      "30% de las veces",
      "60% de las veces",
      "96% de las veces",
      "Nunca lo supera, son comparables",
    ],
    answer: 2,
    explanation:
      "Persado reporta superar al humano el 96% de las veces, con uplift promedio de +41%. No significa que el humano sobre — significa que el copy a escala se beneficia masivamente del A/B testing automatizado que solo un sistema generativo puede sostener.",
  },
  {
    type: "tf",
    question:
      "MFA (Made-For-Advertising sites) representaron en Q1 2025 aproximadamente el 10% del gasto global de publicidad, equivalente a $26.800M desperdiciados.",
    answer: true,
    explanation:
      "Correcto. Los MFA — sites diseñados solo para servir ads — capturaron el 10% del global ad spend en Q1 2025: $26.800M de presupuesto desperdiciado. Por eso brand safety + IA contextual son hoy parte central del stack creativo.",
  },
  {
    type: "mc",
    question: "¿Qué métrica reporta Pencil Pro (generación creativa AI) en sus campañas?",
    options: [
      "Sin impacto medible vs control",
      "-48% CPA y +79% ROAS, con 2x reducción en tiempo de producción",
      "Solo mejoras estéticas, no en performance",
      "Aumento de costos pero mayor calidad",
    ],
    answer: 1,
    explanation:
      "Pencil Pro reporta -48% CPA, +79% ROAS y 2x reducción del tiempo de producción. La combinación performance + velocidad es lo que vuelve a la creatividad generativa una palanca estratégica, no solo un experimento.",
  },
  {
    type: "tf",
    question:
      "Activar Gemini en Google Performance Max aumenta significativamente la probabilidad de obtener un Ad Strength 'Good' o 'Excellent'.",
    answer: true,
    explanation:
      "Correcto. Google reporta que PMax + Gemini incrementa en 63% la probabilidad de obtener Ad Strength Good/Excellent. Es uno de los pocos casos donde el efecto del LLM está cuantificado por la plataforma misma.",
  },
];

/* ============================================================
 * CLASE 5 · Post-cookie / Privacy
 * ============================================================ */
export const quizClase5: QuizQuestion[] = [
  {
    type: "tf",
    question:
      "A mayo 2026, Chrome ya eliminó las cookies de terceros en su navegador.",
    answer: false,
    explanation:
      "Falso. En julio 2024 Google anunció que no eliminaría las cookies de terceros, y en abril 2025 confirmó que ni siquiera mostraría un prompt al usuario. Las cookies de terceros siguen activas por defecto en Chrome.",
  },
  {
    type: "mc",
    question: "¿Qué pasó con las APIs del Privacy Sandbox de Google?",
    options: [
      "Se convirtieron en el estándar de la industria",
      "Fueron retiradas formalmente en octubre 2025 por baja adopción y presión legal",
      "Solo se implementaron en Android, no en Chrome",
      "Fueron compradas por The Trade Desk",
    ],
    answer: 1,
    explanation:
      "El 17 de octubre de 2025 Google retiró formalmente las APIs principales del Privacy Sandbox (Topics, Protected Audience, Attribution Reporting) tanto en Chrome como en Android, citando baja adopción del ecosistema, presión legal/regulatoria y limitaciones técnicas.",
  },
  {
    type: "tf",
    question:
      "Aunque Chrome no eliminó las cookies, Safari, Firefox y iOS ATT ya rompieron el 30–40% del addressable inventory.",
    answer: true,
    explanation:
      "Correcto. La identidad post-cookie ya es realidad en una parte importante del inventario gracias a Safari (ITP), Firefox (ETP) y iOS App Tracking Transparency. Por eso la infraestructura post-cookie (UID2, clean rooms, contextual con IA) se mantiene como inversión válida.",
  },
  {
    type: "mc",
    question: "¿Cuál es el rango típico de opt-in del iOS ATT prompt globalmente?",
    options: [
      "5–10%",
      "35–50% (50–70% en gaming apps)",
      "Más del 80%",
      "Cercano al 100%",
    ],
    answer: 1,
    explanation:
      "El opt-in iOS ATT promedio global es 35–50%, con 50–70% en gaming apps. Esto significa que más de la mitad del inventario iOS está fuera del tracking deterministic — uno de los drivers de adopción de UID2 y soluciones contextual + IA.",
  },
  {
    type: "tf",
    question:
      "UID2 (Unified ID 2.0) ya está soportado por aproximadamente el 75% del third-party data ecosystem.",
    answer: true,
    explanation:
      "Correcto. UID2 se consolidó como el alternative ID con mayor adopción del lado seller-side. Esa cobertura del ~75% del ecosistema lo convierte en el candidato más sólido cuando una marca quiere mantener identidad cross-site sin depender solo de Google.",
  },
  {
    type: "mc",
    question:
      "¿Desde qué fecha es obligatorio TCF 2.3 (Transparency and Consent Framework de IAB Europa)?",
    options: [
      "1 de enero de 2025",
      "28 de febrero de 2026",
      "Solo es recomendado, no obligatorio",
      "Desde 2022",
    ],
    answer: 1,
    explanation:
      "TCF 2.3 es obligatorio desde el 28 de febrero de 2026 en el mercado europeo. Es la base de cumplimiento que cualquier campaña digital en Europa debe respetar para gestionar consentimiento de usuarios.",
  },
];

/* ============================================================
 * CLASE 6 · B2B SaaS
 * ============================================================ */
export const quizClase6: QuizQuestion[] = [
  {
    type: "mc",
    question:
      "¿Cuál es el promedio de stakeholders en una decisión de compra enterprise SaaS?",
    options: ["1–2 personas", "3–4 personas", "6–10 personas", "Más de 30 personas"],
    answer: 2,
    explanation:
      "6–10 stakeholders en promedio. Eso convierte al B2B SaaS en un negocio de 'calentamiento de cuentas' más que de generación de leads individuales — toda la cuenta tiene que estar alineada para que la compra avance.",
  },
  {
    type: "tf",
    question:
      "En B2B SaaS la unidad de trabajo del programmatic es la persona, igual que en consumo.",
    answer: false,
    explanation:
      "Falso. En B2B SaaS la unidad es la cuenta, no la persona. Una cuenta puede tener 8 personas activas en research y todas deben calentarse simultáneamente. Por eso targeting y attribution se hacen a nivel de cuenta.",
  },
  {
    type: "mc",
    question:
      "¿Qué porcentaje del budget de marketing va a ABM en 2025 según los benchmarks del sector?",
    options: ["3%", "10%", "29%", "Más del 60%"],
    answer: 2,
    explanation:
      "29% del budget de marketing va a ABM en 2025, con 70% de marketers reportando ABM activo. El 97% reporta mayor ROI vs otras estrategias y hasta +208% revenue marketing-generated en 3 años.",
  },
  {
    type: "tf",
    question:
      "LinkedIn pasó del 31% al 39% del share de B2B budget entre 2023 y 2024.",
    answer: true,
    explanation:
      "Correcto. LinkedIn pasó del 31% al 39% del B2B budget en 2024, con ROAS promedio de 113%. Es el walled garden más relevante para B2B y por eso aparece en prácticamente todos los stacks recomendados.",
  },
  {
    type: "mc",
    question:
      "¿Cuál es el rango típico de TAM (cuentas target) para una empresa B2B SaaS enterprise?",
    options: [
      "10–50 cuentas",
      "500–5.000 cuentas",
      "1 millón de cuentas",
      "Sin límite, igual que B2C",
    ],
    answer: 1,
    explanation:
      "Una empresa B2B SaaS típica tiene 500–5.000 cuentas target. Esto invierte la lógica del programmatic de consumo (que asume audiencias enormes) — se compra impresiones para muchos contactos dentro de un set acotado, no para millones de personas.",
  },
  {
    type: "tf",
    question:
      "Plataformas ABM como 6sense o Demandbase enterprise tienen un rango de inversión anual de $60K–$300K+.",
    answer: true,
    explanation:
      "Correcto. 6sense y Demandbase enterprise están en $60K–$300K+ anual. Para empresas más chicas existen opciones como RollWorks Entry ($12K–$50K anual). El stack ABM crece según etapa de la empresa.",
  },
];

/* ============================================================
 * CLASE 7 · Formatos emergentes
 * ============================================================ */
export const quizClase7: QuizQuestion[] = [
  {
    type: "mc",
    question:
      "¿Cuánto se proyecta que crezca el mercado de Connected TV en EE.UU. de 2025 a 2026?",
    options: ["Decrecimiento del 5%", "+14,5% (de $33,4B a $37,95B)", "+200%", "Sin cambios"],
    answer: 1,
    explanation:
      "CTV en EE.UU. crece +14,5% de 2025 a 2026 ($33,4B → $37,95B), con proyección a $52,5B en 2029. Entre el 84–90% del inventario CTV se compra programáticamente, lo cual lo vuelve un formato 'programmatic-first' por defecto.",
  },
  {
    type: "tf",
    question:
      "Retail Media global en 2025 superó por primera vez a TV global en gasto publicitario.",
    answer: true,
    explanation:
      "Correcto. Retail Media global 2025 alcanzó $177,1B, superando a TV global por primera vez en la historia. Es uno de los cambios estructurales más relevantes del sector: el inventario ya no está concentrado en networks, sino en retailers con first-party data transaccional.",
  },
  {
    type: "mc",
    question: "¿Qué porcentaje del Retail Media en EE.UU. concentra Amazon Ads?",
    options: ["10%", "30%", "Cerca del 80% (79,7%)", "Menos del 5%"],
    answer: 2,
    explanation:
      "Amazon Ads concentra el 79,7% del Retail Media en EE.UU., con Walmart Connect en segundo lugar con 8,0%. Esto convierte a Amazon en un walled garden de facto incluso dentro del Retail Media.",
  },
  {
    type: "tf",
    question:
      "DOOH programático en 2025 es un formato pequeño que no merece atención en un plan ejecutivo.",
    answer: false,
    explanation:
      "Falso. DOOH programático fue $5,84B en 2025 con +17% hacia $6,83B en 2026. No es el formato más grande, pero crece a doble dígito y es uno de los pocos canales offline con activación programmatic real-time (clima, eventos, horario).",
  },
  {
    type: "mc",
    question: "¿Cuánto representa el mercado in-game advertising amplio en 2025?",
    options: ["$1B", "$10B", "$50B", "$124B"],
    answer: 3,
    explanation:
      "El in-game advertising amplio (incluyendo entornos in-game + reward + side panels) alcanzó $124B en 2025. El in-game puro (anuncios dentro del juego) fue $9,07B en 2024. Es uno de los formatos más subestimados en planes B2B.",
  },
  {
    type: "tf",
    question:
      "El audio digital programmatic en EE.UU. creció +18% en 2025 hasta $2,26B.",
    answer: true,
    explanation:
      "Correcto. Audio digital programmatic US 2025: $2,26B con +18% YoY. Podcast advertising global llegó a $3,56B. Aunque es un formato chico, su engagement (uso con auriculares, modo enfocado) tiene métricas de atención superiores a otros canales digitales.",
  },
];

/* ============================================================
 * CLASE 8 · Futuro y stack B2B
 * ============================================================ */
export const quizClase8: QuizQuestion[] = [
  {
    type: "mc",
    question:
      "¿Qué se entiende por 'Agentic AI' en el contexto programmatic 2026–2028?",
    options: [
      "Modelos ML embebidos en plataformas, igual que ahora",
      "Agentes IA que ejecutan tareas autónomas (bidding, creatividad, optimización) con menos intervención humana",
      "Un nuevo formato de banner",
      "Una herramienta de Excel",
    ],
    answer: 1,
    explanation:
      "Agentic AI es el paso de 'modelos ML embebidos' a 'agentes autónomos que ejecutan tareas'. Amazon Ads Agent (nov 2025), el pivot de Mutiny y los AI Agents for Brand Safety de Scope3 son los primeros ejemplos. Para 2027 se espera que bidding, creativity y optimization de portfolio corran con menos intervención humana.",
  },
  {
    type: "tf",
    question:
      "Se proyecta que Retail Media absorba más del 20% del gasto digital global para 2028.",
    answer: true,
    explanation:
      "Correcto. Retail Media seguirá creciendo hasta superar el 20% del gasto digital global para 2028. Amazon + Walmart concentran ~89% del growth incremental del segmento, lo que refuerza la concentración en pocos jugadores.",
  },
  {
    type: "mc",
    question:
      "Para una startup B2B SaaS Series B ($5M–$20M ARR), ¿cuál es el stack programático recomendado típico?",
    options: [
      "Solo Google Ads y nada más",
      "RollWorks o 6sense Growth + Segment + LinkedIn + intent data (~$30K–$70K/año)",
      "Stack enterprise completo con 6sense + Demandbase + clean rooms",
      "No invertir en programmatic hasta IPO",
    ],
    answer: 1,
    explanation:
      "Stack Series B típico: RollWorks o 6sense Growth + Segment (CDP) + LinkedIn + intent data, con presupuesto $30K–$70K anual. El stack escala según etapa: Series E+ ya incluye Demandbase, DSP independiente, clean rooms y MMM con dedicación full-time.",
  },
  {
    type: "tf",
    question:
      "En un plan B2B SaaS, el split por defecto sugerido es 60–70% walled gardens / 30–40% open web.",
    answer: true,
    explanation:
      "Correcto. Para B2B SaaS el default sugerido es 60–70% walled gardens (LinkedIn, Google, Meta) y 30–40% open web. La razón: LinkedIn captura mejor el targeting profesional y el ROAS es consistentemente más alto que en open web genérico.",
  },
  {
    type: "mc",
    question:
      "¿Cuál de los siguientes NO es un KPI típicamente recomendado para programmatic B2B?",
    options: [
      "Engaged accounts",
      "Pipeline influence",
      "Costo por impresión únicamente (sin más contexto)",
      "Incremental lift y win rate uplift",
    ],
    answer: 2,
    explanation:
      "Mirar solo CPM (costo por impresión) en B2B es un error: ignora la calidad de la cuenta, el avance del funnel y la influencia en pipeline. Los KPIs correctos son engaged accounts, pipeline influence, CPO, velocity, incremental lift y win rate uplift.",
  },
  {
    type: "tf",
    question:
      "La concentración de holding companies (fusión Omnicom+IPG, consolidación de DSPs) significa que en 2026–2028 hay más competencia y más opciones en el sector.",
    answer: false,
    explanation:
      "Falso. La consolidación reduce opciones y aumenta el poder negociador de pocos jugadores. Para un consultor o head of marketing, esto significa que la due diligence sobre partners y la negociación de fees/transparencia se vuelve más crítica, no menos.",
  },
];

export const allClassQuizzes: Record<number, QuizQuestion[]> = {
  1: quizClase1,
  2: quizClase2,
  3: quizClase3,
  4: quizClase4,
  5: quizClase5,
  6: quizClase6,
  7: quizClase7,
  8: quizClase8,
};
