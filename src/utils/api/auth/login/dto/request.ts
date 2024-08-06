/**
 * Request parameters for login
 */
export interface ILoginParams {
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
};
