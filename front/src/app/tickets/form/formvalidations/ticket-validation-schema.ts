import * as yup from 'yup';

export const ticketValidationSchema = yup.object().shape({
  description: yup.string().required('Required field'),
  type: yup.object().required('Required field'),
  // dateNeeded: yup.string().required('Required field'),
  dateRequested: yup.string().required('Required field'),
  subject: yup.string().required('Required field'),
  // location: yup.string().required('Required field'),
  createdBy:yup.object().required('Required field'),
  requestedBy: yup.object().required('Required field'),
  serviceDepartment: yup.object().required('Required field'),
  requestingDepartment: yup.object().required('Required field'),  
});





