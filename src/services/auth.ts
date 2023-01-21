import { omit } from 'lodash';
import { HydratedDocument } from 'mongoose';

import { IAuth, IUser } from '../interfaces'
import UserModel from '../model/user'
import { encrypt, verified, generateToken, ErrorException, ErrorCode } from '../utils'


const registerUser = async ({ email, password, name }: IUser) => {

  const user = await UserModel.findOne({ email: email.toLowerCase() })
  if (user) new ErrorException(ErrorCode.DuplicateEntityError, 'Account already exists')

  const passHash: string = await encrypt(password)
  const createUser: HydratedDocument<IUser> = await UserModel.create({
    email: email.toLowerCase(),
    password: passHash,
    name
  })

  return createUser
}

const loginUser = async ({ email, password }: IAuth) => {

  const user = await UserModel.findOne({ email: email.toLowerCase() }).select('email password name')

  if (!user) return new ErrorException(ErrorCode.NotFound, 'Invalid credentials (email)')
  if (!await verified(password, user.password)) return new ErrorException(ErrorCode.NotFound, 'Invalid credentials (password)')

  const token: string = generateToken(user.email)

  return {
    token,
    user: omit(user.toObject(), 'password'),
  }
}

export { registerUser, loginUser }