import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth";
import { ErrorException } from "../utils";

const register = async ({ body }: Request, res: Response): Promise<void> => {
  const svc_user = await registerUser(body)
  res.send(svc_user)
}

const login = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  const svc_user = await loginUser({ email, password })

  if (svc_user instanceof ErrorException) {
    return res.status(svc_user.status).json(svc_user.metaData || '')
  }
  res.send(svc_user)
}

const authenticated = async ({ body }: Request, res: Response) => {
  res.json('Hello authenticated user')
}

export { login, register, authenticated }