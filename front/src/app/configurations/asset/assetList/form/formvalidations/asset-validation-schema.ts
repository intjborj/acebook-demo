import * as yup from 'yup';

export const assetValidationSchema = yup.object().shape( {
  name: yup.string().required('Required field'),
  handlingDepartment: yup.array().of(yup.object()).required('Required field'),
});




