import { WsMessageInterceptor } from '../WsMessageInterceptor';
import { activeChat } from './messageHandlers/activeChat';
import { pull } from './messageHandlers/pull';
import { setUser } from './messageHandlers/setUser';
import { setUserList } from './messageHandlers/setUserList';
import { userDialogs } from './messageHandlers/userDialogs';

/**
 * Module for intercepting chat broker messages
 */
export class ChatInterceptor extends WsMessageInterceptor
{

    get messageHandlers(): Array<any>
    {
        return [
            pull,
            setUser,
            setUserList,
            activeChat,
            userDialogs,
        ];
    }
}