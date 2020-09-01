import * as yup from "yup";

export const UserProfileSchema = yup.object({
  userName: yup.string().required(),
  email: yup.string().required().email(),
});
