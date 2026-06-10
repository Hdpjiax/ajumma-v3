
export const NAV = [
  { label:"Inicio",      href:"#hero" },
  { label:"Menú",        href:"#menu" },
  { label:"Experiencia", href:"#experiencia" },
  { label:"Ambiente",    href:"#galeria" },
  { label:"Ubicación",   href:"#ubicacion" },
  { label:"Contacto",    href:"#reserva" },
]

export const BENEFITS = [
  { icon:"🍜", title:"Sabores Auténticos",  copy:"Recetas tradicionales coreanas con ingredientes premium importados." },
  { icon:"✨", title:"Ambiente Único",       copy:"Espacios modernos y acogedores para todos los momentos." },
  { icon:"👑", title:"Atención Premium",     copy:"Servicio cálido y personalizado que te hace sentir en casa." },
  { icon:"👫", title:"Para Todos",           copy:"Ideal para citas, amigos, familia y eventos especiales." },
]

export const MENU = [
  { name:"Buffet Ajumma",     price:"$349", cat:"Buffet",   img:"/imgs/promo-buffet.webp",  desc:"Come todo lo que quieras: nigiris, sushi, comida coreana y ramen." },
  { name:"Tacos Coreanos",    price:"$189", cat:"Entradas", img:"/imgs/food-tacos.webp",    desc:"Tostadas con proteína marinada, zanahorias y ajonjolí negro." },
  { name:"Mandu Dumplings",   price:"$179", cat:"Entradas", img:"/imgs/food-dumplings.webp",desc:"Dumplings al vapor con salsa de soya y semillas de ajonjolí." },
  { name:"Pollo Teriyaki",    price:"$229", cat:"Fuertes",  img:"/imgs/food-chicken.webp",  desc:"Pollo bañado en salsa teriyaki sobre base cremosa con verduras." },
  { name:"Sushi Roll Frito",  price:"$199", cat:"Sushi",    img:"/imgs/food-sushi-roll.webp",desc:"Roll crujiente con camarón cubierto de salsa especial de la casa." },
  { name:"Nigiri Premium",    price:"$199", cat:"Sushi",    img:"/imgs/food-nigiri.webp",   desc:"Nigiri de salmón con caviar tobiko y presentación editorial." },
  { name:"Ramen Coreano",     price:"$189", cat:"Fuertes",  img:"/imgs/food-ramen.webp",    desc:"Bowl profundo con caldo oscuro, huevo perfecto y vegetales." },
  { name:"Sopa Doenjang",     price:"$175", cat:"Fuertes",  img:"/imgs/food-soup.webp",     desc:"Sopa tradicional servida en tazón de piedra volcánica humeante." },
  { name:"Cóctel Ajumma",     price:"$199", cat:"Bebidas",  img:"/imgs/food-cocktail.webp", desc:"Firma de la casa: notas afrutadas con toque coreano." },
  { name:"Shots de Mar",      price:"$149", cat:"Bebidas",  img:"/imgs/food-shots.webp",    desc:"Chupitos con mariscos, chile y lima. Explosión de sabor único." },
]

export const TASTING = [
  { step:"01", name:"Banchan",     dish:"5 acompañamientos coreanos de bienvenida" },
  { step:"02", name:"Entradas",    dish:"Tacos coreanos y mandu dumplings" },
  { step:"03", name:"Sopa",        dish:"Sopa coreana en tazón de piedra volcánica" },
  { step:"04", name:"BBQ en Mesa", dish:"Pollo teriyaki + res bulgogi marinado" },
  { step:"05", name:"Sushi",       dish:"Roll frito + 2 nigiris premium" },
  { step:"06", name:"Ramen",       dish:"Bowl especial Ajumma con caldo oscuro" },
  { step:"07", name:"Postre",      dish:"Mochi + bingsu de matcha de temporada" },
]

export const GALLERY = [
  "/imgs/food-sushi-roll.webp",
  "/imgs/gallery-1.webp",
  "/imgs/food-tacos.webp",
  "/imgs/gallery-2.webp",
  "/imgs/food-cocktail.webp",
  "/imgs/gallery-3.webp",
  "/imgs/food-ramen.webp",
  "/imgs/gallery-4.webp",
  "/imgs/food-nigiri.webp",
  "/imgs/gallery-5.webp",
  "/imgs/food-soup.webp",
  "/imgs/gallery-6.webp",
]

export const REVIEWS = [
  { name:"Mariana G.", stars:5, text:"La comida está increíble, el sushi fresco con mucho sabor. Ambiente súper lindo y atención excelente." },
  { name:"Carlos R.",  stars:5, text:"El mejor lugar para compartir. El buffet es 10/10, totalmente lo recomiendo." },
  { name:"Fernanda L.",stars:5, text:"Los cócteles son de 10 y el ramen coreano es mi favorito. ¡Recomendado!" },
  { name:"Diego P.",   stars:4, text:"Los dumplings son una locura, salsa perfecta. Te transporta directo a Seúl." },
  { name:"Sofía M.",   stars:5, text:"Fui por mi cumpleaños y fue perfecto. El menú degustación vale cada peso." },
]

export const CHATBOT = {
  start: {
    msg:"¡Hola! 👋 Bienvenido a AJUMMA Korean BBQ & Sushi. ¿En qué puedo ayudarte?",
    opts:[
      { label:"Reservar mesa 🍽️", next:"reservar" },
      { label:"Ver menú 📋",       next:"menu" },
      { label:"Horarios ⏰",       next:"horarios" },
      { label:"Ubicación 📍",      next:"ubicacion" },
      { label:"Eventos 🎉",        next:"eventos" },
    ],
  },
  reservar: {
    msg:"Puedes reservar llamándonos o por WhatsApp. También llena el formulario en la sección Reserva.",
    opts:[
      { label:"📞 443 386 2070",    next:"tel:4433862070" },
      { label:"💬 WhatsApp",        next:"https://wa.me/524433862070?text=Hola%20Ajumma%20quiero%20reservar" },
      { label:"⬅ Volver",          next:"start" },
    ],
  },
  menu: {
    msg:"Tenemos Korean BBQ, Sushi, Ramen, Cócteles y nuestro Buffet los viernes.",
    opts:[
      { label:"🔥 Buffet Ajumma",  next:"start" },
      { label:"🍣 Sushi",          next:"start" },
      { label:"🍜 Ramen",          next:"start" },
      { label:"⬅ Volver",         next:"start" },
    ],
  },
  horarios: {
    msg:"Abrimos todos los días de 1:00 PM a 11:00 PM en ambas sucursales.",
    opts:[{ label:"⬅ Volver", next:"start" }],
  },
  ubicacion: {
    msg:"Altozano: Blvrd Juan Pablo II 1735. Las Camelinas: Plaza Xentric.",
    opts:[
      { label:"🗺 Ver Maps", next:"https://maps.app.goo.gl/FHCSja6k65tKHZLUA" },
      { label:"⬅ Volver",   next:"start" },
    ],
  },
  eventos: {
    msg:"Organizamos eventos privados, cumpleaños y cenas. Escríbenos para cotización.",
    opts:[
      { label:"💬 WhatsApp eventos", next:"https://wa.me/524433862070?text=Hola%20quiero%20info%20sobre%20eventos" },
      { label:"⬅ Volver",           next:"start" },
    ],
  },
}

// ── PUSH CONFIG ──────────────────────────────────────────
// Get free VAPID keys at https://vapidkeys.com
export const PUSH_CONFIG = {
  VAPID_PUBLIC_KEY: "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjZMtCOB9M1wIJFt7OFiY2PK3D4HI",
}

// ── CALENDLY ─────────────────────────────────────────────
// Replace with your real Calendly event link
export const CALENDLY_URL = "https://calendly.com/ajumma-morelia/reservacion"
