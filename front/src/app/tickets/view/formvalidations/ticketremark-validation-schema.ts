import * as yup from 'yup';

export const ticketRemarksValidationSchema = yup.object().shape({
  remarks: yup.string().required('Required field'),
});





