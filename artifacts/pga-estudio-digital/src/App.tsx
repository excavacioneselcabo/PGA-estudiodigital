import { type FormEvent, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Camera, Menu, X } from 'lucide-react';
import './index.css';

const serviceDetails = {
  featured: {
    title: 'Web que te representa',
    copy: 'Para que se entienda qué haces, qué ofreces y cómo ponerse en contacto contigo desde el primer vistazo.',
  },
  redesign: {
    title: 'Rediseño con sentido',
    copy: 'Ordenamos una web que ya existe, mejoramos la navegación y hacemos que funcione bien en móvil.',
  },
  presence: {
    title: 'Presencia digital',
    copy: 'Para que tus servicios se encuentren y tu negocio se vea profesional en los lugares donde lo buscan.',
  },
  maintenance: {
    title: 'Mantenimiento y mejoras',
    copy: 'Añadimos, ajustamos y mantenemos tu web al día mientras tu negocio evoluciona.',
  },
};

const steps = [
  { title: 'Hablamos', copy: 'Me cuentas qué haces y qué necesitas.' },
  { title: 'Diseñamos', copy: 'Damos forma a una dirección clara.' },
  { title: 'Construimos', copy: 'Convertimos la idea en una web que funciona.' },
  { title: 'Publicamos', copy: 'La ponemos en marcha contigo.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ nombre: '', negocio: '', email: '', telefono: '', necesidades: '' });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.nombre.trim()) nextErrors.nombre = 'Escribe tu nombre.';
    if (!form.email.trim()) nextErrors.email = 'Escribe tu email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Revisa el formato del email.';
    if (!form.necesidades.trim()) nextErrors.necesidades = 'Cuéntame brevemente qué necesitas.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setForm({ nombre: '', negocio: '', email: '', telefono: '', necesidades: '' });
  };

  return (
    <div className="site-shell">
      <header className="header">
        <nav className="container nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" data-testid="link-brand"><span className="brand-mark" aria-hidden="true">P</span><span>PGA Estudio Digital</span></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link" href="#inicio" onClick={() => setMenuOpen(false)} data-testid="link-inicio">Inicio</a>
            <a className="nav-link" href="#servicios" onClick={() => setMenuOpen(false)} data-testid="link-servicios">Servicios</a>
            <a className="nav-link" href="#proyectos" onClick={() => setMenuOpen(false)} data-testid="link-proyectos">Proyectos</a>
            <a className="nav-link" href="#sobre-mi" onClick={() => setMenuOpen(false)} data-testid="link-sobre-mi">Sobre mí</a>
            <a className="nav-link" href="#contacto" onClick={() => setMenuOpen(false)} data-testid="link-contacto">Contacto</a>
            <a className="button" href="#contacto" onClick={() => setMenuOpen(false)} data-testid="link-mobile-cta">Cuéntame tu proyecto <ArrowRight size={15} /></a>
          </div>
          <a className="button" href="#contacto" data-testid="link-desktop-cta">Cuéntame tu proyecto <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} data-testid="button-menu">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">PGA Estudio Digital</span>
              <h1 id="hero-title" className="heading">Webs claras para negocios <em>reales.</em></h1>
              <p className="hero-lede">Creo y mejoro páginas web para autónomos, pequeños negocios y PYMES. Para que tu trabajo se entienda, tu negocio se vea profesional y las personas encuentren cómo contactarte.</p>
              <div className="hero-actions">
                <a className="button" href="#contacto" data-testid="link-hero-primary">Cuéntame tu proyecto <ArrowRight size={16} /></a>
                <a className="button-text" href="#proyectos" data-testid="link-hero-secondary">Ver proyectos <ArrowRight size={16} /></a>
              </div>
            </div>
            <div className="hero-visual reveal delay-1" aria-label="Composición visual sobre claridad digital">
              <div className="visual-card">
                <div className="visual-window">
                  <div className="window-top"><span className="window-dot" /><span className="window-dot" /><span className="window-dot" /><span className="window-address">tu-negocio.es</span></div>
                  <div className="window-body">
                    <div className="window-message"><span className="window-brand">PGA / DIGITAL</span><h2>Que se entienda lo que haces.</h2><p>Una página pensada para las personas que necesitan encontrarte.</p><div className="window-shape" /></div>
                    <div className="window-art" aria-hidden="true" />
                  </div>
                </div>
                <div className="visual-note">Una presencia digital con sentido<span>clara · cercana · tuya</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="statement" aria-labelledby="statement-title">
          <div className="container statement-grid reveal">
            <p className="statement-note">Una idea importante</p>
            <h2 id="statement-title" className="heading">No necesitas parecer una gran empresa. Necesitas verte como el negocio que ya eres.</h2>
          </div>
        </section>

        <section className="services section" id="servicios" aria-labelledby="services-title">
          <div className="container">
            <div className="services-head reveal">
              <div><span className="eyebrow">Lo que puedo hacer por ti</span><h2 id="services-title" className="heading">Una web que trabaja<br /><em>en tu dirección.</em></h2></div>
              <p>Lo importante no es tener más páginas. Es que cada parte ayude a tu negocio a ser más fácil de entender y de elegir.</p>
            </div>
            <div className="services-layout">
              <article className="service-feature reveal" data-testid="service-web-representa">
                <span className="service-tag">Para empezar con claridad</span>
                <div><h3>{serviceDetails.featured.title}</h3><p>{serviceDetails.featured.copy}</p><div className="service-action"><span>Diseño y creación web</span><ArrowUpRight size={18} /></div></div>
              </article>
              <div className="service-stack">
                <article className="service-compact reveal delay-1" data-testid="service-rediseño"><div><span className="service-tag">Para ordenar lo que ya tienes</span><h3>{serviceDetails.redesign.title}</h3><p>{serviceDetails.redesign.copy}</p></div><ArrowUpRight size={17} color="var(--plum-soft)" /></article>
                <article className="service-compact reveal delay-2" data-testid="service-presencia"><div><span className="service-tag">Para que te encuentren</span><h3>{serviceDetails.presence.title}</h3><p>{serviceDetails.presence.copy}</p></div><ArrowUpRight size={17} color="var(--plum-soft)" /></article>
              </div>
            </div>
            <article className="service-wide reveal" data-testid="service-mantenimiento"><div><span className="service-tag">Para seguir avanzando</span><h3>{serviceDetails.maintenance.title}</h3></div><p>{serviceDetails.maintenance.copy}</p></article>
          </div>
        </section>

        <section className="emotional section" aria-labelledby="emotional-title">
          <div className="container emotional-grid">
            <div className="emotional-visual reveal" aria-hidden="true"><div className="doorway" /></div>
            <div className="emotional-copy reveal delay-1"><span className="eyebrow">La web como puerta de entrada</span><h2 id="emotional-title" className="heading">Tu negocio ya tiene una historia. Hagamos que tu web esté <em>a la altura.</em></h2><p>Hay mucho detrás de cada negocio: una forma de hacer las cosas, unas personas y una manera de cuidar lo que se ofrece. La web puede ser el primer lugar donde todo eso se percibe.</p></div>
          </div>
        </section>

        <section className="projects section" id="proyectos" aria-labelledby="projects-title">
          <div className="container">
            <div className="projects-head reveal"><div><span className="eyebrow">Un proyecto real</span><h2 id="projects-title" className="heading">Proyectos con los pies<br /><em>en la tierra.</em></h2></div><p>Una muestra de transformación digital para un negocio tradicional. Puedes conocer el proyecto directamente en su web.</p></div>
            <article className="project-case reveal delay-1" data-testid="project-excavaciones-el-cabo">
              <div className="browser"><div className="browser-bar"><span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" /><span className="browser-url">excavacioneselcabo.es</span></div></div>
              <img className="project-image" src="/excavaciones-el-cabo-real.png" alt="Captura real de la web de Excavaciones El Cabo" />
              <div className="case-caption"><div><h3>Excavaciones El Cabo</h3><p>Proyecto de página web para un negocio tradicional. La información y el contenido del proyecto se pueden consultar en su web.</p></div><a className="button" href="https://excavacioneselcabo.es" target="_blank" rel="noreferrer" data-testid="link-ver-proyecto">Ver proyecto <ArrowUpRight size={16} /></a></div>
            </article>
          </div>
        </section>

        <section className="method section" aria-labelledby="method-title">
          <div className="container">
            <div className="method-head reveal"><div><span className="eyebrow">Una forma sencilla de trabajar</span><h2 id="method-title" className="heading">Sin líos.<br /><em>Con método.</em></h2></div><p>Vamos paso a paso, con conversaciones claras y decisiones que puedas entender.</p></div>
            <div className="steps">
              {steps.map((step, index) => <article className={`step reveal delay-${Math.min(index, 2)}`} key={step.title} data-testid={`step-${step.title.toLowerCase()}`}><div className="step-dot" /><h3>{step.title}</h3><p>{step.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about section" id="sobre-mi" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="photo-placeholder reveal" data-testid="placeholder-paula-photo"><div className="placeholder-inner"><div className="placeholder-mark"><Camera size={21} strokeWidth={1.5} /></div><span>Foto real de Paula pendiente</span></div></div>
            <div className="about-copy reveal delay-1"><span className="eyebrow">Sobre mí</span><h2 id="about-title" className="heading">Soy Paula.</h2><p>Piensa en tu web como un espacio al que invitas a alguien. Antes de elegir colores o imágenes, conviene entender quién entra, qué necesita encontrar y qué queremos que sienta al estar ahí.</p><p>Por eso el primer paso es conocer tu negocio: poner orden, encontrar lo importante y construir desde ahí una presencia digital que tenga sentido para ti.</p><div className="about-callout">La forma, las palabras y los detalles llegan después de entender bien a quién estamos invitando a pasar.</div></div>
          </div>
        </section>

        <section className="contact section" id="contacto" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-intro reveal"><span className="eyebrow">El siguiente paso</span><h2 id="contact-title" className="heading">¿Hablamos de tu proyecto?</h2><p>Cuéntame brevemente qué tienes entre manos, aunque todavía esté un poco desordenado. Lo ponemos en común y vemos qué necesita tu web.</p></div>
            <div className="reveal delay-1">
              {submitted ? <div className="form-success" role="status" data-testid="status-form-prepared"><h3>Formulario preparado.</h3><p>La integración de envío queda pendiente. Tus datos no se han enviado.</p><button className="button" type="button" onClick={resetForm} data-testid="button-edit-form">Revisar formulario <ArrowRight size={15} /></button></div> : <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="field"><label htmlFor="nombre">Nombre *</label><input id="nombre" value={form.nombre} onChange={(event) => updateField('nombre', event.target.value)} placeholder="Tu nombre" aria-invalid={Boolean(errors.nombre)} data-testid="input-nombre" />{errors.nombre && <span className="field-error">{errors.nombre}</span>}</div>
                  <div className="field"><label htmlFor="negocio">Negocio</label><input id="negocio" value={form.negocio} onChange={(event) => updateField('negocio', event.target.value)} placeholder="Nombre del negocio" data-testid="input-negocio" /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="email">Email *</label><input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} data-testid="input-email" />{errors.email && <span className="field-error">{errors.email}</span>}</div>
                  <div className="field"><label htmlFor="telefono">Teléfono <span aria-hidden="true">(opcional)</span></label><input id="telefono" type="tel" value={form.telefono} onChange={(event) => updateField('telefono', event.target.value)} placeholder="Opcional" data-testid="input-telefono" /></div>
                </div>
                <div className="field"><label htmlFor="necesidades">Cuéntame brevemente qué necesitas *</label><textarea id="necesidades" value={form.necesidades} onChange={(event) => updateField('necesidades', event.target.value)} placeholder="Qué haces y qué te gustaría mejorar..." aria-invalid={Boolean(errors.necesidades)} data-testid="input-necesidades" />{errors.necesidades && <span className="field-error">{errors.necesidades}</span>}</div>
                <button className="button" type="submit" data-testid="button-submit-form">Enviar proyecto <ArrowRight size={16} /></button>
                <p className="form-footnote">Validación local. La integración de envío queda pendiente.</p>
              </form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top"><a className="brand" href="#inicio" data-testid="link-footer-brand"><span className="brand-mark">P</span><span>PGA Estudio Digital</span></a><nav className="footer-nav" aria-label="Navegación del pie"><a href="#servicios" data-testid="link-footer-servicios">Servicios</a><a href="#proyectos" data-testid="link-footer-proyectos">Proyectos</a><a href="#sobre-mi" data-testid="link-footer-sobre-mi">Sobre mí</a><a href="#contacto" data-testid="link-footer-contacto">Contacto</a></nav></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} PGA Estudio Digital</span><span>Una web clara para un negocio real.</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;