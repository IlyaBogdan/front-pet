import { IUser } from "./IUser";

export interface IMessage {
    user?: IUser;
    content: string;
    // Добавь другие поля, если необходимо
}