import * as yup from "yup";
export const invConfValidationSchema = yup.object().shape({
  sharesPerBlock: yup.string().required("Required field"),
  // type: yup.object().nullable().required("form:error-type-required"),
});
