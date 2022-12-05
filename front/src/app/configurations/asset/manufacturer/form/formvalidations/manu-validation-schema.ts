import * as yup from 'yup';

export const manuValidationSchema = yup.object().shape( {
  name: yup.string().required('Required field'),
});




