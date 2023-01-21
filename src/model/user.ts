import { Schema, Types, model, Model } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const UserSchema = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select:false,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    default: '',
    type: String,
  }
},{
  versionKey: false,
  timestamps: true,
})

const UserModel = model<IUser>('users', UserSchema)
export default UserModel