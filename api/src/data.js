// Datos FICTICIOS en memoria para el workshop.
const RATINGS = ['AA', 'A', 'B', 'B15', 'C', 'D'];
const PLAN_LIMITS = { BASICO: 2, PREMIUM: 4 };
const MAX_PROFILES = 5;

function seed() {
  return {
    accounts: {
      'acc-basico': { id: 'acc-basico', plan: 'BASICO' },
      'acc-premium': { id: 'acc-premium', plan: 'PREMIUM' }
    },
    profiles: {
      'p-titular-b': { id: 'p-titular-b', accountId: 'acc-basico', name: 'Titular', kids: false, maxRating: 'D' },
      'p-ninos-b': { id: 'p-ninos-b', accountId: 'acc-basico', name: 'Niños', kids: true, maxRating: 'A' },
      'p-titular-p': { id: 'p-titular-p', accountId: 'acc-premium', name: 'Titular', kids: false, maxRating: 'D' }
    },
    contents: {
      'c-001': { id: 'c-001', title: 'Aventuras en el bosque', rating: 'AA' },
      'c-002': { id: 'c-002', title: 'Robots al rescate', rating: 'A' },
      'c-003': { id: 'c-003', title: 'Misterio en la ciudad', rating: 'B' },
      'c-004': { id: 'c-004', title: 'Noche de terror', rating: 'B15' },
      'c-005': { id: 'c-005', title: 'Final de temporada', rating: 'C' }
    },
    sessions: {}
  };
}

module.exports = { RATINGS, PLAN_LIMITS, MAX_PROFILES, seed };
