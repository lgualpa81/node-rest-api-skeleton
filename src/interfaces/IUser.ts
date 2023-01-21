import { IAuth } from "./IAuth";

export interface IUser extends IAuth {
    name: string,
    description: string,
}