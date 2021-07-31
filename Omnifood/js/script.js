'use strict';

///////////////////////////////////////////////
// ATUALIZA ANO ATUAL
const anoEl = document.querySelector('.year');
const anoAtual = new Date().getFullYear();
console.log(anoAtual);
anoEl.textContent = anoAtual;

///////////////////////////////////////////////
// FUNCIONAMENTO DO MENU
const btnNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');

btnNav.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

///////////////////////////////////////////////
// SMOOTH SCROLLING
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const href = link.getAttribute('href');
    // NAVEGAÇÃO PRO TOPO DA PÁGINA
    if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });

    // NAVEGAÇÃO PARA SEÇÕES DO SITE
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // FECHA O MENU DE NAVEGAÇÃO MOBILE
    if (link.classList.contains('main-nav-link')) {
      header.classList.toggle('nav-open');
    }
  });
});

///////////////////////////////////////////////
// NAVEGAÇÃO FIXA
const sectionHero = document.querySelector('.section-hero');

const observer = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) {
      document.body.classList.add('sticky');
    }

    if (entry.isIntersecting) {
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
