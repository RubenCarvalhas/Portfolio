// Lista de projetos mostrados na secção de scroll infinito.
// Para adicionar um novo projeto, copia um dos objetos abaixo e edita os campos.
//
// Campos:
// - title: nome do projeto
// - description: frase curta
// - image: caminho da imagem (deve começar com /Portfolio/ devido ao base path do GitHub Pages)
// - planet: mercury | venus | earth | mars | jupiter | saturn | uranus | neptune
// - link (opcional): URL do site; se presente, o card fica clicável e abre numa nova aba

const projects = [
  {
    title: "Ortopedia Ortosaude",
    description: "E-commerce where you can buy orthopedic products",
    image: "/Portfolio/ortopedia_orto_saude.png",
    planet: "saturn",
    link: "https://www.ortopediaortosaude.com/",
  },
  
  {
    title: "Conceito do corpo",
    description: "A landing page for a spa company",
    image: "/Portfolio/conceito_do_corpo.png",
    planet: "earth",
    link: "https://conceitodocorpo.com/",
  },

  {
    title: "Tutoring sara",
    description: "Landing page with support for multiple languages",
    image: "/Portfolio/sara.png",
    planet: "neptune",
    link: "https://www.tutoringsara.com/en",
  },
  {
    title: "Guíbela",
    description: "Simple landing page for a laundry mat company.",
    image: "/Portfolio/guibela.png",
    planet: "mars",
    link: "https://guibela.site/",
  },
];

export default projects;