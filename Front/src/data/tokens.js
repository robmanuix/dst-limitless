// Design tokens — extraídos directamente del archivo Figma y199aurtOkJT44LQU6ed3o (LimitLess by Serenza APP)

// Colores — página "Colores" del Figma. Cada grupo corresponde a una sección de la página.
export const colors = [
  // Estado de ejes
  { name: 'color/positive', hex: '#ADD1A2', group: 'Semánticos (Estado de ejes)', desc: 'Score alto, éxito' },
  { name: 'color/warning',  hex: '#FEAD77', group: 'Semánticos (Estado de ejes)', desc: 'Score medio, CTA estándar' },
  { name: 'color/critical', hex: '#C75E62', group: 'Semánticos (Estado de ejes)', desc: 'Score bajo, atención' },
  // Marca / Ecosistema
  { name: 'color/premium',      hex: '#E0A94F', group: 'Marca / Ecosistema', desc: 'Oro Premium: bordes, badges' },
  { name: 'color/free-base',    hex: '#653024', group: 'Marca / Ecosistema', desc: 'Café base experiencia Free' },
  { name: 'color/premium-base', hex: '#121212', group: 'Marca / Ecosistema', desc: 'Negro base experiencia Premium' },
  { name: 'color/footer-bg',    hex: '#31110A', group: 'Marca / Ecosistema', desc: 'Fondo barra navegación inferior' },
  // Texto y neutros
  { name: 'text/primary',       hex: '#FFFFFF', group: 'Texto y Neutros', desc: 'Texto principal' },
  { name: 'text/on-cta',        hex: '#653024', group: 'Texto y Neutros', desc: 'Texto sobre botón durazno' },
  { name: 'text/secondary',     hex: '#E0C4B2', group: 'Texto y Neutros', desc: 'Texto secundario' },
  { name: 'text/muted',         hex: '#C9A891', group: 'Texto y Neutros', desc: 'Metadatos' },
  { name: 'text/premium-muted', hex: '#C9B8A0', group: 'Texto y Neutros', desc: 'Secundario en Premium' },
];

export const colorGroups = ['Semánticos (Estado de ejes)', 'Marca / Ecosistema', 'Texto y Neutros'];

// Variables de Figma que usan los componentes (alias → valor)
export const figmaVariables = [
  { name: 'acento/principal', hex: '#FEAD77', use: 'CTA Free, estado seleccionado/activo de inputs y chips' },
  { name: 'acento/premium',   hex: '#E0A94F', use: 'CTA Premium' },
  { name: 'positivo/500',     hex: '#ADD1A2', use: 'CTA Success' },
  { name: 'cafe/500',         hex: '#653024', use: 'Texto sobre acento, fondo base de la experiencia Free' },
  { name: 'fondo/base',       hex: '#653024', use: 'Fondo de pantallas y demos de componentes' },
  { name: 'texto/primario',   hex: '#FFFFFF', use: 'Texto principal sobre fondos oscuros' },
];

export const spacing = [
  { name: 'space/2', value: 4,  desc: 'Gap mínimo (número + label)' },
  { name: 'space/3', value: 8,  desc: 'Gap entre elementos relacionados' },
  { name: 'space/4', value: 12, desc: 'Padding de tarjetas, gap medio' },
  { name: 'space/5', value: 16, desc: 'Padding lateral estándar de pantalla' },
  { name: 'space/6', value: 24, desc: 'Separación entre secciones' },
  { name: 'space/8', value: 32, desc: 'Margen inferior del CTA' },
];

export const borderRadius = [
  { name: 'radius/sm',   value: 8,   label: 'Chips, botón banner' },
  { name: 'radius/md',   value: 12,  label: 'Tarjetas pequeñas, tooltip' },
  { name: 'radius/lg',   value: 16,  label: 'Tarjetas de actividad' },
  { name: 'radius/xl',   value: 20,  label: 'Tarjetas grandes' },
  { name: 'radius/pill', value: 999, label: 'CTA, círculos, badges' },
];

export const textStyles = [
  { name: 'type/index-hero',  fontSize: 52, family: 'Montserrat', weight: 'Bold',    category: 'Títulos',  sample: '58' },
  { name: 'type/title-xl',    fontSize: 20, family: 'Montserrat', weight: 'Bold',    category: 'Títulos',  sample: 'Este es tu punto de partida' },
  { name: 'type/title',       fontSize: 18, family: 'Montserrat', weight: 'Bold',    category: 'Títulos',  sample: 'Descubre más sobre ti' },
  { name: 'type/body',        fontSize: 16, family: 'Montserrat', weight: 'Regular', category: 'Cuerpo',   sample: 'Hola Ana,' },
  { name: 'type/label',       fontSize: 12, family: 'Montserrat', weight: 'Medium',  category: 'Cuerpo',   sample: 'Salud Física' },
  { name: 'type/caption',     fontSize: 12, family: 'Montserrat', weight: 'Regular', category: 'Cuerpo',   sample: 'Toca un eje para explorar tus actividades.' },
  { name: 'type/eje-score',   fontSize: 16, family: 'Montserrat', weight: 'Bold',    category: 'Interfaz', sample: '92' },
  { name: 'type/nav',         fontSize: 11, family: 'Montserrat', weight: 'Medium',  category: 'Interfaz', sample: 'Inicio' },
  { name: 'type/chip-number', fontSize: 15, family: 'Montserrat', weight: 'Bold',    category: 'Interfaz', sample: '240' },
];

export const effectStyles = [
  {
    name: 'shadow/eje-free',
    css: '0px 10px 9px rgba(0,0,0,0.18)',
    label: 'Eje Free',
    desc: 'Círculos de eje en Free',
  },
  {
    name: 'shadow/footer',
    css: '0px -2.2px 2.1px rgba(110,45,33,0.1)',
    label: 'Footer',
    desc: 'Barra de navegación',
  },
  {
    name: 'glow/premium',
    css: '0 0 64px rgba(224,169,79,0.55)',
    label: 'Glow Premium',
    desc: 'DEPRECADO — ya no se usa en Premium (decisión cliente, 7 sept)',
    deprecated: true,
  },
];
