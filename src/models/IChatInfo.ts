import { IChat } from "./IChat";
import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IMessageInfo extends IMessage {
    type?: 'in' | 'out'
}

export interface IChatInfo extends IChat {
    title?: string;
    avatar?: string;
    online: number[],
    typing?: IUser[];
    shortName?: string;
    messages: IMessageInfo[]
}
