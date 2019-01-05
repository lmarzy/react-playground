import { initialState, LoginComponentState, onInputChange, onLoginFailure } from './Login';

describe('Login component', () => {
  let originalComponentState: LoginComponentState;

  beforeEach(() => {
    originalComponentState = { ...initialState };
  });

  describe('Initial state', () => {
    it('Email value should be empty, valid and touched should be false', () => {
      const stateStub = { ...originalComponentState };
      const expectedValue = '';
      expect(stateStub.inputs.email.value).toBe(expectedValue);
      expect(stateStub.inputs.password.valid).toBe(true);
    });
    it('Password value should be empty, valid and touched should be false', () => {
      const stateStub = { ...originalComponentState };
      const expectedValue = '';
      expect(stateStub.inputs.password.value).toBe(expectedValue);
      expect(stateStub.inputs.password.valid).toBe(true);
    });
    it('loginDetailsNotRecognised should be false', () => {
      const stateStub = { ...originalComponentState };
      expect(stateStub.loginDetailsNotRecognised).toBe(false);
    });
  });

  describe('State changes', () => {
    it('Email value should be updated and touched set to true', () => {
      const stateStub = { ...originalComponentState };
      const email = 'test@test.com';
      const result = onInputChange('email', email, stateStub);
      expect(result.inputs.email.value).toBe(email);
    });
    it('Password value should be updated and touched set to true', () => {
      const stateStub = { ...originalComponentState };
      const password = 'pass123';
      const result = onInputChange('password', password, stateStub);
      expect(result.inputs.password.value).toBe(password);
    });
    it('loginDetailsNotRecognised if api returns 400 response', () => {
      const stateStub = { ...originalComponentState };
      const result = onLoginFailure(stateStub);
      expect(result.loginDetailsNotRecognised).toBe(true);
    });
  });
});
