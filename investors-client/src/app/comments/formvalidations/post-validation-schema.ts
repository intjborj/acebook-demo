import * as yup from "yup";
export const commentValidationSchema = yup.object().shape({
  message: yup.string().required("Required field"),
  // type: yup.object().nullable().required("form:error-type-required"),
});
