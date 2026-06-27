import { z } from 'zod';

export const investorSchema = z.object({
  investorType: z.enum(['physique', 'morale'], {
    required_error: 'Le type d\'investisseur est requis',
  }),
  nationality: z.string().min(1, 'La nationalité est requise'),
  companyType: z.enum(['sarl', 'sa', 'sas'], {
    required_error: 'Le type de société est requis',
  }),
  region: z.string().min(1, 'La région est requise'),
  province: z.string().min(1, 'La province est requise'),
  sector: z.string().min(1, 'Le secteur est requis'),
  projectType: z.enum(['creation', 'extension'], {
    required_error: 'Le type de projet est requis',
  }),
  budget: z
    .number({ invalid_type_error: 'Le budget doit être un nombre' })
    .min(100000, 'Le budget minimum est de 100 000 MAD'),
  employeesNumber: z
    .number({ invalid_type_error: 'Le nombre d\'employés doit être un nombre' })
    .min(1, 'Au moins 1 employé requis')
    .max(10000, 'Maximum 10 000 employés'),
  needLand: z.boolean(),
  needConstruction: z.boolean(),
  environmentalImpact: z.boolean(),
  importActivity: z.boolean(),
  exportActivity: z.boolean(),
  industrialZone: z.boolean(),
  tourismProject: z.boolean(),
  agriculturalProject: z.boolean(),
  foodActivity: z.boolean(),
  medicalActivity: z.boolean(),
  energyProject: z.boolean(),
  needWater: z.boolean(),
  needElectricity: z.boolean(),
  needGas: z.boolean(),
  nearPort: z.boolean(),
  nearAirport: z.boolean(),
  innovationProject: z.boolean(),
  digitalProject: z.boolean(),
  researchProject: z.boolean(),
  womenEntrepreneurship: z.boolean(),
  youthEntrepreneurship: z.boolean(),
  foreignInvestment: z.boolean(),
  publicPrivatePartnership: z.boolean(),
  specialEconomicZone: z.boolean(),
  greenProject: z.boolean(),
});

export const FORM_SECTIONS = [
  { id: 'general', label: 'Informations générales', fields: 9 },
  { id: 'characteristics', label: 'Caractéristiques du projet', fields: 16 },
  { id: 'budget', label: 'Budget & Effectifs', fields: 2 },
];

export const getFormProgress = (values, errors) => {
  const totalFields = FORM_SECTIONS.reduce((sum, s) => sum + s.fields, 0);
  const filledFields = Object.entries(values).filter(([, v]) => {
    if (typeof v === 'boolean') return true;
    return v !== '' && v !== null && v !== undefined;
  }).length;
  const errorCount = Object.keys(errors).length;
  const progress = Math.round((filledFields / totalFields) * 100);
  return { progress, filledFields, totalFields, errorCount, isValid: errorCount === 0 };
};
