import { IUser } from "@/models/IUser";
import { IBrokerMessagePayload } from "../message";

export type TSendMessageParams = IBrokerMessagePayload & {
    method: 'sendMessage',
    message: string,
};

export type TChatListParams = IBrokerMessagePayload & {
    user: IUser
};

export type TSetTypingParams = IBrokerMessagePayload & {
    method: 'setTyping',

};

export type TGetUsersParams = IBrokerMessagePayload & {
    user: IUser
};

export type TGetChatParams = IBrokerMessagePayload & {
    

};

export type TPullParams = IBrokerMessagePayload & {
    user: IUser
};

export type TGetOnlineUsersParams = IBrokerMessagePayload & {
    method: 'getOnlineUsers',

};

export type TCreateChatParams = IBrokerMessagePayload & {
    method: 'createChat',

};

export type TCreateUserParams = IBrokerMessagePayload & {
    method: 'createUser',

};
