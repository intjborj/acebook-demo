import * as yup from "yup";
export const tagValidationSchema = yup.object().shape({
  deptName: yup.string().required("Required field"),
  // type: yup.object().nullable().required("form:error-type-required"),
});
