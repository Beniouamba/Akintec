// =============================================
// AKINTEC - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 1600);
  }

  // ===== CURSOR =====
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
      });
    });
  }

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 80) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');

    // Back to top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      if (window.scrollY > 500) btt.classList.add('visible');
      else btt.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== BACK TO TOP =====
  const btt = document.querySelector('.back-to-top');
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');

  const openMenu = () => {
    mobileMenu?.classList.add('open');
    overlay?.classList.add('show');
    hamburger?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('show');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Mobile sub-nav toggles
  document.querySelectorAll('.mobile-nav .has-sub > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = link.nextElementSibling;
      sub?.classList.toggle('open');
      const icon = link.querySelector('.toggle-icon');
      if (icon) icon.style.transform = sub?.classList.contains('open') ? 'rotate(180deg)' : '';
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateEls = document.querySelectorAll('.animate-fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  animateEls.forEach(el => observer.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // ===== MULTILINGUAL SYSTEM =====
  const translations = {
    fr: {
      // Header
      'nav.home': 'Accueil',
      'nav.about': 'Qui sommes-nous ?',
      'nav.services': 'Nos Services',
      'nav.join': 'Nous rejoindre',
      'nav.contact': 'Contact',
      'nav.contact_btn': 'Nous contacter',
      // Services dropdown
      'nav.services.software': 'Développement Logiciel',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Conseil IT & Transformation',
      'nav.services.recruitment': 'Recrutement & Sous-traitance',
      // Hero
      'hero.badge': 'Votre partenaire tech en France',
      'hero.title': 'Accélérez vos projets <span class="highlight">digitaux</span> avec AKINTEC.',
      'hero.desc': 'Cabinet de conseil et ingénierie spécialisé dans le développement, la data et la transformation digitale.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Réactivité',
      'hero.feature4': 'Proximité',
      'hero.cta1': 'Découvrir nos services',
      'hero.cta2': 'Nous contacter',
      'hero.stat1': 'Projets réalisés',
      'hero.stat2': 'Clients satisfaits',
      'hero.stat3': 'Experts tech',
      'hero.stat4': 'Années d\'expérience',
      // Services
      'services.tag': 'Nos services',
      'services.title': 'Expertise à votre service',
      'services.desc': 'Découvrez nos domaines d\'expertise, au cœur de la transformation digitale de nos clients.',
      'services.software.title': 'Développement Logiciel & Web',
      'services.software.desc': 'Applications web, mobiles et logiciels sur mesure avec les dernières technologies.',
      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Valorisez vos données avec nos solutions d\'ingénierie et d\'intelligence artificielle.',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Infrastructure cloud scalable, CI/CD et automatisation pour une livraison rapide.',
      'services.consulting.title': 'Conseil IT & Transformation Digitale',
      'services.consulting.desc': 'Stratégie IT, audit et accompagnement pour votre transformation numérique.',
      'services.recruitment.title': 'Recrutement & Sous-traitance',
      'services.recruitment.desc': 'Talents tech qualifiés pour renforcer vos équipes selon vos besoins.',
      'services.cta': 'En savoir plus',
      // Why us
      'why.tag': 'Pourquoi nous ?',
      'why.title': 'Ce qui nous distingue',
      'why.desc': 'Chez AKINTEC, expertise technique, innovation et proximité humaine se combinent pour accompagner durablement la transformation digitale.',
      'why.1.title': 'Expertise technique reconnue',
      'why.1.desc': 'Nos ingénieurs maîtrisent les technologies modernes web, cloud et data science.',
      'why.2.title': 'Accompagnement sur mesure',
      'why.2.desc': 'Chaque projet est conçu pour s\'adapter à vos défis métiers, avec une approche agile et transparente.',
      'why.3.title': 'Réseau de talents qualifiés',
      'why.3.desc': 'Nous sélectionnons des profils qualifiés, passionnés et disponibles pour renforcer vos équipes.',
      'why.4.title': 'Innovation & proximité',
      'why.4.desc': 'Basés en France, nous combinons rigueur technique et culture de l\'innovation.',
      // Testimonials
      'testimonials.tag': 'Témoignages',
      'testimonials.title': 'Ce que disent nos clients',
      // Brands
      'brands.title': 'Ils nous font confiance',
      // CTA
      'cta.title': 'Besoin d\'un partenaire tech fiable ?',
      'cta.desc': 'Discutons de votre projet et trouvons ensemble la meilleure solution pour vos besoins.',
      'cta.btn': 'Démarrer un projet',
      // Footer
      'footer.tagline': '"Notre génération croit en un monde numérique plus responsable, au service des entreprises et de la planète."',
      'footer.useful': 'Liens utiles',
      'footer.company': 'Notre entreprise',
      'footer.contact': 'Nos contacts',
      'footer.legal': 'Mentions légales',
      'footer.privacy': 'Politique de confidentialité',
      'footer.partners': 'Partenaires',
      'footer.about': 'À propos',
      'footer.services': 'Nos services',
      'footer.recruitment': 'Recrutement',
      'footer.copyright': 'Tous droits réservés.',
      // About
      'about.tag': 'Qui sommes-nous',
      'about.title': 'AKINTEC, votre partenaire de confiance',
      'about.desc1': 'Fondée avec la conviction qu\'une nouvelle génération de cabinets tech peut faire mieux, AKINTEC accompagne entreprises et institutions dans leur transformation digitale.',
      'about.desc2': 'Notre approche combine expertise technique de haut niveau, agilité et proximité humaine pour livrer des solutions qui créent de la valeur durable.',
      'about.mission.title': 'Notre Mission',
      'about.mission.desc': 'Accélérer la transformation digitale',
      'about.vision.title': 'Notre Vision',
      'about.vision.desc': 'Un numérique plus responsable',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Technologies de pointe',
      'about.excellence.title': 'Excellence',
      'about.excellence.desc': 'Standards élevés',
      // Contact
      'contact.tag': 'Contact',
      'contact.title': 'Parlons de votre projet',
      'contact.desc': 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.',
      'contact.form.title': 'Envoyez-nous un message',
      'contact.form.subtitle': 'Nous vous répondons dans les 24h',
      'contact.form.firstname': 'Prénom',
      'contact.form.lastname': 'Nom',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Téléphone',
      'contact.form.subject': 'Sujet',
      'contact.form.message': 'Votre message',
      'contact.form.send': 'Envoyer le message',
      'contact.address': 'Adresse',
      'contact.phone': 'Téléphone',
      'contact.email_lbl': 'Email',
      // Join us
      'join.tag': 'Rejoignez-nous',
      'join.title': 'Construisez l\'avenir avec nous',
      'join.desc': 'Vous êtes passionné par la tech et souhaitez rejoindre une équipe dynamique ? AKINTEC recrute des talents !',
      'join.apply': 'Postuler maintenant',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'Who are we?',
      'nav.services': 'Our Services',
      'nav.join': 'Join us',
      'nav.contact': 'Contact',
      'nav.contact_btn': 'Contact us',
      'nav.services.software': 'Software Development',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'IT Consulting & Transformation',
      'nav.services.recruitment': 'Recruitment & Outsourcing',
      'hero.badge': 'Your tech partner in France',
      'hero.title': 'Accelerate your <span class="highlight">digital</span> projects with AKINTEC.',
      'hero.desc': 'Consulting and engineering firm specializing in development, data and digital transformation.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Reactivity',
      'hero.feature4': 'Proximity',
      'hero.cta1': 'Discover our services',
      'hero.cta2': 'Contact us',
      'hero.stat1': 'Projects delivered',
      'hero.stat2': 'Happy clients',
      'hero.stat3': 'Tech experts',
      'hero.stat4': 'Years of experience',
      'services.tag': 'Our Services',
      'services.title': 'Expertise at your service',
      'services.desc': 'Discover our areas of expertise, at the heart of our clients\' digital transformation.',
      'services.software.title': 'Software & Web Development',
      'services.software.desc': 'Custom web, mobile applications and software with the latest technologies.',
      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Unlock value from your data with our engineering and AI solutions.',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Scalable cloud infrastructure, CI/CD and automation for fast delivery.',
      'services.consulting.title': 'IT Consulting & Digital Transformation',
      'services.consulting.desc': 'IT strategy, audit and support for your digital transformation.',
      'services.recruitment.title': 'Recruitment & Outsourcing',
      'services.recruitment.desc': 'Qualified tech talent to strengthen your teams according to your needs.',
      'services.cta': 'Learn more',
      'why.tag': 'Why us?',
      'why.title': 'What sets us apart',
      'why.desc': 'At AKINTEC, we combine technical expertise, innovation and human proximity to sustainably support digital transformation.',
      'why.1.title': 'Recognized technical expertise',
      'why.1.desc': 'Our engineers master modern web, cloud and data science technologies.',
      'why.2.title': 'Tailored support',
      'why.2.desc': 'Each project is designed to adapt to your business challenges, with an agile and transparent approach.',
      'why.3.title': 'Network of qualified talent',
      'why.3.desc': 'We select qualified, passionate and available profiles to strengthen your technical teams.',
      'why.4.title': 'Innovation & proximity',
      'why.4.desc': 'Based in France, we combine technical rigor with a culture of innovation.',
      'testimonials.tag': 'Testimonials',
      'testimonials.title': 'What our clients say',
      'brands.title': 'They trust us',
      'cta.title': 'Need a reliable tech partner?',
      'cta.desc': "Let's discuss your project and find together the best solution for your needs.",
      'cta.btn': 'Start a project',
      'footer.tagline': '"Our generation believes in a more responsible digital world, serving businesses and the planet."',
      'footer.useful': 'Useful Links',
      'footer.company': 'Our Company',
      'footer.contact': 'Our Contacts',
      'footer.legal': 'Legal notice',
      'footer.privacy': 'Privacy Policy',
      'footer.partners': 'Partners',
      'footer.about': 'About',
      'footer.services': 'Our Services',
      'footer.recruitment': 'Recruitment',
      'footer.copyright': 'All rights reserved.',
      'about.tag': 'Who we are',
      'about.title': 'AKINTEC, your trusted partner',
      'about.desc1': 'Founded with the conviction that a new generation of tech firms can do better, AKINTEC supports companies and institutions in their digital transformation.',
      'about.desc2': 'Our approach combines high-level technical expertise, agility and human proximity to deliver solutions that create lasting value.',
      'about.mission.title': 'Our Mission',
      'about.mission.desc': 'Accelerate digital transformation',
      'about.vision.title': 'Our Vision',
      'about.vision.desc': 'A more responsible digital world',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Cutting-edge technologies',
      'about.excellence.title': 'Excellence',
      'about.excellence.desc': 'High standards',
      'contact.tag': 'Contact',
      'contact.title': "Let's talk about your project",
      'contact.desc': 'Our team is available to answer all your questions and support you.',
      'contact.form.title': 'Send us a message',
      'contact.form.subtitle': 'We respond within 24 hours',
      'contact.form.firstname': 'First name',
      'contact.form.lastname': 'Last name',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Phone',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Your message',
      'contact.form.send': 'Send message',
      'contact.address': 'Address',
      'contact.phone': 'Phone',
      'contact.email_lbl': 'Email',
      'join.tag': 'Join us',
      'join.title': 'Build the future with us',
      'join.desc': 'Are you passionate about tech and want to join a dynamic team? AKINTEC is hiring!',
      'join.apply': 'Apply now',
    },
    es: {
      'nav.home': 'Inicio',
      'nav.about': '¿Quiénes somos?',
      'nav.services': 'Nuestros Servicios',
      'nav.join': 'Únete a nosotros',
      'nav.contact': 'Contacto',
      'nav.contact_btn': 'Contáctenos',
      'nav.services.software': 'Desarrollo de Software',
      'nav.services.data': 'Ingeniería de Datos & IA',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Consultoría IT',
      'nav.services.recruitment': 'Reclutamiento & Outsourcing',
      'hero.badge': 'Tu socio tecnológico en Francia',
      'hero.title': 'Acelera tus proyectos <span class="highlight">digitales</span> con AKINTEC.',
      'hero.desc': 'Consultoría e ingeniería especializada en desarrollo, datos y transformación digital.',
      'hero.feature1': 'Innovación',
      'hero.feature2': 'Experiencia',
      'hero.feature3': 'Reactividad',
      'hero.feature4': 'Proximidad',
      'hero.cta1': 'Descubrir nuestros servicios',
      'hero.cta2': 'Contáctenos',
      'hero.stat1': 'Proyectos entregados',
      'hero.stat2': 'Clientes satisfechos',
      'hero.stat3': 'Expertos técnicos',
      'hero.stat4': 'Años de experiencia',
      'services.tag': 'Nuestros Servicios',
      'services.title': 'Experiencia a su servicio',
      'services.desc': 'Descubra nuestras áreas de especialización en el corazón de la transformación digital.',
      'services.software.title': 'Desarrollo de Software & Web',
      'services.software.desc': 'Aplicaciones web, móviles y software a medida con las últimas tecnologías.',
      'services.data.title': 'Ingeniería de Datos & Data Science',
      'services.data.desc': 'Aproveche sus datos con nuestras soluciones de ingeniería e IA.',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Infraestructura cloud escalable, CI/CD y automatización para entrega rápida.',
      'services.consulting.title': 'Consultoría IT & Transformación Digital',
      'services.consulting.desc': 'Estrategia IT, auditoría y acompañamiento para su transformación digital.',
      'services.recruitment.title': 'Reclutamiento & Outsourcing',
      'services.recruitment.desc': 'Talento tech cualificado para reforzar sus equipos según sus necesidades.',
      'services.cta': 'Saber más',
      'why.tag': '¿Por qué nosotros?',
      'why.title': 'Lo que nos distingue',
      'why.desc': 'En AKINTEC combinamos experiencia técnica, innovación y proximidad humana.',
      'why.1.title': 'Experiencia técnica reconocida',
      'why.1.desc': 'Nuestros ingenieros dominan tecnologías modernas web, cloud y data science.',
      'why.2.title': 'Acompañamiento personalizado',
      'why.2.desc': 'Cada proyecto se diseña para adaptarse a sus desafíos empresariales.',
      'why.3.title': 'Red de talentos cualificados',
      'why.3.desc': 'Seleccionamos perfiles cualificados y apasionados para reforzar sus equipos.',
      'why.4.title': 'Innovación y proximidad',
      'why.4.desc': 'Basados en Francia, combinamos rigor técnico y cultura de innovación.',
      'testimonials.tag': 'Testimonios',
      'testimonials.title': 'Lo que dicen nuestros clientes',
      'brands.title': 'Confían en nosotros',
      'cta.title': '¿Necesita un socio tecnológico fiable?',
      'cta.desc': 'Hablemos de su proyecto y encontremos juntos la mejor solución.',
      'cta.btn': 'Iniciar un proyecto',
      'footer.tagline': '"Nuestra generación cree en un mundo digital más responsable."',
      'footer.useful': 'Enlaces útiles',
      'footer.company': 'Nuestra empresa',
      'footer.contact': 'Contacto',
      'footer.legal': 'Aviso legal',
      'footer.privacy': 'Política de privacidad',
      'footer.partners': 'Socios',
      'footer.about': 'Acerca de',
      'footer.services': 'Nuestros servicios',
      'footer.recruitment': 'Reclutamiento',
      'footer.copyright': 'Todos los derechos reservados.',
      'about.tag': 'Quiénes somos',
      'about.title': 'AKINTEC, su socio de confianza',
      'about.desc1': 'Fundada con la convicción de que una nueva generación de empresas tech puede hacerlo mejor.',
      'about.desc2': 'Nuestra combinación de experiencia técnica, agilidad y proximidad humana entrega soluciones de valor duradero.',
      'about.mission.title': 'Nuestra Misión',
      'about.mission.desc': 'Acelerar la transformación digital',
      'about.vision.title': 'Nuestra Visión',
      'about.vision.desc': 'Un digital más responsable',
      'about.innovation.title': 'Innovación',
      'about.innovation.desc': 'Tecnologías de vanguardia',
      'about.excellence.title': 'Excelencia',
      'about.excellence.desc': 'Altos estándares',
      'contact.tag': 'Contacto',
      'contact.title': 'Hablemos de su proyecto',
      'contact.desc': 'Nuestro equipo está disponible para responder a todas sus preguntas.',
      'contact.form.title': 'Envíenos un mensaje',
      'contact.form.subtitle': 'Respondemos en 24 horas',
      'contact.form.firstname': 'Nombre',
      'contact.form.lastname': 'Apellido',
      'contact.form.email': 'Correo electrónico',
      'contact.form.phone': 'Teléfono',
      'contact.form.subject': 'Asunto',
      'contact.form.message': 'Su mensaje',
      'contact.form.send': 'Enviar mensaje',
      'contact.address': 'Dirección',
      'contact.phone': 'Teléfono',
      'contact.email_lbl': 'Correo',
      'join.tag': 'Únete',
      'join.title': 'Construye el futuro con nosotros',
      'join.desc': '¿Apasionado por la tecnología? ¡AKINTEC está contratando!',
      'join.apply': 'Aplicar ahora',
    },
    de: {
      'nav.home': 'Startseite',
      'nav.about': 'Wer sind wir?',
      'nav.services': 'Unsere Leistungen',
      'nav.join': 'Bewerben',
      'nav.contact': 'Kontakt',
      'nav.contact_btn': 'Kontakt aufnehmen',
      'nav.services.software': 'Softwareentwicklung',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'IT-Beratung',
      'nav.services.recruitment': 'Recruiting & Outsourcing',
      'hero.badge': 'Ihr Tech-Partner in Frankreich',
      'hero.title': 'Beschleunigen Sie Ihre <span class="highlight">digitalen</span> Projekte mit AKINTEC.',
      'hero.desc': 'Beratungs- und Ingenieurbüro spezialisiert auf Entwicklung, Daten und digitale Transformation.',
      'hero.feature1': 'Innovation',
      'hero.feature2': 'Expertise',
      'hero.feature3': 'Reaktivität',
      'hero.feature4': 'Nähe',
      'hero.cta1': 'Unsere Leistungen entdecken',
      'hero.cta2': 'Kontakt aufnehmen',
      'hero.stat1': 'Abgeschlossene Projekte',
      'hero.stat2': 'Zufriedene Kunden',
      'hero.stat3': 'Tech-Experten',
      'hero.stat4': 'Jahre Erfahrung',
      'services.tag': 'Unsere Leistungen',
      'services.title': 'Expertise für Sie',
      'services.desc': 'Entdecken Sie unsere Kompetenzbereiche im Herzen der digitalen Transformation.',
      'services.software.title': 'Software- & Webentwicklung',
      'services.software.desc': 'Maßgeschneiderte Web-, Mobile- und Softwarelösungen mit den neuesten Technologien.',
      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Erschließen Sie den Wert Ihrer Daten mit unseren Engineering- und KI-Lösungen.',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Skalierbare Cloud-Infrastruktur, CI/CD und Automatisierung für schnelle Lieferung.',
      'services.consulting.title': 'IT-Beratung & Digitale Transformation',
      'services.consulting.desc': 'IT-Strategie, Audit und Begleitung für Ihre digitale Transformation.',
      'services.recruitment.title': 'Recruiting & Outsourcing',
      'services.recruitment.desc': 'Qualifizierte Tech-Talente zur Stärkung Ihrer Teams nach Ihren Bedürfnissen.',
      'services.cta': 'Mehr erfahren',
      'why.tag': 'Warum wir?',
      'why.title': 'Was uns auszeichnet',
      'why.desc': 'Bei AKINTEC verbinden wir technisches Know-how, Innovation und menschliche Nähe.',
      'why.1.title': 'Anerkannte technische Expertise',
      'why.1.desc': 'Unsere Ingenieure beherrschen moderne Web-, Cloud- und Data-Science-Technologien.',
      'why.2.title': 'Individuelle Begleitung',
      'why.2.desc': 'Jedes Projekt wird an Ihre geschäftlichen Herausforderungen angepasst.',
      'why.3.title': 'Netzwerk qualifizierter Talente',
      'why.3.desc': 'Wir wählen qualifizierte und engagierte Profile zur Stärkung Ihrer Teams aus.',
      'why.4.title': 'Innovation & Nähe',
      'why.4.desc': 'In Frankreich ansässig, verbinden wir technische Präzision mit Innovationskultur.',
      'testimonials.tag': 'Referenzen',
      'testimonials.title': 'Was unsere Kunden sagen',
      'brands.title': 'Sie vertrauen uns',
      'cta.title': 'Brauchen Sie einen zuverlässigen Tech-Partner?',
      'cta.desc': 'Lassen Sie uns über Ihr Projekt sprechen und gemeinsam die beste Lösung finden.',
      'cta.btn': 'Projekt starten',
      'footer.tagline': '"Unsere Generation glaubt an eine verantwortungsvollere digitale Welt."',
      'footer.useful': 'Nützliche Links',
      'footer.company': 'Unser Unternehmen',
      'footer.contact': 'Kontakt',
      'footer.legal': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.partners': 'Partner',
      'footer.about': 'Über uns',
      'footer.services': 'Unsere Leistungen',
      'footer.recruitment': 'Recruiting',
      'footer.copyright': 'Alle Rechte vorbehalten.',
      'about.tag': 'Wer wir sind',
      'about.title': 'AKINTEC, Ihr vertrauenswürdiger Partner',
      'about.desc1': 'Gegründet mit der Überzeugung, dass eine neue Generation von Tech-Unternehmen es besser machen kann.',
      'about.desc2': 'Unsere Kombination aus technischer Expertise, Agilität und menschlicher Nähe liefert langfristig wertvolle Lösungen.',
      'about.mission.title': 'Unsere Mission',
      'about.mission.desc': 'Digitale Transformation beschleunigen',
      'about.vision.title': 'Unsere Vision',
      'about.vision.desc': 'Eine verantwortungsvollere digitale Welt',
      'about.innovation.title': 'Innovation',
      'about.innovation.desc': 'Modernste Technologien',
      'about.excellence.title': 'Exzellenz',
      'about.excellence.desc': 'Hohe Standards',
      'contact.tag': 'Kontakt',
      'contact.title': 'Sprechen wir über Ihr Projekt',
      'contact.desc': 'Unser Team steht Ihnen für alle Fragen zur Verfügung.',
      'contact.form.title': 'Senden Sie uns eine Nachricht',
      'contact.form.subtitle': 'Wir antworten innerhalb von 24 Stunden',
      'contact.form.firstname': 'Vorname',
      'contact.form.lastname': 'Nachname',
      'contact.form.email': 'E-Mail',
      'contact.form.phone': 'Telefon',
      'contact.form.subject': 'Betreff',
      'contact.form.message': 'Ihre Nachricht',
      'contact.form.send': 'Nachricht senden',
      'contact.address': 'Adresse',
      'contact.phone': 'Telefon',
      'contact.email_lbl': 'E-Mail',
      'join.tag': 'Bewerben',
      'join.title': 'Bauen Sie mit uns die Zukunft',
      'join.desc': 'Leidenschaftlich für Technologie? AKINTEC sucht Talente!',
      'join.apply': 'Jetzt bewerben',
    },
    it: {
      'nav.home': 'Home',
      'nav.about': 'Chi siamo?',
      'nav.services': 'I Nostri Servizi',
      'nav.join': 'Unisciti a noi',
      'nav.contact': 'Contatto',
      'nav.contact_btn': 'Contattaci',
      'nav.services.software': 'Sviluppo Software',
      'nav.services.data': 'Data Engineering & Science',
      'nav.services.cloud': 'Cloud & DevOps',
      'nav.services.consulting': 'Consulenza IT',
      'nav.services.recruitment': 'Reclutamento & Outsourcing',
      'hero.badge': 'Il tuo partner tech in Francia',
      'hero.title': 'Accelera i tuoi progetti <span class="highlight">digitali</span> con AKINTEC.',
      'hero.desc': 'Società di consulenza e ingegneria specializzata in sviluppo, dati e trasformazione digitale.',
      'hero.feature1': 'Innovazione',
      'hero.feature2': 'Competenza',
      'hero.feature3': 'Reattività',
      'hero.feature4': 'Prossimità',
      'hero.cta1': 'Scopri i nostri servizi',
      'hero.cta2': 'Contattaci',
      'hero.stat1': 'Progetti consegnati',
      'hero.stat2': 'Clienti soddisfatti',
      'hero.stat3': 'Esperti tech',
      'hero.stat4': 'Anni di esperienza',
      'services.tag': 'I Nostri Servizi',
      'services.title': 'Competenza al vostro servizio',
      'services.desc': 'Scopri le nostre aree di competenza al cuore della trasformazione digitale.',
      'services.software.title': 'Sviluppo Software & Web',
      'services.software.desc': 'Applicazioni web, mobili e software su misura con le ultime tecnologie.',
      'services.data.title': 'Data Engineering & Data Science',
      'services.data.desc': 'Valorizza i tuoi dati con le nostre soluzioni di ingegneria e IA.',
      'services.cloud.title': 'Cloud & DevOps',
      'services.cloud.desc': 'Infrastruttura cloud scalabile, CI/CD e automazione per consegna rapida.',
      'services.consulting.title': 'Consulenza IT & Trasformazione Digitale',
      'services.consulting.desc': 'Strategia IT, audit e supporto per la tua trasformazione digitale.',
      'services.recruitment.title': 'Reclutamento & Outsourcing',
      'services.recruitment.desc': 'Talenti tech qualificati per rafforzare i tuoi team secondo le tue esigenze.',
      'services.cta': 'Scopri di più',
      'why.tag': 'Perché noi?',
      'why.title': 'Cosa ci distingue',
      'why.desc': 'In AKINTEC combiniamo competenza tecnica, innovazione e prossimità umana.',
      'why.1.title': 'Competenza tecnica riconosciuta',
      'why.1.desc': 'I nostri ingegneri padroneggiano tecnologie moderne web, cloud e data science.',
      'why.2.title': 'Supporto su misura',
      'why.2.desc': 'Ogni progetto è progettato per adattarsi alle sfide aziendali, con approccio agile.',
      'why.3.title': 'Rete di talenti qualificati',
      'why.3.desc': 'Selezioniamo profili qualificati e appassionati per rafforzare i tuoi team.',
      'why.4.title': 'Innovazione & prossimità',
      'why.4.desc': 'Con sede in Francia, combiniamo rigore tecnico e cultura dell\'innovazione.',
      'testimonials.tag': 'Testimonianze',
      'testimonials.title': 'Cosa dicono i nostri clienti',
      'brands.title': 'Si fidano di noi',
      'cta.title': 'Hai bisogno di un partner tecnologico affidabile?',
      'cta.desc': 'Parliamo del tuo progetto e troviamo insieme la soluzione migliore.',
      'cta.btn': 'Avvia un progetto',
      'footer.tagline': '"La nostra generazione crede in un mondo digitale più responsabile."',
      'footer.useful': 'Link utili',
      'footer.company': 'La nostra azienda',
      'footer.contact': 'Contatti',
      'footer.legal': 'Note legali',
      'footer.privacy': 'Privacy Policy',
      'footer.partners': 'Partner',
      'footer.about': 'Chi siamo',
      'footer.services': 'I nostri servizi',
      'footer.recruitment': 'Reclutamento',
      'footer.copyright': 'Tutti i diritti riservati.',
      'about.tag': 'Chi siamo',
      'about.title': 'AKINTEC, il tuo partner di fiducia',
      'about.desc1': 'Fondata con la convinzione che una nuova generazione di aziende tech possa fare di meglio.',
      'about.desc2': 'Il nostro approccio combina competenza tecnica, agilità e prossimità umana.',
      'about.mission.title': 'La Nostra Missione',
      'about.mission.desc': 'Accelerare la trasformazione digitale',
      'about.vision.title': 'La Nostra Visione',
      'about.vision.desc': 'Un digitale più responsabile',
      'about.innovation.title': 'Innovazione',
      'about.innovation.desc': 'Tecnologie all\'avanguardia',
      'about.excellence.title': 'Eccellenza',
      'about.excellence.desc': 'Standard elevati',
      'contact.tag': 'Contatto',
      'contact.title': 'Parliamo del tuo progetto',
      'contact.desc': 'Il nostro team è disponibile per rispondere a tutte le tue domande.',
      'contact.form.title': 'Inviaci un messaggio',
      'contact.form.subtitle': 'Rispondiamo entro 24 ore',
      'contact.form.firstname': 'Nome',
      'contact.form.lastname': 'Cognome',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Telefono',
      'contact.form.subject': 'Oggetto',
      'contact.form.message': 'Il tuo messaggio',
      'contact.form.send': 'Invia messaggio',
      'contact.address': 'Indirizzo',
      'contact.phone': 'Telefono',
      'contact.email_lbl': 'Email',
      'join.tag': 'Unisciti',
      'join.title': 'Costruisci il futuro con noi',
      'join.desc': 'Appassionato di tecnologia? AKINTEC sta assumendo!',
      'join.apply': 'Candidati ora',
    }
  };

  let currentLang = localStorage.getItem('akintec_lang') || 'fr';

  function t(key) {
    return translations[currentLang]?.[key] || translations['fr'][key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (key.includes('.title') || key.includes('.title') || key === 'hero.title') {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Update lang switcher display
    const langNames = { fr: '🇫🇷 Français', en: '🇬🇧 English', es: '🇪🇸 Español', de: '🇩🇪 Deutsch', it: '🇮🇹 Italiano' };
    document.querySelectorAll('.lang-display').forEach(el => {
      el.textContent = langNames[currentLang] || 'Français';
    });

    document.documentElement.lang = currentLang;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('akintec_lang', lang);
    applyTranslations();

    // Close any open dropdowns
    document.querySelectorAll('.lang-dropdown').forEach(d => {
      d.style.opacity = '0';
      d.style.visibility = 'hidden';
    });
  }

  // Language switcher clicks
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLang(btn.dataset.lang);
    });
  });

  applyTranslations();

  // ===== CONTACT FORM =====
  document.querySelectorAll('.js-contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      btn.disabled = true;
      btn.textContent = '...';

      setTimeout(() => {
        showNotification('✓', 'Message envoyé !', 'Nous vous répondrons dans les 24h.');
        form.reset();
        btn.disabled = false;
        btn.textContent = t('contact.form.send');
      }, 1500);
    });
  });

  function showNotification(icon, title, msg) {
    let notif = document.querySelector('.notification');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'notification';
      notif.innerHTML = `
        <div class="notification-icon success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
        </div>
        <div class="notification-text">
          <p class="notif-title"></p>
          <span class="notif-msg"></span>
        </div>`;
      document.body.appendChild(notif);
    }
    notif.querySelector('.notif-title').textContent = title;
    notif.querySelector('.notif-msg').textContent = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
  }

  // ===== PARTICLES =====
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        background: rgba(78, 202, 90, ${Math.random() * 0.4 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${Math.random() * 6 + 6}s;
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ===== ACTIVE NAV =====
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.closest('li')?.classList.add('active');
    }
  });

});

// ============================================================
// ADDITIONAL TRANSLATIONS — Blog, Portfolio, Partners, Services
// ============================================================
(function() {
  const extraKeys = {
    fr: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Références',
      'nav.services_all': 'Tous nos services',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Nos références clients',
      'blog.tag': 'Blog',
      'blog.title': 'Actualités & Insights',
      'partners.tag': 'Partenaires',
      'partners.title': 'Notre écosystème de partenaires',
      'services.overview.tag': 'Nos services',
      'services.overview.title': 'Une expertise à 360°',
    },
    en: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'References',
      'nav.services_all': 'All our services',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Our client references',
      'blog.tag': 'Blog',
      'blog.title': 'News & Insights',
      'partners.tag': 'Partners',
      'partners.title': 'Our partner ecosystem',
      'services.overview.tag': 'Our services',
      'services.overview.title': '360° expertise',
    },
    es: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Referencias',
      'nav.services_all': 'Todos nuestros servicios',
      'portfolio.tag': 'Portafolio',
      'portfolio.title': 'Nuestras referencias de clientes',
      'blog.tag': 'Blog',
      'blog.title': 'Noticias e Ideas',
      'partners.tag': 'Socios',
      'partners.title': 'Nuestro ecosistema de socios',
    },
    de: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Referenzen',
      'nav.services_all': 'Alle unsere Dienste',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Unsere Kundenreferenzen',
      'blog.tag': 'Blog',
      'blog.title': 'Neuigkeiten & Einblicke',
      'partners.tag': 'Partner',
      'partners.title': 'Unser Partner-Ökosystem',
    },
    it: {
      'nav.blog': 'Blog',
      'nav.portfolio': 'Riferimenti',
      'nav.services_all': 'Tutti i nostri servizi',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'I nostri riferimenti clienti',
      'blog.tag': 'Blog',
      'blog.title': 'Notizie & Approfondimenti',
      'partners.tag': 'Partner',
      'partners.title': 'Il nostro ecosistema di partner',
    },
  };

  // Merge extra keys into existing translations once window is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (window.AKINTEC_translations) {
      Object.keys(extraKeys).forEach(lang => {
        if (window.AKINTEC_translations[lang]) {
          Object.assign(window.AKINTEC_translations[lang], extraKeys[lang]);
        }
      });
    }
  });
})();
