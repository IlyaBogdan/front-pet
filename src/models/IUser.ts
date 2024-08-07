/**
 * User data description
 */
export interface IUser {
    /**
     * User`s ID
     * @example 123
     */
    id: number;

    /**
     * User`s email
     * @example 'someemail@gmail.com'
     */
    email: string;

    /**
     * User`s first name
     * @example 'John'
     */
    first_name: string;

    /**
     * User`s last name
     * @example 'Snow'
     */
    last_name: string;

    /**
     * User`s avatar URL
     * @example 'http://store-static.com/avatar/123'
     */
    avatar: string;

    /**
     * Online status
     * @example true
     */
    online?: boolean
};
