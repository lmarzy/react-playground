import validate from './validation';

const validEmail = 'test@test.com';
const invalidEmail = 'test@';

const validTel = '07900000000';
const invalidTel = '123';

const validPassword = 'abcdefghi';
const passwordTooShort = 'abc';
const passwordTooLong =
  'CtOae13DJOCF3x0s4YVrR71AdghkDdoapUWtmz4R0aGRC9MdqOuQlUsoA1qlUgofuf93VXrdNmE4Qs07LTa2rp7sA7mXVQuxrvOzA61Km1GcgRpGI7XZLzZxyjDn4WB0VgynjHUCz5jA87mrRlJgm5TBgw2OuSwWdJcjSgPPAjZYv6KGEqkd1ESMlQegdibnD3xNToKqDIu0bCF7LoD6wmcpfXy6ENlcPtgCpzqYbyerdPvgmlCuIAjR2Ue2ygi8';

describe('<Validation />', () => {
  it('should return true if email is valid', () => {
    expect(validate('email', validEmail)).toBe(true);
  });
  it('should return false if email is invalid', () => {
    expect(validate('email', invalidEmail)).toBe(false);
  });
  it('should return true if telNo is valid', () => {
    expect(validate('telephoneNumber', validTel)).toBe(true);
  });
  it('should return false if email is invalid', () => {
    expect(validate('telephoneNumber', invalidTel)).toBe(false);
  });
  it('should return true if password is valid', () => {
    expect(validate('password', validPassword)).toBe(true);
  });
  it('should return false if password is too short', () => {
    expect(validate('password', passwordTooShort)).toBe(false);
  });
  it('should return false if password is too long', () => {
    expect(validate('password', passwordTooLong)).toBe(false);
  });
});
