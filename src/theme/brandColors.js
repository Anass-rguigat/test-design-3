/**
 * Palette officielle inspirée de micepp.gov.ma
 * Vert institutionnel MICEPP : #3B914B
 */
export const MICEPP = {
  primary: '#3B914B',
  primaryDark: '#007038',
  primaryDarker: '#255A2F',
  primaryLight: '#33D684',
  primaryBright: '#00BA5C',
  primaryMuted: '#265C30',
  primarySurface: '#F0FDF4',
  primarySurfaceAlt: '#E8F5E9',
  primaryBadge: '#C8E6C9',

  background: '#F4F5F7',
  backgroundAlt: '#F2F4F7',
  paper: '#FFFFFF',

  textPrimary: '#171B17',
  textSecondary: '#344054',

  accentOrange: '#CF5300',
  accentGold: '#FF6803',

  gradientPrimary: 'linear-gradient(135deg, #3B914B 0%, #007038 100%)',
  gradientSoft: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
};

export const STEP_THEMES = {
  creation: {
    main: MICEPP.primary,
    light: MICEPP.primarySurface,
    badge: MICEPP.primaryBadge,
  },
  immatriculation: {
    main: MICEPP.primaryDark,
    light: '#E6F4EA',
    badge: '#A5D6A7',
  },
  autorisations: {
    main: MICEPP.primaryBright,
    light: '#ECFDF3',
    badge: '#86EFAC',
  },
  financement: {
    main: MICEPP.primaryDarker,
    light: '#EDF7EF',
    badge: '#81C784',
  },
  realisation: {
    main: MICEPP.primaryMuted,
    light: '#F1F8F2',
    badge: '#A5D6A7',
  },
  exploitation: {
    main: '#1B5E20',
    light: MICEPP.primarySurfaceAlt,
    badge: MICEPP.primaryBadge,
  },
};

export default MICEPP;
