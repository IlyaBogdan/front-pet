import { IUser } from "@/models/IUser";


export interface IMessage {
    /**
     * Message ID
     * @example 1
     */
    id: number;

    /**
     * Author of message
     */
    user?: IUser;

    /**
     * Content of message
     * @example 'Hello'
     */
    message: string;

    /**
     * Send date
     */
    date: {
        /**
         * Date in ISO format
         * @example '2024-06-08T12:33:51'
         */
        date: string,

        /**
         * Timezone
         * @example 'UTC'
         */
        timezone: string,

        /**
         * Timezone type
         * @example 3
         */
        timezone_type: number
    }
};
