import { IChatInfo } from "@/models/IChatInfo"
import { IUser } from "@/models/IUser";

export type TActiveChat = {
    method: 'activeChat',
    chat: IChatInfo
};

export type TUserTyping = {
    method: 'userTyping',
    user: IUser,
    chat: IChatInfo,
    state: boolean
};

