import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { DEFAULT_INVESTOR_DATA } from '../utils/constants';
import { getMockSteps } from '../data/mockSteps';
import { generateWorkflow } from '../utils/workflowEngine';

const InvestmentContext = createContext(null);

const initialWorkflow = generateWorkflow(getMockSteps(), DEFAULT_INVESTOR_DATA);

const initialState = {
  investorData: DEFAULT_INVESTOR_DATA,
  workflow: initialWorkflow,
  selectedStepId: initialWorkflow.currentStep?.id ?? 1,
  isLoading: false,
  isSubmitted: false,
  validationErrors: {},
};

function investmentReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INVESTOR_DATA': {
      const investorData = { ...state.investorData, ...action.payload };
      const workflow = generateWorkflow(getMockSteps(), investorData);
      const selectedStillVisible = workflow.steps.find((s) => s.id === state.selectedStepId)?.visible;
      return {
        ...state,
        investorData,
        workflow,
        selectedStepId: selectedStillVisible
          ? state.selectedStepId
          : workflow.currentStep?.id ?? 1,
      };
    }
    case 'SELECT_STEP':
      return { ...state, selectedStepId: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SUBMITTED':
      return { ...state, isSubmitted: action.payload };
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };
    case 'RESET':
      return {
        ...initialState,
        workflow: generateWorkflow(getMockSteps(), DEFAULT_INVESTOR_DATA),
      };
    default:
      return state;
  }
}

export function InvestmentProvider({ children }) {
  const [state, dispatch] = useReducer(investmentReducer, initialState);

  const updateInvestorData = useCallback((data) => {
    dispatch({ type: 'UPDATE_INVESTOR_DATA', payload: data });
  }, []);

  const selectStep = useCallback((stepId) => {
    dispatch({ type: 'SELECT_STEP', payload: stepId });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setSubmitted = useCallback((submitted) => {
    dispatch({ type: 'SET_SUBMITTED', payload: submitted });
  }, []);

  const setValidationErrors = useCallback((errors) => {
    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const selectedStep = useMemo(
    () => state.workflow.steps.find((s) => s.id === state.selectedStepId) ?? state.workflow.currentStep,
    [state.workflow.steps, state.selectedStepId, state.workflow.currentStep]
  );

  const value = useMemo(
    () => ({
      ...state,
      selectedStep,
      updateInvestorData,
      selectStep,
      setLoading,
      setSubmitted,
      setValidationErrors,
      reset,
    }),
    [state, selectedStep, updateInvestorData, selectStep, setLoading, setSubmitted, setValidationErrors, reset]
  );

  return <InvestmentContext.Provider value={value}>{children}</InvestmentContext.Provider>;
}

export function useInvestment() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within InvestmentProvider');
  }
  return context;
}
