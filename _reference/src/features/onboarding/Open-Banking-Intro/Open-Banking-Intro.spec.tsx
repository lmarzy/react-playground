import {
  initialState,
  onAccordionItemToggle,
  onShowJointAccountModal,
  onNoPartnerSelected,
} from './Open-Banking-Intro';
import { OnboardingRoutes } from '../onboarding.routes';

describe('Open Banking Intro Container', () => {
  const componentState = initialState;

  describe('Initial State', () => {
    it('Accordion items should be false', () => {
      expect(componentState.accordion.secure.isActive).toBe(false);
      expect(componentState.accordion.fast.isActive).toBe(false);
      expect(componentState.accordion.private.isActive).toBe(false);
      expect(componentState.accordion.regulated.isActive).toBe(false);
    });
    it('showJointAccountModal should be false', () => {
      expect(componentState.showJointAccountModal).toBe(false);
    });
  });

  describe('State changes', () => {
    it('Accordion item secure should be true when clicked', () => {
      const result = onAccordionItemToggle('secure', componentState);
      expect(result.accordion.secure.isActive).toBe(true);
    });
    it('Accordion item fast should be true when clicked', () => {
      const result = onAccordionItemToggle('fast', componentState);
      expect(result.accordion.secure.isActive).toBe(true);
    });
    it('Accordion item private should be true when clicked', () => {
      const result = onAccordionItemToggle('private', componentState);
      expect(result.accordion.secure.isActive).toBe(true);
    });
    it('Accordion item regulated should be true when clicked', () => {
      const result = onAccordionItemToggle('regulated', componentState);
      expect(result.accordion.secure.isActive).toBe(true);
    });
    it('Should open modal if partner is true', () => {
      const result = onShowJointAccountModal(componentState);
      expect(result.showJointAccountModal).toBe(true);
    });
    it('If no partner is selected => redirect to open-banking/transferring-you page', () => {
      const historyApiMock = jest.fn(() => ({ push: jest.fn() }))();
      onNoPartnerSelected(historyApiMock);
      expect(historyApiMock.push).toBeCalledWith(OnboardingRoutes.OpenBankingTransferringYou);
    });
  });
});
