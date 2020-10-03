import mongoose from 'mongoose'

interface UserProps {
  email: string
  password: string
}

interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build({ email, password }: UserProps): UserDoc
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.build = ({ email, password }: UserProps) => {
  return new User({ email, password })
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
