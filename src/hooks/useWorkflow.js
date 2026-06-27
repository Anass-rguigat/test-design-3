import { useInvestment } from '../contexts/InvestmentContext';

export function useWorkflow() {
  const { workflow, selectedStep, selectedStepId, selectStep } = useInvestment();

  return {
    workflow,
    steps: workflow.steps,
    selectedStep,
    selectedStepId,
    selectStep,
    currentStep: workflow.currentStep,
    completedSteps: workflow.completedSteps,
    totalDuration: workflow.totalDuration,
    totalCost: workflow.totalCost,
    progress: workflow.progress,
    recommendations: workflow.recommendations,
    globalWarnings: workflow.globalWarnings,
  };
}
