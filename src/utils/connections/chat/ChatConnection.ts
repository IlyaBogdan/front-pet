import { TBrokerAPIMethod, WsConnection } from "../WsConnection";
import { ChatInterceptor } from "./ChatInterceptor";
import { chatList } from "./methods/chatList";
import { createChat } from "./methods/createChat";
import { createUser } from "./methods/createUser";
import { getChat } from "./methods/getChat";
import { getOnlineUsers } from "./methods/getOnlineUsers";
import { getUsers } from "./methods/getUsers";
import { pull } from "./methods/pull";
import { sendMessage } from "./methods/sendMessage";
import { setTyping } from "./methods/setTyping";
    
/**
 * Module for sending websocket messages to chat broker
 */
export class ChatConnection extends WsConnection
{
    get methods(): Array<TBrokerAPIMethod>
    {
        return [
            pull,
            createUser,
            getUsers,
            createChat,
            getChat,
            chatList,
            sendMessage,
            getOnlineUsers,
            setTyping,
            usersOnline
        ]
    }

    get interceptor(): ChatInterceptor
    {
        return new ChatInterceptor();
    }
}