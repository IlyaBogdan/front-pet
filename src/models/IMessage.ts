import { IUser } from "./IUser";

export interface IMessage {
    user?: IUser;
    content: string;
    date: Date
}