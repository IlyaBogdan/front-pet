import { IUser } from "./IUser";

export interface IMessage {
    /**
     * Message ID
     * @example 1
     */
    id: number;

    /**
     * Author of message
     */
    user?: IUser;

    /**
     * Content of message
     * @example 'Hello'
     */
    message: string;

    /**
     * Send date
     * @example '2024-06-08T12:33:51'
     */
    date: Date | string
};
