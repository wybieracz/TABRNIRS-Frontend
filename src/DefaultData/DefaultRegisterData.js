const defaultRegisterData = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  surname: "",
  pesel: "",
  hometown: "",
  streetAddress: "",
  postalCode: "",
};

const defaultValidationSet = {
  emailErr: true,
  passwordErr: true,
  confirmPasswordErr: true,
  nameErr: true,
  surnameErr: true,
  peselErr: true,
  hometownErr: true,
  streetAddressErr: true,
  postalCodeErr: true
}

export { defaultRegisterData, defaultValidationSet };
