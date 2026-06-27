import { useInvestment } from '../contexts/InvestmentContext';

export function useInvestorForm() {
  const { investorData, updateInvestorData, validationErrors, setValidationErrors, isSubmitted } = useInvestment();

  return {
    investorData,
    updateInvestorData,
    validationErrors,
    setValidationErrors,
    isSubmitted,
  };
}
