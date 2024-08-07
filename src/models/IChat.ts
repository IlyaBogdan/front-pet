import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export enum EChatTypes {
    /**
     * Dialog between 2 users
     */
    DIALOG = 0,

    /**
     * Chat with many users
     */
    CONFERENCE = 1
};

export interface IChat {

    /**
     * Chat ID
     * @example 43
     */
    id: number;

    /**
     * Chat type
     * @example EChatTypes.DIALOG
     */
    type: EChatTypes;

    /**
     * Chat users
     */
    users: IUser[];

    /**
     * Messages in chat
     */
    messages: IMessage[];
};
