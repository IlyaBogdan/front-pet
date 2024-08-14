import { IMessage } from "@/models/IMessage";
import { IUser } from "@/models/IUser";

/**
 * Props for component DialogMessage
 */
export type TDialogMessageProps = {

    /**
     * Message info
     */
    message: IMessage,

    /**
     * Next author in dialog
     */
    next: IUser | undefined
};
