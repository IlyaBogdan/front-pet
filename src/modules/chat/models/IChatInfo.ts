import { IUser } from "@/models/IUser";
import { IChat } from "./IChat";
import { IMessage } from "./IMessage";

/**
 * Represents extended message info for dialog
 */
export interface IMessageInfo extends IMessage {

    /**
     * Message direction (incomming or outcomming)
     * @example 'in'
     */
    type?: 'in' | 'out'
}

/**
 * Represents extended chat information for dialog
 */
export interface IChatInfo extends IChat {

    /**
     * Chat title
     * @example 'Chat with friends'
     */
    title: string;

    /**
     * Avatar URL on backend public folder
     * @example '/'
     */
    avatar: string;

    /**
     * List of online user`s ID 
     */
    online: number[],

    /**
     * List of typing users in dialog
     */
    typing: IUser[];

    /**
     * Short title of chat
     * @example 'Chat #1'
     */
    shortName?: string;

    /**
     * List of extended messages
     */
    messages: IMessageInfo[]
}
