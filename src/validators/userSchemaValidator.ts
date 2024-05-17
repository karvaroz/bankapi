import * as yup from 'yup'

const RegisterSchema = yup.object({
  username: yup.string().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
  firstname: yup.string().lowercase().trim().required(),
  lastname: yup.string().lowercase().trim().required(),
  email: yup.string().email().lowercase().trim().required()
})

const LoginSchema = yup.object({
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required()
})

const ValidationSchema = {
  RegisterSchema,
  LoginSchema
}

export default ValidationSchema
