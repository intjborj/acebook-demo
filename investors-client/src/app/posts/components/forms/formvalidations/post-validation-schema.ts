import * as yup from "yup";
export const postValidationSchema = yup.object().shape({
  content: yup.string().required("Required field"),
  // type: yup.object().nullable().required("form:error-type-required"),
});
