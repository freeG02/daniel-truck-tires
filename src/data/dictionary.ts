/**
 * Site copy in the three supported languages. Spanish (es) is the canonical
 * source; en and fr are typed as `typeof es`, so the compiler flags any key
 * that is missing a translation.
 *
 * WhatsApp message templates (lib/whatsapp.ts) stay in Spanish on purpose:
 * they are read by the Dominican customer-service team, not the visitor.
 */

export type Lang = "es" | "en" | "fr";

/** A run of statement text; `hl` marks the phrases shown in brand red. */
export type Segment = { t: string; hl: boolean };

const es = {
  nav: { gomas: "Gomas", aros: "Aros", camiones: "Camiones", nosotros: "Nosotros" },
  header: {
    cta: "Contáctanos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    menu: "Menú",
  },
  auth: {
    account: "Mi cuenta",
    createAccount: "Crear cuenta",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    password: "Contraseña",
    submitSignUp: "Crear cuenta",
    submitSignIn: "Entrar",
    toSignIn: "¿Ya tienes cuenta? Inicia sesión",
    toSignUp: "¿No tienes cuenta? Crea una",
    signedInAs: "Sesión iniciada como",
    exists: "Ya existe una cuenta con ese correo.",
    invalid: "Correo o contraseña incorrectos.",
    required: "Completa nombre, correo y contraseña.",
    needAccount: "Crea una cuenta o inicia sesión para solicitar tu cotización.",
    forgot: "¿Olvidaste tu contraseña?",
    resetTitle: "Restablecer contraseña",
    newPassword: "Nueva contraseña",
    resetSubmit: "Restablecer contraseña",
    noAccountEmail: "No encontramos una cuenta con ese correo.",
    backSignIn: "Volver a iniciar sesión",
    prototypeNote: "Cuentas guardadas en este dispositivo (versión de prueba).",
  },
  sidebar: { label: "Importador directo · República Dominicana" },
  hero: {
    slides: [
      {
        lines: ["Gomas, aros", "y camiones", "importados"],
        subtitle:
          "Importamos gomas como nuevas, no recauchadas, aros y camiones directamente desde Canadá, del muelle a su almacén.",
      },
      {
        lines: ["De Canadá a", "República", "Dominicana"],
        subtitle:
          "Importación directa de camiones, gomas y aros para tu flota. Sin intermediarios y al mejor precio del mercado.",
      },
    ],
  },
  heroCard: {
    items: [
      { text: "Te importamos tu camión desde Canadá, con y sin camarote.", label: "Ver camiones importados" },
      { text: "Gomas de camión como nuevas, no recauchadas, en todas las medidas.", label: "Ver gomas de camión" },
      { text: "Aros de aluminio y de hierro para cada medida de goma.", label: "Ver aros" },
    ],
  },
  home: {
    statement: [
      { t: "Importamos gomas como nuevas, no recauchadas, aros y camiones directamente ", hl: false },
      { t: "desde Canadá", hl: true },
      { t: ", ", hl: false },
      { t: "desde el muelle hasta su almacén", hl: true },
      { t: ", ", hl: false },
      { t: "al mejor precio del mercado", hl: true },
      { t: ".", hl: false },
    ] as Segment[],
    complement:
      "Gomas con fechas de fabricación desde 2020. Ventas disponibles por medio contenedor o contenedor completo.",
    productsHeading: "Nuestros productos",
    categories: [
      { title: "Gomas de camión", description: "Gomas como nuevas, no recauchadas, en las medidas más usadas." },
      { title: "Aros", description: "Aros de aluminio y hierro para cada medida de goma." },
      { title: "Camiones importados", description: "Con y sin camarote, importados directamente desde Canadá." },
    ],
    seeProducts: "Ver productos",
    ctaHeading: "¿Buscas una medida o modelo específico?",
    ctaBody:
      "Escríbenos por WhatsApp con lo que necesitas y te confirmamos disponibilidad y precio de importador.",
    ctaButton: "Escribir por WhatsApp",
  },
  why: {
    tag: "Por qué elegirnos",
    headingLine1: "Calidad importada,",
    headingLine2: "al mejor precio del mercado",
    body:
      "Somos importadores directos de gomas, aros y camiones desde Canadá. Llevamos nuestros productos directamente desde el muelle hasta su almacén, ofreciéndole precios competitivos y productos de calidad.",
    cta: "Contáctanos",
    stats: [
      { label: "No recauchadas", value: "100%" },
      { label: "Importado desde", value: "Canadá" },
      { label: "Compra mínima", value: "1/2 contenedor" },
    ],
    features: [
      { title: "Al mejor precio del mercado", description: "Importamos directo, sin intermediarios que encarezcan." },
      { title: "No recauchadas", description: "Gomas como nuevas seleccionadas, nunca recauchadas." },
      { title: "Del muelle a su almacén", description: "Por medio contenedor o contenedor completo." },
      { title: "Directo de Canadá", description: "Camiones con y sin camarote, importados desde Canadá." },
    ],
  },
  how: {
    tag: "Proceso simple",
    headingLine1: "Así de fácil es",
    headingLine2: "hacer tu pedido",
    intro:
      "Todavía no vendemos en línea. Coordinamos todo por WhatsApp, de forma rápida y clara, desde el primer mensaje hasta la entrega.",
    steps: [
      { title: "Escríbenos por WhatsApp", description: "Elige el producto y toca el botón de WhatsApp. Se abre un chat con los detalles listos para enviar." },
      { title: "Confirmamos tu pedido", description: "Te confirmamos la disponibilidad, las medidas y el precio de importador." },
      { title: "Realiza el pago", description: "Paga por transferencia bancaria o con el enlace de pago que te enviamos." },
      { title: "Coordina la entrega", description: "Al confirmar el pago, coordinamos la entrega de tu pedido." },
    ],
  },
  testimonials: {
    tag: "Testimonios",
    heading: "Lo que dicen nuestros clientes",
    items: [
      { quote: "Compré un juego de gomas y el precio fue mucho mejor que en la calle. Todo por WhatsApp, rápido y claro.", name: "Nombre del cliente", role: "Transportista" },
      { quote: "Me importaron el camión desde Canadá tal como lo pedí, con camarote. Excelente comunicación en todo el proceso.", name: "Nombre del cliente", role: "Empresa de carga" },
      { quote: "Pedí aros para mi flota y llegaron en la medida correcta. Volveré a comprar sin duda.", name: "Nombre del cliente", role: "Flota de camiones" },
    ],
  },
  faq: {
    heading: "Preguntas frecuentes",
    items: [
      { q: "¿Las gomas son nuevas o recauchadas?", a: "Nuestras gomas son como nuevas, seleccionadas y en buen estado, con fechas de fabricación desde 2020. Nunca son recauchadas." },
      { q: "¿Cuál es la compra mínima?", a: "La compra mínima es medio contenedor. Vendemos por medio contenedor o contenedor completo, al mejor precio del mercado." },
      { q: "¿Qué formas de pago aceptan?", a: "Puedes pagar por transferencia bancaria o mediante un enlace de pago que te enviamos al confirmar tu pedido." },
      { q: "¿Cuánto tarda importar un camión desde Canadá?", a: "El tiempo depende del modelo y la disponibilidad. Escríbenos por WhatsApp y te damos un estimado para tu caso." },
      { q: "¿Hacen entregas?", a: "Sí. Al confirmar el pago coordinamos la entrega de tu pedido. Escríbenos para conocer las opciones según tu ubicación." },
    ],
  },
  footer: {
    tagline: "Gomas, aros y camiones importados directamente desde Canadá",
    products: "Productos",
    company: "Empresa",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    label: "Importador directo · República Dominicana",
  },
  cart: {
    title: "Tu carrito",
    empty1: "Tu carrito está vacío",
    empty2: "Agrega gomas, aros o camiones y pídelos todos juntos por WhatsApp.",
    note: "No se cobra en línea. Confirmamos disponibilidad y precio de importador por WhatsApp.",
    checkout: "Comprar ahora",
    clear: "Vaciar carrito",
    remove: "Quitar",
    open: "Abrir carrito",
    close: "Cerrar carrito",
    addOne: (label: string) => `Agregar una unidad de ${label}`,
    removeOne: (label: string) => `Quitar una unidad de ${label}`,
  },
  containers: {
    title: "Mis contenedores",
    subtitle: "Cada contenedor admite hasta 2 modelos de goma.",
    container: (n: number) => `Contenedor ${n}`,
    full: "Completo",
    inProgress: "En progreso",
    half: "1/2 contenedor",
    units: (n: number) => `${n} uds.`,
    fullContainers: (n: number) =>
      n === 1 ? "1 contenedor lleno" : `${n} contenedores llenos`,
    totalTires: (n: number) => `${n} gomas en total`,
    remaining: "Falta 1/2 contenedor para completar este.",
    empty: "Aún no has agregado gomas. Se venden por 1/2 contenedor.",
    halfNote: "Venta por 1/2 contenedor (mínimo).",
    view: "Ver mis contenedores",
  },
  addTire: {
    title: "Elige la cantidad",
    containersLabel: "Contenedores",
    tires: (n: number) => `${n} gomas`,
    added: "Producto agregado al carrito",
    viewCart: "Ver carrito",
    keepShopping: "Seguir comprando",
  },
  buy: {
    buyNow: "Comprar ahora",
    addToCart: "Agregar al carrito",
    addAria: (label: string) => `Agregar ${label} al carrito`,
  },
  catalog: {
    consult: "Consultar disponibilidad",
    perUnit: "por unidad",
    noRetread: "No recauchada",
    positionLabel: "Posición recomendada:",
    sizesLabel: "Medidas disponibles:",
    relatedHeading: "También te puede interesar",
    priceNote: (n: number) => `por unidad · mín. ${n} uds. (1/2 contenedor)`,
    moqNote: (half: number, full: number) =>
      `Compra mínima: ${half} unidades (1/2 contenedor). Contenedor completo: aprox. ${full} unidades.`,
    gomas: {
      h1: "Gomas",
      intro:
        "Gomas como nuevas, no recauchadas, importadas directamente desde Canadá. Fechas de fabricación desde 2020. Venta por medio contenedor o contenedor completo, al mejor precio del mercado.",
    },
    aros: {
      h1: "Aros",
      intro: "Aros de aluminio y de hierro para cada tipo de goma de camión, al mejor precio del mercado.",
    },
    camiones: {
      h1: "Camiones importados",
      intro: "Te importamos tu camión directamente desde Canadá, con camarote o sin camarote, al mejor precio del mercado.",
    },
    material: { Aluminio: "Aluminio", Hierro: "Hierro" },
    cab: { "Con camarote": "Con camarote", "Sin camarote": "Sin camarote" },
    tires: {
      "12r22-5": { name: "Goma de camión 12R22.5", position: "Dirección / Tracción", description: "Goma como nueva (no recauchada) medida 12R22.5, ideal para eje direccional o de tracción en camiones y tractocamiones." },
      "11r22-5": { name: "Goma de camión 11R22.5", position: "Dirección / Tracción / Arrastre", description: "Goma como nueva (no recauchada) medida 11R22.5, una de las medidas más usadas en camiones de carga y remolques." },
      "11r24-5": { name: "Goma de camión 11R24.5", position: "Tracción / Arrastre", description: "Goma como nueva (no recauchada) medida 11R24.5, recomendada para ejes de tracción y remolques de carga pesada." },
      "315-80r22-5": { name: "Goma de camión 315/80R22.5", position: "Dirección / Tracción", description: "Goma como nueva (no recauchada) medida 315/80R22.5, alta durabilidad para uso en carretera y carga pesada." },
      "r15-80": { name: "Goma para vehículos livianos R15/80", position: "Vehículos livianos", description: "Goma como nueva (no recauchada) para vehículos livianos, medida R15/80. Ideal para autos, jeepetas y camionetas ligeras." },
    },
    rims: {
      "aro-aluminio-22-5": { name: "Aro de aluminio para camión", description: "Aro de aluminio para camión, disponible en las medidas que corresponden a cada goma (22.5\" y 24.5\"). Mayor duración y menor peso." },
      "aro-hierro-22-5": { name: "Aro de hierro para camión", description: "Aro de hierro (acero) para camión, disponible en las medidas que corresponden a cada goma (22.5\" y 24.5\"). Opción resistente al mejor precio del mercado." },
    },
    trucks: {
      "camion-con-camarote": { name: "Camión con camarote (sleeper)", description: "Camiones importados directamente desde Canadá con camarote (sleeper cab), ideales para rutas largas. Disponibilidad bajo pedido." },
      "camion-sin-camarote": { name: "Camión sin camarote (day cab)", description: "Camiones importados directamente desde Canadá sin camarote (day cab), ideales para distribución local y regional. Disponibilidad bajo pedido." },
    },
  },
  truckForm: {
    cta: "Solicitar cotización",
    title: "Solicita tu camión",
    intro:
      "Los modelos varían según disponibilidad. Cuéntanos qué camión buscas y te preparamos una cotización.",
    name: "Nombre",
    phone: "Teléfono / WhatsApp",
    brand: "Marca",
    brandOther: "Otra",
    model: "Modelo (ej. Cascadia, T680)",
    year: "Año",
    condition: "Condición",
    conditionUsed: "Usado",
    conditionLikeNew: "Como nuevo",
    conditionNew: "Nuevo",
    cab: "Cabina",
    cabWith: "Con camarote",
    cabWithout: "Sin camarote",
    color: "Color",
    mileage: "Kilometraje máximo",
    transmission: "Transmisión",
    transAuto: "Automática",
    transManual: "Manual",
    budget: "Presupuesto (RD$)",
    notes: "Notas adicionales",
    any: "Cualquiera",
    select: "Seleccionar",
    optional: "opcional",
    open: "Especifica tu camión",
    submit: "Solicitar cotización",
    cancel: "Cancelar",
    nameRequired: "Escribe tu nombre para continuar.",
  },
  nosotros: {
    missionTag: "Nuestra historia",
    missionHeading: "Por qué empezamos",
    missionIntro:
      "Daniel Truck and Tires nació para acercar a los transportistas de República Dominicana a las gomas, aros y camiones que necesitan. Somos un equipo pequeño y cercano que conoce el negocio del transporte y trata cada pedido como si fuera propio.",
    teamPhotoLabel: "Foto del equipo",
    values: [
      {
        title: "El comienzo",
        description:
          "Empezamos con una idea simple: conseguir para los transportistas dominicanos las mismas gomas y camiones que se consiguen en Canadá, a un precio justo y sin intermediarios.",
      },
      {
        title: "Nuestra manera",
        description:
          "Trabajamos de cerca, por WhatsApp, respondiendo rápido y con honestidad. No vendemos por vender: te ayudamos a elegir lo que de verdad necesitas.",
      },
      {
        title: "Hacia dónde vamos",
        description:
          "Seguimos creciendo junto a nuestros clientes, sumando medidas, modelos y mejores tiempos de entrega, sin perder el trato cercano que nos distingue.",
      },
    ],
    teamTag: "Nuestro equipo",
    teamHeading: "Cercanos. Honestos. Confiables.",
    teamIntro:
      "Un equipo que conoce el transporte de carga y responde rápido. Cuéntanos qué necesitas y te acompañamos de principio a fin.",
    memberName: "Nombre Apellido",
    roles: ["Fundador", "Operaciones", "Ventas", "Logística"],
    ctaTag: "Empecemos",
    ctaHeading: "Hablemos de tu próximo pedido",
    ctaBody:
      "Escríbenos por WhatsApp y te confirmamos disponibilidad y el mejor precio del mercado.",
    ctaButton: "Contáctanos por WhatsApp",
  },
};

const en: typeof es = {
  nav: { gomas: "Tires", aros: "Rims", camiones: "Trucks", nosotros: "About" },
  header: {
    cta: "Contact us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    menu: "Menu",
  },
  auth: {
    account: "My account",
    createAccount: "Create account",
    signIn: "Sign in",
    signOut: "Sign out",
    name: "Name",
    email: "Email",
    phone: "Phone / WhatsApp",
    password: "Password",
    submitSignUp: "Create account",
    submitSignIn: "Sign in",
    toSignIn: "Already have an account? Sign in",
    toSignUp: "No account yet? Create one",
    signedInAs: "Signed in as",
    exists: "An account with that email already exists.",
    invalid: "Incorrect email or password.",
    required: "Fill in name, email and password.",
    needAccount: "Create an account or sign in to request your quote.",
    forgot: "Forgot your password?",
    resetTitle: "Reset password",
    newPassword: "New password",
    resetSubmit: "Reset password",
    noAccountEmail: "We couldn't find an account with that email.",
    backSignIn: "Back to sign in",
    prototypeNote: "Accounts saved on this device (preview version).",
  },
  sidebar: { label: "Direct importer · Dominican Republic" },
  hero: {
    slides: [
      {
        lines: ["Tires, rims", "and trucks", "imported"],
        subtitle:
          "We import like-new tires, not retreaded, plus rims and trucks directly from Canada, from the dock to your warehouse.",
      },
      {
        lines: ["From Canada to", "the Dominican", "Republic"],
        subtitle:
          "Direct import of trucks, tires and rims for your fleet. No middlemen, at the best price on the market.",
      },
    ],
  },
  heroCard: {
    items: [
      { text: "We import your truck from Canada, with or without a sleeper cab.", label: "See imported trucks" },
      { text: "Like-new truck tires, not retreaded, in every size.", label: "See truck tires" },
      { text: "Aluminum and steel rims for every tire size.", label: "See rims" },
    ],
  },
  home: {
    statement: [
      { t: "We import like-new tires, not retreaded, rims and trucks directly ", hl: false },
      { t: "from Canada", hl: true },
      { t: ", ", hl: false },
      { t: "from the dock to your warehouse", hl: true },
      { t: ", ", hl: false },
      { t: "at the best price on the market", hl: true },
      { t: ".", hl: false },
    ] as Segment[],
    complement:
      "Tires manufactured from 2020 onward. Available by half container or full container.",
    productsHeading: "Our products",
    categories: [
      { title: "Truck tires", description: "Like-new tires, not retreaded, in the most common sizes." },
      { title: "Rims", description: "Aluminum and steel rims for every tire size." },
      { title: "Imported trucks", description: "With or without a sleeper cab, imported directly from Canada." },
    ],
    seeProducts: "See products",
    ctaHeading: "Looking for a specific size or model?",
    ctaBody:
      "Message us on WhatsApp with what you need and we will confirm availability and importer pricing.",
    ctaButton: "Message on WhatsApp",
  },
  why: {
    tag: "Why choose us",
    headingLine1: "Imported quality,",
    headingLine2: "at the best price on the market",
    body:
      "We are direct importers of tires, rims and trucks from Canada. We bring our products straight from the dock to your warehouse, offering you competitive prices and quality products.",
    cta: "Contact us",
    stats: [
      { label: "Not retreaded", value: "100%" },
      { label: "Imported from", value: "Canada" },
      { label: "Minimum order", value: "1/2 container" },
    ],
    features: [
      { title: "Best price on the market", description: "We import directly, with no middlemen adding cost." },
      { title: "Not retreaded", description: "Selected like-new tires, never retreaded." },
      { title: "Dock to your warehouse", description: "By half container or full container." },
      { title: "Straight from Canada", description: "Trucks with and without sleeper cabs, imported from Canada." },
    ],
  },
  how: {
    tag: "Simple process",
    headingLine1: "This is how easy",
    headingLine2: "ordering is",
    intro:
      "We do not sell online yet. We coordinate everything over WhatsApp, quickly and clearly, from the first message to delivery.",
    steps: [
      { title: "Message us on WhatsApp", description: "Pick the product and tap the WhatsApp button. A chat opens with the details ready to send." },
      { title: "We confirm your order", description: "We confirm availability, sizes and importer pricing." },
      { title: "Make the payment", description: "Pay by bank transfer or with the payment link we send you." },
      { title: "We arrange delivery", description: "Once payment is confirmed, we arrange delivery of your order." },
    ],
  },
  testimonials: {
    tag: "Testimonials",
    heading: "What our customers say",
    items: [
      { quote: "I bought a set of tires and the price was much better than in the street. All over WhatsApp, fast and clear.", name: "Customer name", role: "Trucker" },
      { quote: "They imported the truck from Canada exactly as I ordered it, with a sleeper cab. Excellent communication throughout.", name: "Customer name", role: "Freight company" },
      { quote: "I ordered rims for my fleet and they arrived in the correct size. I will definitely buy again.", name: "Customer name", role: "Truck fleet" },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "Are the tires new or retreaded?", a: "Our tires are like new, selected and in good condition, manufactured from 2020 onward. They are never retreaded." },
      { q: "What is the minimum order?", a: "The minimum order is half a container. We sell by half container or full container, at the best price on the market." },
      { q: "What payment methods do you accept?", a: "You can pay by bank transfer or through a payment link we send you when we confirm your order." },
      { q: "How long does it take to import a truck from Canada?", a: "It depends on the model and availability. Message us on WhatsApp and we will give you an estimate for your case." },
      { q: "Do you deliver?", a: "Yes. Once payment is confirmed we arrange delivery of your order. Message us to learn the options for your location." },
    ],
  },
  footer: {
    tagline: "Tires, rims and trucks imported directly from Canada",
    products: "Products",
    company: "Company",
    contact: "Contact",
    rights: "All rights reserved.",
    label: "Direct importer · Dominican Republic",
  },
  cart: {
    title: "Your cart",
    empty1: "Your cart is empty",
    empty2: "Add tires, rims or trucks and order them all together over WhatsApp.",
    note: "No online charge. We confirm availability and importer pricing over WhatsApp.",
    checkout: "Buy now",
    clear: "Empty cart",
    remove: "Remove",
    open: "Open cart",
    close: "Close cart",
    addOne: (label: string) => `Add one unit of ${label}`,
    removeOne: (label: string) => `Remove one unit of ${label}`,
  },
  containers: {
    title: "My containers",
    subtitle: "Each container holds up to 2 tire models.",
    container: (n: number) => `Container ${n}`,
    full: "Full",
    inProgress: "In progress",
    half: "1/2 container",
    units: (n: number) => `${n} units`,
    fullContainers: (n: number) =>
      n === 1 ? "1 full container" : `${n} full containers`,
    totalTires: (n: number) => `${n} tires in total`,
    remaining: "Add 1/2 container more to complete this one.",
    empty: "You haven't added tires yet. They are sold by the 1/2 container.",
    halfNote: "Sold by the 1/2 container (minimum).",
    view: "View my containers",
  },
  addTire: {
    title: "Choose the amount",
    containersLabel: "Containers",
    tires: (n: number) => `${n} tires`,
    added: "Item added to cart",
    viewCart: "View cart",
    keepShopping: "Keep shopping",
  },
  buy: {
    buyNow: "Buy now",
    addToCart: "Add to cart",
    addAria: (label: string) => `Add ${label} to the cart`,
  },
  catalog: {
    consult: "Check availability",
    perUnit: "per unit",
    noRetread: "Not retreaded",
    positionLabel: "Recommended position:",
    sizesLabel: "Available sizes:",
    relatedHeading: "You might also like",
    priceNote: (n: number) => `per unit · min. ${n} units (1/2 container)`,
    moqNote: (half: number, full: number) =>
      `Minimum order: ${half} units (1/2 container). Full container: approx. ${full} units.`,
    gomas: {
      h1: "Tires",
      intro:
        "Like-new tires, not retreaded, imported directly from Canada. Manufactured from 2020 onward. Sold by half container or full container, at the best price on the market.",
    },
    aros: {
      h1: "Rims",
      intro: "Aluminum and steel rims for every type of truck tire, at the best price on the market.",
    },
    camiones: {
      h1: "Imported trucks",
      intro: "We import your truck directly from Canada, with or without a sleeper cab, at the best price on the market.",
    },
    material: { Aluminio: "Aluminum", Hierro: "Steel" },
    cab: { "Con camarote": "With sleeper cab", "Sin camarote": "Without sleeper cab" },
    tires: {
      "12r22-5": { name: "12R22.5 truck tire", position: "Steer / Drive", description: "Like-new (not retreaded) 12R22.5 tire, ideal for the steer or drive axle on trucks and tractor units." },
      "11r22-5": { name: "11R22.5 truck tire", position: "Steer / Drive / Trailer", description: "Like-new (not retreaded) 11R22.5 tire, one of the most common sizes on freight trucks and trailers." },
      "11r24-5": { name: "11R24.5 truck tire", position: "Drive / Trailer", description: "Like-new (not retreaded) 11R24.5 tire, recommended for drive axles and heavy-haul trailers." },
      "315-80r22-5": { name: "315/80R22.5 truck tire", position: "Steer / Drive", description: "Like-new (not retreaded) 315/80R22.5 tire, high durability for highway use and heavy loads." },
      "r15-80": { name: "R15/80 light-vehicle tire", position: "Light vehicles", description: "Like-new (not retreaded) R15/80 tire for light vehicles. Ideal for cars, SUVs and light pickups." },
    },
    rims: {
      "aro-aluminio-22-5": { name: "Aluminum truck rim", description: "Aluminum truck rim, available in the sizes that match each tire (22.5\" and 24.5\"). Longer life and lighter weight." },
      "aro-hierro-22-5": { name: "Steel truck rim", description: "Steel truck rim, available in the sizes that match each tire (22.5\" and 24.5\"). A tough option at the best price on the market." },
    },
    trucks: {
      "camion-con-camarote": { name: "Truck with sleeper cab", description: "Trucks imported directly from Canada with a sleeper cab, ideal for long routes. Availability on request." },
      "camion-sin-camarote": { name: "Truck without sleeper cab (day cab)", description: "Trucks imported directly from Canada without a sleeper cab (day cab), ideal for local and regional distribution. Availability on request." },
    },
  },
  truckForm: {
    cta: "Request a quote",
    title: "Request your truck",
    intro:
      "Models vary with availability. Tell us which truck you're looking for and we'll prepare a quote.",
    name: "Name",
    phone: "Phone / WhatsApp",
    brand: "Brand",
    brandOther: "Other",
    model: "Model (e.g. Cascadia, T680)",
    year: "Year",
    condition: "Condition",
    conditionUsed: "Used",
    conditionLikeNew: "Like new",
    conditionNew: "New",
    cab: "Cab",
    cabWith: "With sleeper cab",
    cabWithout: "Without sleeper cab",
    color: "Color",
    mileage: "Maximum mileage",
    transmission: "Transmission",
    transAuto: "Automatic",
    transManual: "Manual",
    budget: "Budget (RD$)",
    notes: "Additional notes",
    any: "Any",
    select: "Select",
    optional: "optional",
    open: "Specify your truck",
    submit: "Request a quote",
    cancel: "Cancel",
    nameRequired: "Enter your name to continue.",
  },
  nosotros: {
    missionTag: "Our story",
    missionHeading: "Why we started",
    missionIntro:
      "Daniel Truck and Tires started to bring truckers in the Dominican Republic closer to the tires, rims and trucks they need. We're a small, close-knit team that knows the trucking business and treats every order as our own.",
    teamPhotoLabel: "Team photo",
    values: [
      {
        title: "The beginning",
        description:
          "We started with a simple idea: get Dominican truckers the same tires and trucks available in Canada, at a fair price and with no middlemen.",
      },
      {
        title: "Our way",
        description:
          "We work closely, over WhatsApp, answering fast and honestly. We don't sell for the sake of it: we help you choose what you actually need.",
      },
      {
        title: "Where we're going",
        description:
          "We keep growing alongside our customers, adding sizes, models and faster delivery times, without losing the personal touch that sets us apart.",
      },
    ],
    teamTag: "Our team",
    teamHeading: "Close. Honest. Reliable.",
    teamIntro:
      "A team that knows freight transport and responds fast. Tell us what you need and we'll be with you from start to finish.",
    memberName: "First Last",
    roles: ["Founder", "Operations", "Sales", "Logistics"],
    ctaTag: "Let's start",
    ctaHeading: "Let's talk about your next order",
    ctaBody:
      "Message us on WhatsApp and we'll confirm availability and the best price on the market.",
    ctaButton: "Contact us on WhatsApp",
  },
};

const fr: typeof es = {
  nav: { gomas: "Pneus", aros: "Jantes", camiones: "Camions", nosotros: "À propos" },
  header: {
    cta: "Contactez-nous",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    menu: "Menu",
  },
  auth: {
    account: "Mon compte",
    createAccount: "Créer un compte",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    password: "Mot de passe",
    submitSignUp: "Créer un compte",
    submitSignIn: "Se connecter",
    toSignIn: "Vous avez déjà un compte ? Connectez-vous",
    toSignUp: "Pas encore de compte ? Créez-en un",
    signedInAs: "Connecté en tant que",
    exists: "Un compte avec cet e-mail existe déjà.",
    invalid: "E-mail ou mot de passe incorrect.",
    required: "Renseignez nom, e-mail et mot de passe.",
    needAccount: "Créez un compte ou connectez-vous pour demander votre devis.",
    forgot: "Mot de passe oublié ?",
    resetTitle: "Réinitialiser le mot de passe",
    newPassword: "Nouveau mot de passe",
    resetSubmit: "Réinitialiser le mot de passe",
    noAccountEmail: "Aucun compte trouvé avec cet e-mail.",
    backSignIn: "Retour à la connexion",
    prototypeNote: "Comptes enregistrés sur cet appareil (version de démonstration).",
  },
  sidebar: { label: "Importateur direct · République dominicaine" },
  hero: {
    slides: [
      {
        lines: ["Pneus, jantes", "et camions", "importés"],
        subtitle:
          "Nous importons des pneus comme neufs, non rechapés, des jantes et des camions directement du Canada, du quai à votre entrepôt.",
      },
      {
        lines: ["Du Canada à la", "République", "dominicaine"],
        subtitle:
          "Importation directe de camions, pneus et jantes pour votre flotte. Sans intermédiaires et au meilleur prix du marché.",
      },
    ],
  },
  heroCard: {
    items: [
      { text: "Nous importons votre camion du Canada, avec ou sans couchette.", label: "Voir les camions importés" },
      { text: "Pneus de camion comme neufs, non rechapés, dans toutes les tailles.", label: "Voir les pneus de camion" },
      { text: "Jantes en aluminium et en acier pour chaque taille de pneu.", label: "Voir les jantes" },
    ],
  },
  home: {
    statement: [
      { t: "Nous importons des pneus comme neufs, non rechapés, des jantes et des camions directement ", hl: false },
      { t: "du Canada", hl: true },
      { t: ", ", hl: false },
      { t: "du quai à votre entrepôt", hl: true },
      { t: ", ", hl: false },
      { t: "au meilleur prix du marché", hl: true },
      { t: ".", hl: false },
    ] as Segment[],
    complement:
      "Pneus fabriqués à partir de 2020. Disponibles par demi-conteneur ou conteneur complet.",
    productsHeading: "Nos produits",
    categories: [
      { title: "Pneus de camion", description: "Pneus comme neufs, non rechapés, dans les tailles les plus courantes." },
      { title: "Jantes", description: "Jantes en aluminium et en acier pour chaque taille de pneu." },
      { title: "Camions importés", description: "Avec ou sans couchette, importés directement du Canada." },
    ],
    seeProducts: "Voir les produits",
    ctaHeading: "Vous cherchez une taille ou un modèle précis ?",
    ctaBody:
      "Écrivez-nous sur WhatsApp en indiquant ce dont vous avez besoin et nous confirmons la disponibilité et le prix importateur.",
    ctaButton: "Écrire sur WhatsApp",
  },
  why: {
    tag: "Pourquoi nous choisir",
    headingLine1: "Qualité importée,",
    headingLine2: "au meilleur prix du marché",
    body:
      "Nous sommes importateurs directs de pneus, jantes et camions depuis le Canada. Nous acheminons nos produits directement du quai à votre entrepôt, en vous offrant des prix compétitifs et des produits de qualité.",
    cta: "Contactez-nous",
    stats: [
      { label: "Non rechapés", value: "100%" },
      { label: "Importé depuis", value: "Canada" },
      { label: "Commande minimale", value: "1/2 conteneur" },
    ],
    features: [
      { title: "Au meilleur prix du marché", description: "Nous importons en direct, sans intermédiaires qui gonflent le prix." },
      { title: "Non rechapés", description: "Pneus comme neufs sélectionnés, jamais rechapés." },
      { title: "Du quai à votre entrepôt", description: "Par demi-conteneur ou conteneur complet." },
      { title: "Directement du Canada", description: "Camions avec et sans couchette, importés du Canada." },
    ],
  },
  how: {
    tag: "Processus simple",
    headingLine1: "Passer commande",
    headingLine2: "est aussi simple",
    intro:
      "Nous ne vendons pas encore en ligne. Nous coordonnons tout par WhatsApp, rapidement et clairement, du premier message à la livraison.",
    steps: [
      { title: "Écrivez-nous sur WhatsApp", description: "Choisissez le produit et touchez le bouton WhatsApp. Un chat s'ouvre avec les détails prêts à envoyer." },
      { title: "Nous confirmons votre commande", description: "Nous confirmons la disponibilité, les tailles et le prix importateur." },
      { title: "Effectuez le paiement", description: "Payez par virement bancaire ou avec le lien de paiement que nous vous envoyons." },
      { title: "Nous organisons la livraison", description: "Une fois le paiement confirmé, nous organisons la livraison de votre commande." },
    ],
  },
  testimonials: {
    tag: "Témoignages",
    heading: "Ce que disent nos clients",
    items: [
      { quote: "J'ai acheté un jeu de pneus et le prix était bien meilleur que dans la rue. Tout par WhatsApp, rapide et clair.", name: "Nom du client", role: "Camionneur" },
      { quote: "Ils ont importé le camion du Canada exactement comme je l'avais demandé, avec couchette. Excellente communication tout au long.", name: "Nom du client", role: "Entreprise de fret" },
      { quote: "J'ai commandé des jantes pour ma flotte et elles sont arrivées à la bonne taille. Je rachèterai sans hésiter.", name: "Nom du client", role: "Flotte de camions" },
    ],
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      { q: "Les pneus sont-ils neufs ou rechapés ?", a: "Nos pneus sont comme neufs, sélectionnés et en bon état, fabriqués à partir de 2020. Ils ne sont jamais rechapés." },
      { q: "Quelle est la commande minimale ?", a: "La commande minimale est d'un demi-conteneur. Nous vendons par demi-conteneur ou conteneur complet, au meilleur prix du marché." },
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Vous pouvez payer par virement bancaire ou via un lien de paiement que nous vous envoyons à la confirmation de votre commande." },
      { q: "Combien de temps faut-il pour importer un camion du Canada ?", a: "Cela dépend du modèle et de la disponibilité. Écrivez-nous sur WhatsApp et nous vous donnons une estimation pour votre cas." },
      { q: "Faites-vous des livraisons ?", a: "Oui. Une fois le paiement confirmé, nous organisons la livraison de votre commande. Écrivez-nous pour connaître les options selon votre emplacement." },
    ],
  },
  footer: {
    tagline: "Pneus, jantes et camions importés directement du Canada",
    products: "Produits",
    company: "Entreprise",
    contact: "Contact",
    rights: "Tous droits réservés.",
    label: "Importateur direct · République dominicaine",
  },
  cart: {
    title: "Votre panier",
    empty1: "Votre panier est vide",
    empty2: "Ajoutez des pneus, des jantes ou des camions et commandez-les ensemble sur WhatsApp.",
    note: "Aucun paiement en ligne. Nous confirmons la disponibilité et le prix importateur sur WhatsApp.",
    checkout: "Acheter maintenant",
    clear: "Vider le panier",
    remove: "Retirer",
    open: "Ouvrir le panier",
    close: "Fermer le panier",
    addOne: (label: string) => `Ajouter une unité de ${label}`,
    removeOne: (label: string) => `Retirer une unité de ${label}`,
  },
  containers: {
    title: "Mes conteneurs",
    subtitle: "Chaque conteneur accepte jusqu'à 2 modèles de pneus.",
    container: (n: number) => `Conteneur ${n}`,
    full: "Complet",
    inProgress: "En cours",
    half: "1/2 conteneur",
    units: (n: number) => `${n} unités`,
    fullContainers: (n: number) =>
      n === 1 ? "1 conteneur complet" : `${n} conteneurs complets`,
    totalTires: (n: number) => `${n} pneus au total`,
    remaining: "Ajoutez 1/2 conteneur de plus pour le compléter.",
    empty: "Vous n'avez pas encore ajouté de pneus. Ils sont vendus par 1/2 conteneur.",
    halfNote: "Vendu par 1/2 conteneur (minimum).",
    view: "Voir mes conteneurs",
  },
  addTire: {
    title: "Choisissez la quantité",
    containersLabel: "Conteneurs",
    tires: (n: number) => `${n} pneus`,
    added: "Produit ajouté au panier",
    viewCart: "Voir le panier",
    keepShopping: "Continuer les achats",
  },
  buy: {
    buyNow: "Acheter maintenant",
    addToCart: "Ajouter au panier",
    addAria: (label: string) => `Ajouter ${label} au panier`,
  },
  catalog: {
    consult: "Vérifier la disponibilité",
    perUnit: "par unité",
    noRetread: "Non rechapé",
    positionLabel: "Position recommandée :",
    sizesLabel: "Tailles disponibles :",
    relatedHeading: "Vous aimerez aussi",
    priceNote: (n: number) => `par unité · min. ${n} unités (1/2 conteneur)`,
    moqNote: (half: number, full: number) =>
      `Commande minimale : ${half} unités (1/2 conteneur). Conteneur complet : environ ${full} unités.`,
    gomas: {
      h1: "Pneus",
      intro:
        "Pneus comme neufs, non rechapés, importés directement du Canada. Fabriqués à partir de 2020. Vendus par demi-conteneur ou conteneur complet, au meilleur prix du marché.",
    },
    aros: {
      h1: "Jantes",
      intro: "Jantes en aluminium et en acier pour chaque type de pneu de camion, au meilleur prix du marché.",
    },
    camiones: {
      h1: "Camions importés",
      intro: "Nous importons votre camion directement du Canada, avec ou sans couchette, au meilleur prix du marché.",
    },
    material: { Aluminio: "Aluminium", Hierro: "Acier" },
    cab: { "Con camarote": "Avec couchette", "Sin camarote": "Sans couchette" },
    tires: {
      "12r22-5": { name: "Pneu de camion 12R22.5", position: "Direction / Traction", description: "Pneu comme neuf (non rechapé) en taille 12R22.5, idéal pour l'essieu directeur ou de traction des camions et tracteurs." },
      "11r22-5": { name: "Pneu de camion 11R22.5", position: "Direction / Traction / Remorque", description: "Pneu comme neuf (non rechapé) en taille 11R22.5, l'une des tailles les plus utilisées sur les camions de charge et les remorques." },
      "11r24-5": { name: "Pneu de camion 11R24.5", position: "Traction / Remorque", description: "Pneu comme neuf (non rechapé) en taille 11R24.5, recommandé pour les essieux de traction et les remorques de charge lourde." },
      "315-80r22-5": { name: "Pneu de camion 315/80R22.5", position: "Direction / Traction", description: "Pneu comme neuf (non rechapé) en taille 315/80R22.5, grande durabilité pour la route et les charges lourdes." },
      "r15-80": { name: "Pneu R15/80 pour véhicules légers", position: "Véhicules légers", description: "Pneu comme neuf (non rechapé) pour véhicules légers, taille R15/80. Idéal pour voitures, VUS et camionnettes légères." },
    },
    rims: {
      "aro-aluminio-22-5": { name: "Jante en aluminium pour camion", description: "Jante en aluminium pour camion, disponible dans les tailles correspondant à chaque pneu (22,5\" et 24,5\"). Plus durable et plus légère." },
      "aro-hierro-22-5": { name: "Jante en acier pour camion", description: "Jante en acier pour camion, disponible dans les tailles correspondant à chaque pneu (22,5\" et 24,5\"). Une option robuste au meilleur prix du marché." },
    },
    trucks: {
      "camion-con-camarote": { name: "Camion avec couchette", description: "Camions importés directement du Canada avec couchette, idéaux pour les longs trajets. Disponibilité sur commande." },
      "camion-sin-camarote": { name: "Camion sans couchette (day cab)", description: "Camions importés directement du Canada sans couchette (day cab), idéaux pour la distribution locale et régionale. Disponibilité sur commande." },
    },
  },
  truckForm: {
    cta: "Demander un devis",
    title: "Demandez votre camion",
    intro:
      "Les modèles varient selon la disponibilité. Dites-nous quel camion vous cherchez et nous préparons un devis.",
    name: "Nom",
    phone: "Téléphone / WhatsApp",
    brand: "Marque",
    brandOther: "Autre",
    model: "Modèle (ex. Cascadia, T680)",
    year: "Année",
    condition: "État",
    conditionUsed: "Usagé",
    conditionLikeNew: "Comme neuf",
    conditionNew: "Neuf",
    cab: "Cabine",
    cabWith: "Avec couchette",
    cabWithout: "Sans couchette",
    color: "Couleur",
    mileage: "Kilométrage maximum",
    transmission: "Transmission",
    transAuto: "Automatique",
    transManual: "Manuelle",
    budget: "Budget (RD$)",
    notes: "Notes supplémentaires",
    any: "Indifférent",
    select: "Sélectionner",
    optional: "optionnel",
    open: "Précisez votre camion",
    submit: "Demander un devis",
    cancel: "Annuler",
    nameRequired: "Entrez votre nom pour continuer.",
  },
  nosotros: {
    missionTag: "Notre histoire",
    missionHeading: "Pourquoi nous avons commencé",
    missionIntro:
      "Daniel Truck and Tires est né pour rapprocher les camionneurs de la République dominicaine des pneus, jantes et camions dont ils ont besoin. Nous sommes une petite équipe proche, qui connaît le métier du transport et traite chaque commande comme la sienne.",
    teamPhotoLabel: "Photo de l'équipe",
    values: [
      {
        title: "Le début",
        description:
          "Nous avons commencé avec une idée simple : offrir aux camionneurs dominicains les mêmes pneus et camions qu'au Canada, à un prix juste et sans intermédiaires.",
      },
      {
        title: "Notre façon",
        description:
          "Nous travaillons de près, par WhatsApp, en répondant vite et honnêtement. Nous ne vendons pas pour vendre : nous vous aidons à choisir ce dont vous avez vraiment besoin.",
      },
      {
        title: "Où nous allons",
        description:
          "Nous continuons de grandir avec nos clients, en ajoutant des tailles, des modèles et de meilleurs délais, sans perdre la proximité qui nous distingue.",
      },
    ],
    teamTag: "Notre équipe",
    teamHeading: "Proches. Honnêtes. Fiables.",
    teamIntro:
      "Une équipe qui connaît le transport de marchandises et répond vite. Dites-nous ce dont vous avez besoin et nous vous accompagnons du début à la fin.",
    memberName: "Prénom Nom",
    roles: ["Fondateur", "Opérations", "Ventes", "Logistique"],
    ctaTag: "Commençons",
    ctaHeading: "Parlons de votre prochaine commande",
    ctaBody:
      "Écrivez-nous sur WhatsApp et nous confirmons la disponibilité et le meilleur prix du marché.",
    ctaButton: "Contactez-nous sur WhatsApp",
  },
};

export type Dict = typeof es;

export const dictionaries: Record<Lang, Dict> = { es, en, fr };

export const LANGS: Lang[] = ["es", "en", "fr"];

/** Flag emoji / short label metadata for the language switcher. */
export const LANG_META: Record<Lang, { label: string; short: string }> = {
  es: { label: "Español", short: "ES" },
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
};
