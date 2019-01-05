import { OnboardingRoutes } from './onboarding';

export const CheckPointToRoutesMap = new Map<string, string>([
  ['Start', OnboardingRoutes.Home],
  ['LivesWith', OnboardingRoutes.LivesWith],
  ['Circumstances', OnboardingRoutes.PersonalCircumstanceAffecting],
]);
