const validate = (inputName: string, value: string) => {
  let inputValid;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telNoRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

  switch (inputName) {
    case 'email':
      inputValid = emailRegex.test(value);
      break;
    case 'password':
      const length = value.length;
      inputValid = length > 7 && length < 256 ? true : false;
      break;
    case 'telephoneNumber':
      inputValid = telNoRegex.test(value);
      break;
  }

  return inputValid;
};

export default validate;
