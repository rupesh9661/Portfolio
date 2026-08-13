(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const esc = (str) => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tech = items => `<div class="tech-list">${items.map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
  $('#year').textContent = new Date().getFullYear();
  // Keep the background alive without a rendering-heavy canvas library.
  const glow = $('.cursor-glow');
  if (glow && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', e => {
      glow.style.transform = `translate(${e.clientX - 180}px, ${e.clientY - 180}px)`;
    }, { passive: true });
  }
  $('#experience-list').innerHTML = experience.map((role, i) => `<article class="timeline-item reveal ${i === 0 ? 'current' : ''}"><div class="timeline-date">${role.date}</div><div><p class="timeline-company">${role.company}</p><h3>${role.title}</h3><p>${role.description}</p>${tech(role.tech)}</div></article>`).join('');
  $('#skill-groups').innerHTML = skills.map(group => `<article class="skill-group reveal"><p>${group.name}</p>${tech(group.items)}</article>`).join('');
  function projectCard(p, featured = false) { return `<article class="${featured ? 'feature-card' : 'mini-card'} reveal" data-project="${p.id}"><div class="project-image"><img src="${p.image}" alt="${esc(p.name)} project preview" loading="lazy"></div><div class="project-content"><p class="project-type">${esc(p.type)}</p><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>${featured ? `<div class="contribution"><b>Contribution</b><span>${esc(p.contribution)}</span></div>` : ''}${tech(p.tech)}<button class="case-link" data-open-project="${p.id}">View case study <span>↗</span></button></div></article>`; }
  $('#featured-projects').innerHTML = projects.filter(p => p.featured).map(p => projectCard(p, true)).join('');
  const renderMore = filter => { const matched = projects.filter(p => !p.featured && (filter === 'All' || p.filters.includes(filter))); $('#more-projects').innerHTML = matched.map(p => projectCard(p)).join('') || '<p class="empty">No projects in this category yet.</p>'; $$('#more-projects .reveal').forEach(el => el.classList.add('visible')); };
  renderMore('All');
  const dialog = $('#project-dialog');
  function openProject(id) { const p = projects.find(item => item.id === id); if (!p) return; $('#modal-content').innerHTML = `<div class="modal-image"><img src="${p.image}" alt="${esc(p.name)} project preview"></div><div class="modal-copy"><p class="project-type">${esc(p.type)}</p><h2 id="dialog-title">${esc(p.name)}</h2><p>${esc(p.description)}</p><div class="modal-detail"><b>My contribution</b><p>${esc(p.contribution)}</p></div><div class="modal-detail"><b>Technical approach</b><p>${esc(p.approach)}</p></div>${tech(p.tech)}<a class="button button-primary" href="${p.url}" target="_blank" rel="noopener">Visit project <span>↗</span></a></div>`; dialog.showModal(); $('.dialog-close').focus(); }
  document.addEventListener('click', e => { const open = e.target.closest('[data-open-project]'); if (open) openProject(open.dataset.openProject); const filter = e.target.closest('.filter'); if (filter) { $$('.filter').forEach(b => b.classList.toggle('active', b === filter)); renderMore(filter.dataset.filter); } });
  function $$(s, p = document) { return [...p.querySelectorAll(s)]; }
  $('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  const toggle = $('.menu-toggle'), menu = $('.nav-menu'); toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); }); $$('.nav-link').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
  const sections = $$('main section[id], header[id]'); const navs = $$('.nav-link'); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navs.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)); }), { rootMargin: '-35% 0px -55%' }); sections.forEach(s => observer.observe(s));
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } }), { threshold: .12 }); $$('.reveal').forEach(el => reveal.observe(el));
})();
