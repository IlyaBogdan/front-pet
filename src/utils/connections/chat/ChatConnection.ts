import { WsConnection } from "../WsConnection";
import { ChatInterceptor } from "./ChatInterceptor";
import { 
    TChatListParams,
    TCreateChatParams,
    TCreateUserParams,
    TGetChatParams,
    TGetOnlineUsersParams,
    TPullParams,
    TSendMessageParams,
    TSetTypingParams,
    TGetUsersParams
} from "./messages";
    
/**
 * Module for sending websocket messages to chat broker
 */
export class ChatConnection extends WsConnection
{

    sendMessage = (params: TSendMessageParams): void => {
        
    }

    chatList = (params: TChatListParams): void => {
        this.call({ method: 'chatList', ...params });
    }

    setTyping = (params: TSetTypingParams): void => {

    }

    getUsers = (params: TGetUsersParams): void => {
        this.call({ method: 'getUsers', ...params });
    }

    getChat = (params: TGetChatParams): void => {
        this.call({ method: 'getChat', ...params });
    }

    pull = (params: TPullParams): void => {
        this.call({ method: 'pull', ...params });
    }

    getOnlineUsers = (params: TGetOnlineUsersParams): void => {

    }

    createChat = (params: TCreateChatParams): void => {

    }

    createUser = (params: TCreateUserParams): void => {
        
    }

    get interceptor(): ChatInterceptor
    {
        return new ChatInterceptor();
    }
}