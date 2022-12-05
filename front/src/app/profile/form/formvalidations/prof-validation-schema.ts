import * as yup from 'yup';


export const profValidationSchema = yup.object().shape({
  // password: yup
  //   .string()
  //   .min(5, 'Password must be at 5 char long'),
  contact: yup.string().required('Required field'),
  confPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});


