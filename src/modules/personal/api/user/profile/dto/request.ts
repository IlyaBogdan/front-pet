export interface IProfileRequestParams {
    /**
     * User`s email
     * @example 'someemail@gmail.com'
     */
    email?: string,

    /**
     * User`s first name
     * @example 'John'
     */
    first_name?: string,

    /**
     * User`s last name
     * @example 'Snow'
     */
    last_name?: string,

    /**
     * Base64 encoded image
     * @exapmle 'eodfs3840f1asdkoehs'
     */
    avatar?: string
};

