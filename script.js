const dinosaurs = [
  {
    id: 't-rex', name: 'Tiranossauro rex', scientific: 'Tyrannosaurus rex', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '68–66 milhões de anos', size: '12 m', diet: 'Carnívoro', icon: '🦖', light: '#d9e9a5', dark: '#79a96e',
    description: 'Um dos maiores predadores terrestres conhecidos. Tinha uma mordida poderosa, braços curtos e excelente olfato.',
    fact: 'Seu nome significa “rei dos lagartos tiranos”.'
  },
  {
    id: 'triceratops', name: 'Tricerátops', scientific: 'Triceratops horridus', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '68–66 milhões de anos', size: '9 m', diet: 'Herbívoro', icon: '🦏', light: '#dce9b0', dark: '#a6bb68',
    description: 'Reconhecido pelos três chifres e pela grande gola óssea. Usava o bico para cortar plantas resistentes.',
    fact: 'O nome faz referência aos seus três chifres no rosto.'
  },
  {
    id: 'stego', name: 'Estegossauro', scientific: 'Stegosaurus stenops', period: 'jurassico', periodLabel: 'Jurássico',
    years: '155–150 milhões de anos', size: '7 m', diet: 'Herbívoro', icon: '🦕', light: '#f4d58e', dark: '#d88a57',
    description: 'Herbívoro famoso pelas placas ósseas nas costas e pelos espinhos na cauda, usados para defesa.',
    fact: 'As placas provavelmente ajudavam na exibição e na regulação térmica.'
  },
  {
    id: 'velociraptor', name: 'Velociraptor', scientific: 'Velociraptor mongoliensis', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '75–71 milhões de anos', size: '2 m', diet: 'Carnívoro', icon: '🦎', light: '#e7c49c', dark: '#bf765d',
    description: 'Pequeno e ágil predador com uma garra curva em cada pé. Era muito menor do que aparece nos filmes.',
    fact: 'Tinha penas, como muitos terópodes próximos das aves.'
  },
  {
    id: 'brachio', name: 'Braquiossauro', scientific: 'Brachiosaurus altithorax', period: 'jurassico', periodLabel: 'Jurássico',
    years: '154–153 milhões de anos', size: '25 m', diet: 'Herbívoro', icon: '🦒', light: '#d5e6c5', dark: '#73a886',
    description: 'Um gigante de pescoço longo que alcançava folhas no alto das árvores. Suas patas dianteiras eram mais longas.',
    fact: 'Seu nome significa “lagarto braço”, por causa do formato das patas.'
  },
  {
    id: 'spino', name: 'Espinossauro', scientific: 'Spinosaurus aegyptiacus', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '100–94 milhões de anos', size: '14–16 m', diet: 'Piscívoro', icon: '🐊', light: '#acd9d0', dark: '#4f8f92',
    description: 'Predador semiaquático com uma vela nas costas e focinho semelhante ao de um crocodilo.',
    fact: 'É considerado um dos maiores dinossauros carnívoros conhecidos.'
  },
  {
    id: 'plateo', name: 'Plateossauro', scientific: 'Plateosaurus engelhardti', period: 'triassico', periodLabel: 'Triássico',
    years: '214–204 milhões de anos', size: '8 m', diet: 'Herbívoro', icon: '🦘', light: '#f0d8a2', dark: '#ba8f63',
    description: 'Um dos primeiros grandes dinossauros herbívoros. Podia andar sobre duas ou quatro patas.',
    fact: 'Viveu no fim do Triássico, muito antes do T. rex.'
  },
  {
    id: 'parasaurolophus', name: 'Parasaurolophus', scientific: 'Parasaurolophus walkeri', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '76–73 milhões de anos', size: '10 m', diet: 'Herbívoro', icon: '🦢', light: '#c8d9f0', dark: '#6683b4',
    description: 'Herbívoro conhecido pela crista longa e oca, que podia produzir sons ressonantes.',
    fact: 'A crista provavelmente também ajudava na comunicação entre indivíduos.'
  },
  {
    id: 'ankylosaurus', name: 'Anquilossauro', scientific: 'Ankylosaurus magniventris', period: 'cretaceo', periodLabel: 'Cretáceo',
    years: '68–66 milhões de anos', size: '8 m', diet: 'Herbívoro', icon: '🐢', light: '#b9d5bd', dark: '#548268',
    description: 'Parecia um tanque vivo: tinha placas ósseas pelo corpo e uma poderosa clava na cauda.',
    fact: 'Sua armadura protegia as costas e as laterais do corpo.'
  }
];

const grid = document.querySelector('#dino-grid');
const searchInput = document.querySelector('#search-input');
const periodFilter = document.querySelector('#period-filter');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#dino-dialog');
const dialogContent = document.querySelector('#dialog-content');

function cardTemplate(dino) {
  return `<article class="dino-card">
    <div class="dino-image" style="--dino-light:${dino.light};--dino-dark:${dino.dark}" role="img" aria-label="Ilustração representativa de ${dino.name}">${dino.icon}</div>
    <div class="dino-body">
      <div class="dino-meta"><span>${dino.periodLabel}</span><span>${dino.diet}</span></div>
      <h3>${dino.name}</h3>
      <p>${dino.description}</p>
      <button class="details-button" type="button" data-id="${dino.id}">Ver detalhes →</button>
    </div>
  </article>`;
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const period = periodFilter.value;
  const filtered = dinosaurs.filter(dino => {
    const matchesQuery = !query || [dino.name, dino.scientific, dino.description, dino.diet].some(value => value.toLocaleLowerCase('pt-BR').includes(query));
    return matchesQuery && (period === 'todos' || dino.period === period);
  });

  grid.innerHTML = filtered.map(cardTemplate).join('');
  emptyState.hidden = filtered.length > 0;
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'espécie encontrada' : 'espécies encontradas'}`;
}

function showDetails(id) {
  const dino = dinosaurs.find(item => item.id === id);
  if (!dino) return;
  dialogContent.innerHTML = `<div class="dialog-image" style="--dino-light:${dino.light};--dino-dark:${dino.dark}" aria-hidden="true">${dino.icon}</div>
    <div class="dialog-body"><span class="eyebrow">${dino.periodLabel}</span><h2>${dino.name}</h2><p><em>${dino.scientific}</em></p><p>${dino.description}</p>
      <div class="dialog-facts"><div class="fact"><small>Período</small><strong>${dino.years}</strong></div><div class="fact"><small>Comprimento</small><strong>${dino.size}</strong></div><div class="fact"><small>Alimentação</small><strong>${dino.diet}</strong></div></div><p><strong>Curiosidade:</strong> ${dino.fact}</p></div>`;
  dialog.showModal();
}

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-id]');
  if (button) showDetails(button.dataset.id);
});
searchInput.addEventListener('input', render);
periodFilter.addEventListener('change', render);
document.querySelector('#clear-filters').addEventListener('click', () => { searchInput.value = ''; periodFilter.value = 'todos'; render(); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
render();
