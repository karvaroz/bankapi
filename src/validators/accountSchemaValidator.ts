import * as yup from 'yup'
import { AccountType } from '../interfaces/enum/accountEnum'

const CreateAccountSchema = yup.object({
  type: yup.string().trim().required().oneOf(Object.values(AccountType))
})

const ValidationSchema = {
  CreateAccountSchema
}

export default ValidationSchema
