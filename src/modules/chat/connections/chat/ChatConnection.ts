import { WsConnection } from "../../../../utils/connections/WsConnection";
import { ChatInterceptor } from "./ChatInterceptor";

    
/**
 * Module for sending websocket messages to chat broker
 */
export class ChatConnection extends WsConnection
{
    get interceptor(): ChatInterceptor
    {
        return new ChatInterceptor();
    }
}