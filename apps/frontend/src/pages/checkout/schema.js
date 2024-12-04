import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    paymentType: yup.string().required(),
  })
  .required();
