import { compare, hash } from "bcryptjs"

const encrypt = async (text_plain: string): Promise<string> => {
  return await hash(text_plain, 10)
}

const verified = async (pass: string, passHash: string): Promise<boolean> => {
  return await compare(pass, passHash)
}

export {
  encrypt,
  verified
}