import { STEP_STATUS } from './constants';

const SECTOR_MULTIPLIERS = {
  industrie: { duration: 1.2, cost: 1.3 },
  tourisme: { duration: 1.4, cost: 1.5 },
  agriculture: { duration: 1.0, cost: 0.9 },
  services: { duration: 0.8, cost: 0.7 },
  technologie: { duration: 0.9, cost: 1.1 },
  energie: { duration: 1.5, cost: 1.8 },
  sante: { duration: 1.3, cost: 1.4 },
  logistique: { duration: 1.1, cost: 1.2 },
  immobilier: { duration: 1.6, cost: 2.0 },
  education: { duration: 1.0, cost: 0.8 },
};

const REGION_MULTIPLIERS = {
  'casablanca-settat': { duration: 0.9, cost: 1.2 },
  'rabat-sale-kenitra': { duration: 0.95, cost: 1.1 },
  'tanger-tetouan': { duration: 1.0, cost: 1.0 },
  'fes-meknes': { duration: 1.05, cost: 0.95 },
  'marrakech-safi': { duration: 1.1, cost: 1.05 },
  'souss-massa': { duration: 1.0, cost: 0.9 },
  oriental: { duration: 1.1, cost: 0.85 },
  'beni-mellal': { duration: 1.15, cost: 0.8 },
  'draa-tafilalet': { duration: 1.2, cost: 0.75 },
  guelmim: { duration: 1.25, cost: 0.7 },
  laayoune: { duration: 1.3, cost: 0.65 },
  dakhla: { duration: 1.35, cost: 0.6 },
};

const formatDurationLabel = (days, step) => {
  if (step.key === 'exploitation') return 'En continu';
  if (step.key === 'realisation') return 'Variable';
  if (step.key === 'autorisations') return days > 25 ? '20-35 jours' : '15-30 jours';
  if (step.key === 'financement') return days > 35 ? '30-50 jours' : '15-45 jours';
  if (days < 7) return `${days} jour${days > 1 ? 's' : ''}`;
  return `${days} jours`;
};

const formatCostLabel = (cost, step) => {
  if (step.key === 'realisation') return 'Selon projet';
  if (step.key === 'exploitation') return "Selon l'activité";
  if (step.key === 'autorisations' || step.key === 'financement') return 'Variable';
  if (cost === 0) return '0 DH';
  return `${cost.toLocaleString('fr-MA')} DH`;
};

const computeMultiplier = (investorData) => {
  const sector = SECTOR_MULTIPLIERS[investorData.sector] || { duration: 1, cost: 1 };
  const region = REGION_MULTIPLIERS[investorData.region] || { duration: 1, cost: 1 };
  const budgetFactor =
    investorData.budget > 20000000 ? 1.3 : investorData.budget > 10000000 ? 1.15 : 1;
  const employeeFactor =
    investorData.employeesNumber > 100 ? 1.2 : investorData.employeesNumber > 50 ? 1.1 : 1;

  return {
    duration: sector.duration * region.duration * employeeFactor,
    cost: sector.cost * region.cost * budgetFactor,
  };
};

const applyStepModifiers = (step, investorData) => {
  const modified = { ...step };
  const multiplier = computeMultiplier(investorData);

  modified.duration = Math.round(step.baseDuration * multiplier.duration);
  modified.cost = Math.round(step.baseCost * multiplier.cost);
  modified.durationLabel = formatDurationLabel(modified.duration, step);
  modified.costLabel = formatCostLabel(modified.cost, step);
  modified.requiredDocuments = [...step.requiredDocuments];
  modified.generatedDocuments = [...(step.generatedDocuments || [])];
  modified.futureUse = [...(step.futureUse || [])];
  modified.warnings = [...(step.warnings || [])];
  modified.visible = true;

  if (investorData.environmentalImpact && step.key === 'autorisations') {
    modified.duration += 20;
    modified.durationLabel = '20-40 jours';
    modified.requiredDocuments.push("Étude d'impact environnemental complète (EIE)");
    modified.warnings.push('Impact environnemental significatif — audit obligatoire');
    modified.status = STEP_STATUS.ATTENTION;
  }

  if (investorData.foreignInvestment && step.key === 'creation') {
    modified.requiredDocuments.push('Attestation de change (Office des Changes)');
    modified.requiredDocuments.push("Autorisation d'investissement étranger (CRI)");
    modified.duration += 2;
    modified.durationLabel = formatDurationLabel(modified.duration, step);
  }

  if (investorData.importActivity && step.key === 'autorisations') {
    modified.requiredDocuments.push("Licence d'importation");
  }

  if (investorData.exportActivity && step.key === 'autorisations') {
    modified.requiredDocuments.push("Registre d'exportateur");
  }

  if (investorData.medicalActivity && step.key === 'autorisations') {
    modified.requiredDocuments.push('Agrément Ministère de la Santé');
    modified.durationLabel = '20-40 jours';
  }

  if (investorData.energyProject && step.key === 'autorisations') {
    modified.requiredDocuments.push('Autorisation ONEE / MASEN');
    modified.durationLabel = '25-45 jours';
  }

  if (investorData.foodActivity && step.key === 'autorisations') {
    modified.requiredDocuments.push('Agrément ONSSA');
  }

  if (investorData.needLand && step.key === 'realisation') {
    modified.requiredDocuments.push('Certificat de propriété foncière');
    modified.requiredDocuments.push('Permis de lotir');
  }

  if (investorData.needConstruction && step.key === 'realisation') {
    modified.requiredDocuments.push('Permis de construire');
    modified.generatedDocuments.push('Certificat de conformité des travaux');
  }

  if (investorData.projectType === 'extension' && step.key === 'creation') {
    modified.title = 'Modification statutaire';
    modified.subtitle = "Extension d'activité existante";
    modified.duration = Math.max(2, Math.round(modified.duration * 0.6));
    modified.durationLabel = formatDurationLabel(modified.duration, step);
  }

  if (investorData.publicPrivatePartnership && step.key === 'financement') {
    modified.futureUse = [...modified.futureUse, 'Garanties État via DGCT'];
  }

  if (investorData.greenProject && step.key === 'financement') {
    modified.futureUse = [...modified.futureUse, 'Subventions ADEREE'];
  }

  if (investorData.specialEconomicZone && step.key === 'autorisations') {
    modified.durationLabel = '10-20 jours';
  }

  if (investorData.budget < 1000000 && step.key === 'financement') {
    modified.warnings.push('Budget modeste — explorez le microcrédit Tamwil');
  }

  return modified;
};

const assignStepStatuses = (steps) =>
  steps.map((step) => ({
    ...step,
    status: step.status === STEP_STATUS.ATTENTION ? STEP_STATUS.ATTENTION : STEP_STATUS.PENDING,
  }));

export const generateWorkflow = (baseSteps, investorData) => {
  const modifiedSteps = baseSteps.map((step) => applyStepModifiers(step, investorData));
  const withStatuses = assignStepStatuses(modifiedSteps);

  const visibleSteps = withStatuses.filter((s) => s.visible);
  const currentStep = visibleSteps[0];
  const completedSteps = visibleSteps.filter((s) => s.status === STEP_STATUS.COMPLETED);
  const totalDuration = visibleSteps.reduce((sum, s) => sum + s.duration, 0);
  const totalCost = visibleSteps.reduce((sum, s) => sum + s.cost, 0);

  const recommendations = [];
  const globalWarnings = [];

  if (investorData.innovationProject || investorData.digitalProject) {
    recommendations.push('Profitez du statut entreprise innovante pour des exonérations fiscales.');
  }
  if (investorData.industrialZone) {
    recommendations.push('Zone industrielle — infrastructure et fiscalité avantageuses.');
  }
  if (investorData.nearPort) {
    recommendations.push('Proximité portuaire — idéal pour export/import.');
  }
  if (investorData.environmentalImpact) {
    globalWarnings.push("Étude d'impact environnemental requise avant les travaux.");
  }

  return {
    steps: withStatuses,
    currentStep,
    completedSteps,
    selectedStep: currentStep,
    totalDuration,
    totalCost,
    recommendations,
    globalWarnings,
    progress: Math.round((completedSteps.length / visibleSteps.length) * 100),
  };
};

export const getNextStep = (steps, currentStepId) => {
  const visible = steps.filter((s) => s.visible);
  const idx = visible.findIndex((s) => s.id === currentStepId);
  return idx >= 0 && idx < visible.length - 1 ? visible[idx + 1] : null;
};

export const getPreviousStep = (steps, currentStepId) => {
  const visible = steps.filter((s) => s.visible);
  const idx = visible.findIndex((s) => s.id === currentStepId);
  return idx > 0 ? visible[idx - 1] : null;
};
