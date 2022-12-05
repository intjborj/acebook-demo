import * as yup from 'yup';

const defaultAccValidation = {
  firstName: yup.string().required('Required field'),
  lastName: yup.string().required('Required field'),
  username: yup.string().required('Required field'),
  contact: yup.string().required('Required field'),
  department: yup.array().of(yup.object()).required('Required field'),
  departmentOnDuty: yup.object().required('Required field'),
};

export const accValidationSchema = yup.object().shape({
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
 
});


export const accInvestorsValidationSchema = yup.object().shape({
  blocks: yup.number().required('Required field'),
  // firstName: yup.string().required('Required field'),
  // lastName: yup.string().required('Required field'),
  investorId: yup.string().required('Required field'),
});



