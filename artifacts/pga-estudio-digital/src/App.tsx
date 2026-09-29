import { type FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Compass,
  LayoutTemplate,
  RefreshCw,
} from 'lucide-react';
import './index.css';

const serviceDetails = [
  {
    number: '01',
    title: 'Web que te representa',
    copy: 'Que quien entre entienda rápidamente quién eres, qué haces y cómo contactar contigo.',
    icon: LayoutTemplate,
    className: 'service-primary',
  },
  {
    number: '02',
    title: 'Rediseño con sentido',
    copy: 'Reordenamos lo que ya tienes para que vuelva a estar a la altura de tu negocio.',
    icon: RefreshCw,
    className: 'service-secondary',
  },
  {
    number: '03',
    title: 'Presencia digital',
    copy: 'Una imagen online coherente que transmita confianza antes de que te llamen.',
    icon: Compass,
    className: 'service-tertiary',
  },
  {
    number: '04',
    title: 'Mantenimiento y mejoras',
    copy: 'Tu web puede evolucionar conforme evoluciona tu negocio.',
    icon: ArrowUpRight,
    className: 'service-wide',
  },
];

const steps = [
  { number: '01', title: 'Hablamos', copy: 'Me cuentas qué haces.' },
  { number: '02', title: 'Diseñamos', copy: 'Damos forma a la dirección.' },
  { number: '03', title: 'Construimos', copy: 'Lo convertimos en una web.' },
  { number: '04', title: 'Publicamos', copy: 'La ponemos en marcha contigo.' },
];

function PhotoPlaceholder({ label, detail, className = '' }: { label: string; detail: string; className?: string }) {
  return (
    <div className={`photo-placeholder ${className}`} role="img" aria-label={`${label}. ${detail}`}>
      <div className="photo-placeholder-inner">
        <span className="photo-placeholder-icon"><Camera size={19} strokeWidth={1.5} /></span>
        <strong>{label}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

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
    }, { threshold: 0.14 });
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="header">
        <nav className="container nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" onClick={closeMenu} data-testid="link-brand">
            <span className="brand-wordmark" aria-label="PGA">PGA</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link active" href="#inicio" onClick={closeMenu} data-testid="link-inicio">Inicio</a>
            <a className="nav-link" href="#servicios" onClick={closeMenu} data-testid="link-servicios">Servicios</a>
            <a className="nav-link" href="#proyectos" onClick={closeMenu} data-testid="link-proyectos">Proyectos</a>
            <a className="nav-link" href="#sobre-mi" onClick={closeMenu} data-testid="link-sobre-mi">Sobre mí</a>
            <a className="nav-link" href="#contacto" onClick={closeMenu} data-testid="link-contacto">Contacto</a>
            <a className="button button-gradient mobile-cta" href="#contacto" onClick={closeMenu} data-testid="link-mobile-cta">Hablemos de tu negocio <ArrowRight size={15} /></a>
          </div>
          <a className="button button-gradient desktop-cta" href="#contacto" data-testid="link-desktop-cta">Hablemos de tu negocio <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} data-testid="button-menu">
            <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy reveal reveal-left">
              <span className="kicker"><span className="kicker-dot" /> PGA Estudio Digital · Alicante</span>
              <h1 id="hero-title">Tu negocio<br />merece <span>verse bien.</span></h1>
              <p className="hero-lede">Diseñamos páginas web claras para que tus clientes entiendan lo que haces y sepan cómo contactar contigo.</p>
              <div className="hero-actions">
                <a className="button button-gradient" href="#contacto" data-testid="link-hero-primary">Hablemos de tu negocio <ArrowRight size={16} /></a>
                <a className="button button-outline" href="#proyectos" data-testid="link-hero-secondary">Ver proyectos <ArrowRight size={16} /></a>
              </div>
              <div className="hero-note"><span className="hero-note-line" /> Webs pensadas para personas, no para impresionar a otros diseñadores.</div>
            </div>
            <div className="hero-visual reveal reveal-scale delay-1">
              <div className="hero-monogram" aria-hidden="true">PGA</div>
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-card hero-card-top"><span className="card-caption">PGA / ESTUDIO DIGITAL</span><strong>Que tu web<br /><em>hable bien</em><br />de lo que haces.</strong></div>
              <div className="hero-card hero-card-bottom"><span className="mini-dot" /> Claridad que se nota</div>
              <span className="hero-visual-label">Diseño web · Dirección digital</span>
            </div>
          </div>
        </section>

        <section className="positioning section-small" aria-labelledby="positioning-title">
          <div className="container positioning-layout reveal reveal-right">
            <span className="section-label">Una idea importante</span>
            <div className="positioning-copy">
              <h2 id="positioning-title">No necesitas parecer una gran empresa. <span>Necesitas verte como el negocio que ya eres.</span></h2>
              <div className="positioning-mark" aria-hidden="true"><span /><span /><span /></div>
            </div>
          </div>
        </section>

        <section className="services section" id="servicios" aria-labelledby="services-title">
          <div className="container">
            <div className="section-intro reveal reveal-left">
              <div><span className="section-label">Lo que puedo hacer por ti</span><h2 id="services-title">Una web que trabaja<br /><span>en tu dirección.</span></h2></div>
              <p>Lo importante no es tener más páginas. Es que tu negocio se entienda, genere confianza y facilite el contacto.</p>
            </div>
            <div className="service-mosaic">
              {serviceDetails.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-block ${service.className} reveal ${index > 0 ? `delay-${Math.min(index, 2)}` : ''}`} key={service.title} data-testid={`service-${service.number}`}>
                    <div className="service-block-top"><span className="service-number">{service.number}</span><Icon size={20} strokeWidth={1.5} /></div>
                    <div><h3>{service.title}</h3><p>{service.copy}</p></div>
                    {index === 0 && <span className="service-link">Diseño y creación web <ArrowUpRight size={17} /></span>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="story section" aria-labelledby="story-title">
          <div className="container story-layout">
            <PhotoPlaceholder className="story-photo reveal" label="Fotografía natural pendiente" detail="Una escena cotidiana de un negocio real." />
            <div className="story-copy reveal delay-1">
              <span className="section-label">La web como puerta de entrada</span>
              <h2 id="story-title">Tu negocio ya tiene una historia. <span>Hagamos que tu web esté a la altura.</span></h2>
              <p>Hay mucho detrás de cada negocio: una forma de hacer las cosas, unas personas y una manera de cuidar lo que se ofrece.</p>
            </div>
          </div>
        </section>

        <section className="projects section" id="proyectos" aria-labelledby="projects-title">
          <div className="container">
            <div className="section-intro project-intro reveal reveal-left">
              <div><span className="section-label">Un proyecto real</span><h2 id="projects-title">Proyectos con los pies <span>en la tierra.</span></h2></div>
              <p>Una muestra de trabajo para un negocio real. Sin inventar resultados: solo una web clara, ordenada y preparada para que sus clientes encuentren lo importante.</p>
            </div>
            <article className="project-showcase reveal reveal-scale delay-1" data-testid="project-excavaciones-el-cabo">
              <div className="project-copy">
                <span className="project-eyebrow">01 / Web real</span>
                <h3>Excavaciones<br /><span>El Cabo</span></h3>
                <p>El trabajo se orientó a presentar claramente el negocio, ordenar sus servicios, mostrar trabajos realizados y facilitar el contacto también desde móvil.</p>
                <a className="button button-outline" href="https://excavacioneselcabo.es" target="_blank" rel="noopener noreferrer" data-testid="link-ver-proyecto">Ver proyecto <ArrowUpRight size={16} /></a>
              </div>
              <div className="project-device">
                <div className="device-top"><span /><span /><span /><small>excavacioneselcabo.es</small></div>
                <img src="/excavaciones-el-cabo-real.png" alt="Captura real de la web de Excavaciones El Cabo" />
              </div>
            </article>
          </div>
        </section>

        <section className="process section" aria-labelledby="process-title">
          <div className="container">
            <div className="section-intro process-intro reveal">
              <div><span className="section-label">Una forma sencilla de trabajar</span><h2 id="process-title">Sin líos. <span>Con método.</span></h2></div>
              <p>Sabrás qué va a ocurrir desde el primer momento.</p>
            </div>
            <div className="process-track">
              <div className="process-line" aria-hidden="true" />
              {steps.map((step, index) => (
                <article className={`process-step reveal delay-${Math.min(index, 2)}`} key={step.number} data-testid={`step-${step.title.toLowerCase()}`}>
                  <span className="process-dot">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section" id="sobre-mi" aria-labelledby="about-title">
          <div className="container about-layout">
            <div className="about-photo-wrap reveal">
              <PhotoPlaceholder className="about-photo" label="Foto real de Paula pendiente" detail="Este espacio queda preparado para incorporar una fotografía auténtica." />
              <span className="about-location">PGA Estudio Digital · Alicante</span>
            </div>
            <div className="about-copy reveal delay-1">
              <span className="section-label">Sobre mí</span>
              <h2 id="about-title">Soy Paula<br /><span>González Alonso.</span></h2>
              <p>Crear una buena web se parece un poco a preparar un espacio para recibir a alguien. Antes de pensar cómo decorarlo, necesitas saber quién va a entrar, qué necesita encontrar y qué quieres que sienta.</p>
              <p>Por eso prefiero entender tu negocio antes de pensar en colores o imágenes. A partir de ahí construimos una web que tenga sentido para ti y para tus clientes.</p>
              <div className="about-note">La forma, las palabras y los detalles llegan después de entender bien a quién estamos invitando a pasar.</div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <div className="contact-copy reveal">
              <span className="section-label">El siguiente paso</span>
              <h2 id="contact-title">¿Hablamos de<br /><span>tu proyecto?</span></h2>
              <p>No hace falta que lo tengas todo claro. Cuéntame qué tienes en mente y empezamos por ahí.</p>
              <div className="contact-accent" aria-hidden="true"><span /><span /><span /></div>
            </div>
            <div className="reveal delay-1">
              {submitted ? (
                <div className="form-success" role="status" data-testid="status-form-prepared">
                  <span className="success-check">✓</span>
                  <h3>Formulario preparado.</h3>
                  <p>La integración de envío queda pendiente. Tus datos no se han enviado.</p>
                  <button className="button button-light" type="button" onClick={resetForm} data-testid="button-edit-form">Revisar formulario <ArrowRight size={15} /></button>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit} noValidate>
                  <div className="form-heading"><span>Cuéntame lo que tienes en mente</span><small>* Campos obligatorios</small></div>
                  <div className="form-row">
                    <div className="field"><label htmlFor="nombre">Nombre *</label><input id="nombre" value={form.nombre} onChange={(event) => updateField('nombre', event.target.value)} placeholder="Tu nombre" aria-invalid={Boolean(errors.nombre)} data-testid="input-nombre" />{errors.nombre && <span className="field-error">{errors.nombre}</span>}</div>
                    <div className="field"><label htmlFor="negocio">Negocio</label><input id="negocio" value={form.negocio} onChange={(event) => updateField('negocio', event.target.value)} placeholder="Nombre del negocio" data-testid="input-negocio" /></div>
                  </div>
                  <div className="form-row">
                    <div className="field"><label htmlFor="email">Email *</label><input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} data-testid="input-email" />{errors.email && <span className="field-error">{errors.email}</span>}</div>
                    <div className="field"><label htmlFor="telefono">Teléfono <span>(opcional)</span></label><input id="telefono" type="tel" value={form.telefono} onChange={(event) => updateField('telefono', event.target.value)} placeholder="Opcional" data-testid="input-telefono" /></div>
                  </div>
                  <div className="field"><label htmlFor="necesidades">Cuéntame qué necesitas *</label><textarea id="necesidades" value={form.necesidades} onChange={(event) => updateField('necesidades', event.target.value)} placeholder="Qué haces y qué te gustaría mejorar..." aria-invalid={Boolean(errors.necesidades)} data-testid="input-necesidades" />{errors.necesidades && <span className="field-error">{errors.necesidades}</span>}</div>
                  <button className="button button-gradient" type="submit" data-testid="button-submit-form">Enviar proyecto <ArrowRight size={16} /></button>
                  <p className="form-footnote">Validación local. La integración de envío queda pendiente.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="brand" href="#inicio" data-testid="link-footer-brand"><span className="brand-wordmark" aria-label="PGA">PGA</span></a>
            <nav className="footer-nav" aria-label="Navegación del pie"><a href="#servicios" data-testid="link-footer-servicios">Servicios</a><a href="#proyectos" data-testid="link-footer-proyectos">Proyectos</a><a href="#sobre-mi" data-testid="link-footer-sobre-mi">Sobre mí</a><a href="#contacto" data-testid="link-footer-contacto">Contacto</a></nav>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} PGA Estudio Digital · Alicante</span><span>Una web clara para un negocio real.</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;