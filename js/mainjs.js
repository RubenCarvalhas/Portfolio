document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('.secondTitle');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('secondTitle--visible');
        obs.unobserve(entry.target); // deixa de observar depois da animação
      }
    });
  }, { threshold: 0.9 }); // 10% visível 

  titles.forEach(title => observer.observe(title));
});


document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.aline, .secondLine');

  const observerLines = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // ativa a animação
        obs.unobserve(entry.target); // só anima 1 vez
      }
    });
  }, { threshold: 0.5 }); // 50% visível 

  lines.forEach(line => observerLines.observe(line));
});
