import { getMockSteps } from '../data/mockSteps';
import { generateWorkflow } from '../utils/workflowEngine';

const simulateDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWorkflow = async (investorData) => {
  await simulateDelay();
  const baseSteps = getMockSteps();
  return generateWorkflow(baseSteps, investorData);
};

export const submitInvestorData = async (investorData) => {
  await simulateDelay(600);
  const workflow = await fetchWorkflow(investorData);
  return { success: true, workflow };
};
