export type OnboardingCheckpoint = 'Start' | 'LivesWith' | 'Circumstances';

export interface OnboardingStateModel {
  member: {
    firstName: string;
    lastName: string;
  };
  checkpoint: OnboardingCheckpoint;
}
