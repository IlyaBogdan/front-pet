/**
 * Request parameters for registration
 */
export interface ISignUpParams {
    /**
     * User`s email
     * @example 'someemail@gmail.com'
     */
    email: string;

    /**
     * User`s raw password
     * @example 'passwd123'
     */
    password: string;

    /**
     * User`s first name
     * @example 'John'
     */
    first_name: string;

    /**
     * User`s last name
     * @example 'Snow'
     */
    last_name?: string;
};
