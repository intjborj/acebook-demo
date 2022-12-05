import * as yup from 'yup';

const defaultAccValidation = {
  firstName: yup.string().required('Required field'),
  lastName: yup.string().required('Required field'),
  username: yup.string().required('Required field')
};

export const accValidationInvestorSchema = yup.object().shape({
  ...defaultAccValidation,
  password: yup
    .string()
    .required('Password is mandatory')
    .min(5, 'Password must be at 5 char long'),
  confPassword: yup
    .string()
    .required('Password is mandatory')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  // type: yup.object().nullable().required("form:error-type-required"),
});

export const accValidationPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is mandatory')
    .min(5, 'Password must be at 5 char long'),
  confPassword: yup
    .string()
    .required('Password is mandatory')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  // type: yup.object().nullable().required("form:error-type-required"),
});


export const accValidationSchemaUpdate = yup.object().shape({
  ...defaultAccValidation,
  password:
  
  yup.string().notRequired().test('password', 'Password must be at 5 char long', function(value) {
    if (!!value) {
      const schema = yup.string().min(5);
      return schema.isValidSync(value);
    }
    return true;
  }),

  // confPassword:
  
  // yup.string().test('password', 'Passwords does not match', function(value) {
  // // yup.string().notRequired().test('password', 'Passwords does not match', function(value) {
  //   if (!!value) {
  //     const schema = yup.string().oneOf([yup.ref('password')]);
  //     return schema.isValidSync(value);
  //   }
  //   return true;
  // })

  
  // yup.string().when('password', {
  //   is: (v : any) => v < 100000,
  //   then: yup.string()
  //   .min(5, 'Password must be at 5 char long'),
  //   otherwise: yup.string(),
  // }),
  
  // yup
  //   .string()
  //   .min(5, 'Password must be at 5 char long'),


//   confPassword: yup.string().when('password',{
//     is:(password : any) => password.length > 0,
//     then: yup.string()
//     .min(5, 'Password must be at 5 char long')
//     .oneOf([yup.ref('password')], 'Passwords does not match')
// })
  


  // yup.string().when('password', {
  //   is: (v : any) => v < 100000,
  //   then: yup.string()
  //   .oneOf([yup.ref('password')], 'Passwords does not match'),
  //   otherwise: yup.string(),
  // })
  
  // yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'Passwords does not match'),
  // type: yup.object().nullable().required("form:error-type-required"),
});


