export const STEP_STATUS = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  PENDING: 'pending',
  ATTENTION: 'attention',
  REJECTED: 'rejected',
};

export const STATUS_COLORS = {
  completed: { main: '#007038', light: '#E6F4EA', glow: 'rgba(0, 112, 56, 0.35)' },
  current: { main: '#3B914B', light: '#F0FDF4', glow: 'rgba(59, 145, 75, 0.35)' },
  pending: { main: '#98A2B3', light: '#F2F4F7', glow: 'rgba(152, 162, 179, 0.2)' },
  attention: { main: '#CF5300', light: '#FFF3E0', glow: 'rgba(207, 83, 0, 0.35)' },
  rejected: { main: '#C62828', light: '#FFEBEE', glow: 'rgba(198, 40, 40, 0.35)' },
};

export const STATUS_LABELS = {
  completed: 'Terminé',
  current: 'En cours',
  pending: 'En attente',
  attention: 'Attention requise',
  rejected: 'Rejeté',
};

export const INVESTOR_TYPES = [
  { value: 'physique', label: 'Personne Physique' },
  { value: 'morale', label: 'Personne Morale' },
];

export const COMPANY_TYPES = [
  { value: 'sarl', label: 'SARL' },
  { value: 'sa', label: 'SA' },
  { value: 'sas', label: 'SAS' },
];

export const PROJECT_TYPES = [
  { value: 'creation', label: 'Création' },
  { value: 'extension', label: 'Extension' },
];

export const REGIONS = [
  { value: 'casablanca-settat', label: 'Casablanca-Settat' },
  { value: 'rabat-sale-kenitra', label: 'Rabat-Salé-Kénitra' },
  { value: 'tanger-tetouan', label: 'Tanger-Tétouan-Al Hoceima' },
  { value: 'fes-meknes', label: 'Fès-Meknès' },
  { value: 'marrakech-safi', label: 'Marrakech-Safi' },
  { value: 'souss-massa', label: 'Souss-Massa' },
  { value: 'oriental', label: "L'Oriental" },
  { value: 'beni-mellal', label: 'Béni Mellal-Khénifra' },
  { value: 'draa-tafilalet', label: 'Drâa-Tafilalet' },
  { value: 'guelmim', label: 'Guelmim-Oued Noun' },
  { value: 'laayoune', label: 'Laâyoune-Sakia El Hamra' },
  { value: 'dakhla', label: 'Dakhla-Oued Ed-Dahab' },
];

export const PROVINCES = {
  'casablanca-settat': [
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'mohammedia', label: 'Mohammedia' },
    { value: 'settat', label: 'Settat' },
  ],
  'rabat-sale-kenitra': [
    { value: 'rabat', label: 'Rabat' },
    { value: 'sale', label: 'Salé' },
    { value: 'kenitra', label: 'Kénitra' },
  ],
  'tanger-tetouan': [
    { value: 'tanger', label: 'Tanger' },
    { value: 'tetouan', label: 'Tétouan' },
  ],
  'fes-meknes': [
    { value: 'fes', label: 'Fès' },
    { value: 'meknes', label: 'Meknès' },
  ],
  'marrakech-safi': [
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'safi', label: 'Safi' },
  ],
  'souss-massa': [
    { value: 'agadir', label: 'Agadir' },
    { value: 'inezgane', label: 'Inezgane' },
  ],
  oriental: [
    { value: 'oujda', label: 'Oujda' },
    { value: 'nador', label: 'Nador' },
  ],
  'beni-mellal': [
    { value: 'beni-mellal', label: 'Béni Mellal' },
    { value: 'khouribga', label: 'Khouribga' },
  ],
  'draa-tafilalet': [
    { value: 'errachidia', label: 'Errachidia' },
    { value: 'ouarzazate', label: 'Ouarzazate' },
  ],
  guelmim: [
    { value: 'guelmim', label: 'Guelmim' },
    { value: 'tan-tan', label: 'Tan-Tan' },
  ],
  laayoune: [
    { value: 'laayoune', label: 'Laâyoune' },
  ],
  dakhla: [
    { value: 'dakhla', label: 'Dakhla' },
  ],
};

export const SECTORS = [
  { value: 'industrie', label: 'Industrie' },
  { value: 'tourisme', label: 'Tourisme' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'services', label: 'Services' },
  { value: 'technologie', label: 'Technologie & Innovation' },
  { value: 'energie', label: 'Énergie renouvelable' },
  { value: 'sante', label: 'Santé' },
  { value: 'logistique', label: 'Logistique' },
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'education', label: 'Éducation' },
];

export const NATIONALITIES = [
  { value: 'ma', label: 'Marocaine' },
  { value: 'fr', label: 'Française' },
  { value: 'es', label: 'Espagnole' },
  { value: 'de', label: 'Allemande' },
  { value: 'us', label: 'Américaine' },
  { value: 'ae', label: 'Émiratie' },
  { value: 'sa', label: 'Saoudienne' },
  { value: 'cn', label: 'Chinoise' },
  { value: 'other', label: 'Autre' },
];

export const DEFAULT_INVESTOR_DATA = {
  investorType: 'morale',
  nationality: 'ma',
  companyType: 'sarl',
  region: 'casablanca-settat',
  province: 'casablanca',
  sector: 'industrie',
  projectType: 'creation',
  budget: 5000000,
  employeesNumber: 25,
  needLand: true,
  needConstruction: true,
  environmentalImpact: false,
  importActivity: false,
  exportActivity: true,
  industrialZone: true,
  tourismProject: false,
  agriculturalProject: false,
  foodActivity: false,
  medicalActivity: false,
  energyProject: false,
  needWater: true,
  needElectricity: true,
  needGas: false,
  nearPort: false,
  nearAirport: true,
  innovationProject: false,
  digitalProject: false,
  researchProject: false,
  womenEntrepreneurship: false,
  youthEntrepreneurship: false,
  foreignInvestment: false,
  publicPrivatePartnership: false,
  specialEconomicZone: false,
  greenProject: false,
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};
