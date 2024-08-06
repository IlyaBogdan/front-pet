import { ESupportedMethods, request } from "@/utils/request";
import { ILoginParams } from "./dto/request";
import { ILoginResponse } from "./dto/response";

/**
 * Action for login user
 * 
 * @param { ISignUpParams } data
 * @returns {Promise<ISignUpResponse>}
 */
export const login = async (data: ILoginParams): Promise<ILoginResponse> => {

    const response = await request('/auth/login', data, ESupportedMethods.POST);

    if (response.authenticated) {
        localStorage.setItem('apiToken', response.authenticated);
        return response;
    } else {
        return response.errors;
    }
};
