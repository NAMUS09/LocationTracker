interface LoginFields {
  labelText: string;
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
}

const loginFields: LoginFields[] = [
  {
    labelText: "Email address",
    id: "email",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Password",
  },
];

export default loginFields;
