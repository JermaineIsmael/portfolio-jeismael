// ================================
// PERSONALIZATION SETTINGS
// Replace these values when you make the portfolio your own.
// ================================
const portfolioConfig = {
  name: 'Jermaine E. Ismael',
  title: 'Senior Cloud & Integration Engineer',
  location: 'Bacoor City, Cavite',
  email: 'jeismael1215@gmail.com',
  linkedin: 'https://linkedin.com/in/jermaineismael',
  github: '',
  resume: 'resume/resume.pdf'
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const backTop = document.querySelector('[data-back-top]');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const year = document.querySelector('[data-year]');
  const revealItems = document.querySelectorAll('.reveal');

  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-resume-link]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      try {
        const response = await fetch(link.href, { method: 'HEAD' });
        if (!response.ok) {
          event.preventDefault();
          window.alert('The resume PDF has not been added yet. Place it at resume/resume.pdf.');
        }
      } catch {
        event.preventDefault();
        window.alert('The resume PDF is unavailable. Place it at resume/resume.pdf.');
      }
    });
  });

  const closeMenu = () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 8);
    backTop?.classList.toggle('visible', window.scrollY > 600);
    const current = sections.reduce((active, section) => {
      if (window.scrollY + 150 >= section.offsetTop) return section.id;
      return active;
    }, 'home');
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const subject = encodeURIComponent(formData.get('subject'));
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
    const status = form.querySelector('.form-status');
    window.location.href = `mailto:${portfolioConfig.email}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email client...';
  });

  document.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => image.hidden = true);
  });

  const architectureContent = {
    integration: {
      title: 'Design for change, failure, and clear ownership.',
      steps: [
        {
          label: '01 / Inbound validation',
          text: 'External systems send structured payloads into normalized inbound adapters where format and contract checks happen before the event is routed.'
        },
        {
          label: '02 / Routing intelligence',
          text: 'A central router applies deterministic rules to classify, transform, and fan out each payload to the correct downstream system or partner.'
        },
        {
          label: '03 / Controlled delivery',
          text: 'Outbound adapters serialize the message format, handle retries, and maintain partner-specific behavior without coupling the core platform to every external API.'
        },
        {
          label: '04 / Observability',
          text: 'Logs, tracing, alerting, and metrics make failures visible early and help teams keep the platform dependable in production.'
        }
      ]
    },
    iot: {
      title: 'Telemetry flows that remain observable and actionable.',
      steps: [
        {
          label: '01 / Device ingestion',
          text: 'Connected devices publish telemetry into IoT Hub, where ingestion and device identity are managed securely before payloads move downstream.'
        },
        {
          label: '02 / Event processing',
          text: 'Stream Analytics and event handlers normalize messages, enrich them, and route them to business services, feedback loops, and operational dashboards.'
        },
        {
          label: '03 / Data and API layer',
          text: 'Key data is persisted in Cosmos DB and exposed through APIs and analytics pipelines so applications, BI, and internal teams can use consistent data.'
        },
        {
          label: '04 / Governance',
          text: 'Security controls, monitoring, and layered ownership allow the platform to scale while keeping operational risk in view.'
        }
      ]
    }
  };

  const architectureTabs = [...document.querySelectorAll('.architecture-tab')];
  const architectureImages = [...document.querySelectorAll('.architecture-image')];
  const architectureTitle = document.querySelector('#architecture-copy-title');
  const architectureSteps = [...document.querySelectorAll('[data-architecture-step]')];

  const renderArchitecture = (key) => {
    const content = architectureContent[key];
    if (!content || !architectureTitle) return;

    architectureTitle.textContent = content.title;
    architectureSteps.forEach((step, index) => {
      const label = step.querySelector('[data-architecture-label]');
      const text = step.querySelector('[data-architecture-text]');
      const item = content.steps[index];
      if (!item) return;
      label.textContent = item.label;
      text.textContent = item.text;
    });

    architectureTabs.forEach((tab) => {
      const isActive = tab.dataset.architectureKey === key;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    architectureImages.forEach((image) => {
      const isActive = image.dataset.architectureImage === key;
      image.classList.toggle('is-active', isActive);
    });
  };

  architectureTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderArchitecture(tab.dataset.architectureKey));
  });
});
