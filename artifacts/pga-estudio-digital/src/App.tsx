import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Menu, X, PenTool, RefreshCw, Compass, Wrench } from 'lucide-react';
import './index.css';

const services = [
  { number: '01', icon: PenTool, title: 'Web que te representa', copy: 'Diseño y creación de webs claras, bonitas y pensadas para que la gente entienda lo que haces y dé el siguiente paso.' },
  { number: '02', icon: RefreshCw, title: 'Rediseño con sentido', copy: 'Si tu web se ha quedado atrás, le damos una vuelta a la estructura, al mensaje y a la experiencia sin perder lo que ya funciona.' },
  { number: '03', icon: Compass, title: 'Presencia digital', copy: 'Ordenamos tus puntos de contacto digitales para que tu negocio se vea coherente, profesional y cercano allá donde te encuentren.' },
  { number: '04', icon: Wrench, title: 'Mantenimiento y mejoras', copy: 'Pequeños cambios, nuevas páginas y acompañamiento para que tu web siga cuidando de tu negocio a medida que avanza.' },
];

const process = [
  { number: '01', title: 'Hablamos', copy: 'Me cuentas dónde estás, qué necesitas y qué te gustaría que pasara.' },
  { number: '02', title: 'Diseñamos', copy: 'Damos forma a una dirección visual y verbal que tenga que ver contigo.' },
  { number: '03', title: 'Construimos', copy: 'Convierto esa idea en una web ágil, clara y lista para trabajar.' },
  { number: '04', title: 'Publicamos', copy: 'La ponemos en marcha y te dejo todo preparado para seguir.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ nombre: '', negocio: '', email: '', telefono: '', necesidades: '' });

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.nombre.trim()) nextErrors.nombre = 'Escribe tu nombre.';
    if (!form.email.trim()) nextErrors.email = 'Necesito un email para responderte.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Revisa el formato del email.';
    if (!form.necesidades.trim()) nextErrors.necesidades = 'Cuéntame un poco qué necesitas.';
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <nav className="container nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" data-testid="link-brand">
            <span className="brand-mark" aria-hidden="true">P</span>
            <span>PGA Estudio Digital</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a className="nav-link" href="#inicio" onClick={() => setMenuOpen(false)} data-testid="link-inicio">Inicio</a>
            <a className="nav-link" href="#servicios" onClick={() => setMenuOpen(false)} data-testid="link-servicios">Servicios</a>
            <a className="nav-link" href="#proyectos" onClick={() => setMenuOpen(false)} data-testid="link-proyectos">Proyectos</a>
            <a className="nav-link" href="#sobre-mi" onClick={() => setMenuOpen(false)} data-testid="link-sobre-mi">Sobre mí</a>
            <a className="nav-link" href="#contacto" onClick={() => setMenuOpen(false)} data-testid="link-contacto">Contacto</a>
            <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)} data-testid="link-nav-cta">Cuéntame tu proyecto <ArrowRight size={15} /></a>
          </div>
          <a className="nav-cta" href="#contacto" data-testid="link-desktop-cta">Cuéntame tu proyecto <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} data-testid="button-menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">Estudio digital · Asturias y online</span>
              <h1 className="display hero-title">Tu trabajo merece una web <em>a la altura.</em></h1>
              <p className="hero-body">Transformo negocios reales en presencias digitales claras, profesionales y con algo importante detrás: una persona que se implica.</p>
              <div className="hero-actions">
                <a className="button-primary" href="#contacto" data-testid="link-hero-primary">Cuéntame tu proyecto <ArrowRight size={16} /></a>
                <a className="button-ghost" href="#proyectos" data-testid="link-hero-secondary">Ver proyectos <ArrowDownRight size={16} /></a>
              </div>
            </div>
            <div className="hero-visual reveal delay-2">
              <div className="hero-photo-frame">
                <img src="/paula-hero.jpg" alt="Persona revisando su negocio en un portátil dentro de su espacio de trabajo" />
                <div className="photo-label"><span>Lo que haces importa</span><span>01 / 05</span></div>
              </div>
              <div className="hero-stamp" aria-hidden="true">con calma<br />y criterio</div>
            </div>
            <div className="hero-scroll"><span /> Desliza para conocer el estudio</div>
          </div>
        </section>

        <section className="intro section-pad" aria-labelledby="intro-title">
          <div className="container intro-grid">
            <span className="eyebrow reveal">La idea</span>
            <div className="intro-aside reveal delay-1">
              <h2 id="intro-title" className="display intro-statement">No necesitas parecer una gran empresa. Necesitas <em>verte como el negocio que ya eres.</em></h2>
              <p>Una web no tiene que gritar para funcionar. Tiene que explicar bien, transmitir confianza y hacer que la persona adecuada piense: «esto es justo lo que estaba buscando».</p>
              <div className="mini-note">
                <div><strong>01—01</strong><span>Una mirada cercana al negocio</span></div>
                <div><strong>100%</strong><span>Implicación en cada proyecto</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="servicios" aria-labelledby="services-title">
          <div className="container">
            <div className="section-head reveal">
              <div><span className="eyebrow">Cómo puedo ayudarte</span><h2 id="services-title" className="display section-title">Lo que tu web<br /><em>puede hacer.</em></h2></div>
              <p className="section-description">Cada proyecto pide una cosa distinta. A veces es empezar bien; otras, ordenar lo que ya existe.</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return <article className={`service-card reveal delay-${(index % 3) + 1}`} key={service.number} data-testid={`card-service-${service.number}`}>
                  <div className="service-top"><span>{service.number}</span><Icon className="service-icon" size={20} strokeWidth={1.5} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="split-editorial" aria-labelledby="editorial-title">
          <div className="split-photo reveal"><img src="/studio-workspace.jpg" alt="Mesa de trabajo luminosa con portátil, bocetos y cuaderno de color ciruela" /></div>
          <div className="split-copy reveal delay-1">
            <span className="eyebrow">Una web con contexto</span>
            <h2 id="editorial-title" className="display">Tu negocio ya tiene una historia. Hagamos que tu web esté <em>a la altura.</em></h2>
            <p>No parto de plantillas ni de frases que podrían servirle a cualquiera. Escucho, observo y traduzco lo que te hace diferente a una experiencia digital que se entiende y se recuerda.</p>
          </div>
        </section>

        <section className="portfolio section-pad" id="proyectos" aria-labelledby="projects-title">
          <div className="container">
            <div className="portfolio-intro reveal">
              <div><span className="eyebrow">Trabajo seleccionado</span><h2 id="projects-title" className="display section-title">Proyectos con<br /><em>los pies en la tierra.</em></h2></div>
              <p>Digitalizar un negocio tradicional no es disfrazarlo. Es abrir una puerta nueva para que más personas encuentren su forma de trabajar.</p>
            </div>
            <article className="project-card reveal delay-1" data-testid="card-project-excavaciones">
              <div className="project-meta"><span>Proyecto destacado · Web corporativa</span><span>2024 — Asturias</span></div>
              <div className="project-mockup" aria-label="Previsualización de la web de Excavaciones El Cabo">
                <div className="browser-bar"><span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" /><span className="browser-url">excavacioneselcabo.es</span></div>
                <div className="project-screen">
                  <div className="project-screen-copy"><div className="fake-logo">EXCAVACIONES<br />EL CABO</div><h3>La tierra<br />en buenas manos.</h3><p>Movimiento de tierras y obra civil desde 1988.</p></div>
                  <div className="project-screen-image" role="img" aria-label="Manos trabajando sobre planos y herramientas" />
                </div>
              </div>
              <div className="project-caption"><h3>Excavaciones El Cabo</h3><p>Una web para un negocio con décadas de oficio: directa, sólida y cercana. Un proyecto de transformación digital para que la experiencia del equipo también se viera desde el primer clic.</p></div>
            </article>
          </div>
        </section>

        <section className="process section-pad" aria-labelledby="process-title">
          <div className="container">
            <div className="section-head reveal"><div><span className="eyebrow">Así trabajaremos</span><h2 id="process-title" className="display section-title">Sin líos.<br /><em>Con método.</em></h2></div><p className="section-description">Un proceso sencillo y compartido, para que siempre sepas en qué punto estamos y por qué.</p></div>
            <div className="process-grid">
              {process.map((step, index) => <article className={`process-item reveal delay-${(index % 3) + 1}`} key={step.number}><span className="process-num">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about section-pad" id="sobre-mi" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-photo reveal"><img src="/paula-hero.jpg" alt="Paula trabajando concentrada frente a su ordenador" /></div>
            <div className="about-copy reveal delay-1">
              <span className="eyebrow">Detrás de PGA</span>
              <h2 id="about-title" className="display">Soy Paula.<br /><em>Encantada.</em></h2>
              <p>Creo que una buena web empieza mucho antes de abrir Figma. Empieza escuchando a la persona que hay detrás del negocio: sus tiempos, sus dudas, lo que le enorgullece y lo que quiere construir.</p>
              <p>Trabajo de forma cercana, con criterio y sin traducirlo todo a palabras raras. Tu proyecto tiene que funcionar para ti, no al revés.</p>
              <div className="about-list"><div><span>01</span>Mirada estratégica, cuidado por los detalles</div><div><span>02</span>Comunicación clara durante todo el proyecto</div><div><span>03</span>Una web que puedas hacer tuya</div></div>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contacto" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-intro reveal">
              <span className="eyebrow">El siguiente paso</span>
              <h2 id="contact-title" className="display">¿Hablamos de tu proyecto?</h2>
              <p>Cuéntame qué tienes entre manos, aunque todavía esté un poco desordenado. Lo ponemos en común y vemos si puedo ayudarte.</p>
              <div className="contact-detail"><span className="eyebrow">También puedes escribir directamente</span><a href="mailto:hola@pgaestudiodigital.es" data-testid="link-email">hola@pgaestudiodigital.es</a></div>
            </div>
            <div className="reveal delay-1">
              {submitted ? <div className="success-message" role="status" data-testid="status-form-success"><strong>Gracias, {form.nombre.split(' ')[0]}.</strong><span>He recibido tu proyecto. Te responderé personalmente en cuanto pueda.</span><button className="button-ghost form-submit" onClick={() => { setSubmitted(false); setForm({ nombre: '', negocio: '', email: '', telefono: '', necesidades: '' }); }} data-testid="button-new-message">Enviar otro mensaje <ArrowRight size={15} /></button></div> : <form className="contact-form" onSubmit={submitForm} noValidate>
                <div className="form-row">
                  <div className="form-field"><label htmlFor="nombre">Nombre *</label><input id="nombre" value={form.nombre} onChange={(event) => updateField('nombre', event.target.value)} placeholder="Tu nombre" aria-invalid={Boolean(errors.nombre)} data-testid="input-nombre" />{errors.nombre && <span className="field-error">{errors.nombre}</span>}</div>
                  <div className="form-field"><label htmlFor="negocio">Negocio</label><input id="negocio" value={form.negocio} onChange={(event) => updateField('negocio', event.target.value)} placeholder="Nombre de tu negocio" data-testid="input-negocio" /></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label htmlFor="email">Email *</label><input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} data-testid="input-email" />{errors.email && <span className="field-error">{errors.email}</span>}</div>
                  <div className="form-field"><label htmlFor="telefono">Teléfono</label><input id="telefono" type="tel" value={form.telefono} onChange={(event) => updateField('telefono', event.target.value)} placeholder="Opcional" data-testid="input-telefono" /></div>
                </div>
                <div className="form-field"><label htmlFor="necesidades">Cuéntame brevemente qué necesitas *</label><textarea id="necesidades" value={form.necesidades} onChange={(event) => updateField('necesidades', event.target.value)} placeholder="Qué haces, qué te gustaría mejorar y en qué momento estás..." aria-invalid={Boolean(errors.necesidades)} data-testid="input-necesidades" />{errors.necesidades && <span className="field-error">{errors.necesidades}</span>}</div>
                <button className="button-primary form-submit" type="submit" data-testid="button-submit-form">Enviar proyecto <ArrowRight size={16} /></button>
              </form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top"><a className="brand" href="#inicio" data-testid="link-footer-brand"><span className="brand-mark">P</span><span>PGA Estudio Digital</span></a><div className="footer-links"><a href="#servicios" data-testid="link-footer-servicios">Servicios</a><a href="#proyectos" data-testid="link-footer-proyectos">Proyectos</a><a href="#contacto" data-testid="link-footer-contacto">Contacto</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a></div></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} PGA Estudio Digital</span><span>Diseño web con cabeza y corazón · Asturias / Online</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;