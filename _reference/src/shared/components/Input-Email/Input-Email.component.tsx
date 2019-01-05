import * as React from 'react';
import { Input, Alert } from '..';

interface InputPasswordProps {
  value: string;
  valid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputEmail = ({ value, valid, onChange }: InputPasswordProps) => (
  <React.Fragment>
    <div className="u-mb-t">
      <Input type="email" label="Email" id="email" value={value} onChange={onChange} />
    </div>

    {!valid && (
      <div className="u-mb-t">
        <Alert id="emailValidation" arrow="center" error>
          <p>Please enter a valid email</p>
        </Alert>
      </div>
    )}
  </React.Fragment>
);
