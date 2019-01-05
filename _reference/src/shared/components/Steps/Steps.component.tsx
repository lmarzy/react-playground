import * as React from 'react';
import { Step } from './Step/Step.component';

interface StepsProps {
  stepComplete: number;
}

export const Steps = ({ stepComplete }: StepsProps) => {
  const steps = [
    {
      step: 1,
      title: '1. About you',
      detail: 'Tell us about you and your money',
      active: false,
    },
    {
      step: 2,
      title: '2. Your budget',
      detail: 'Lets get your budget worked out',
      active: false,
    },
    {
      step: 3,
      title: '3. Breathing space',
      detail: 'Time to set up that breathing space',
      active: false,
    },
  ];

  return (
    <ol className="u-mb-l">
      {steps.map((step, i) => (
        <Step key={step.step} title={step.title} detail={step.detail} active={i === stepComplete} />
      ))}
    </ol>
  );
};
