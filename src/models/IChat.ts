import { IUser } from "./IUser";

export interface IChat {
    type: number;
    users: IUser[];
}