import { ESupportedMethods, request } from "@/utils/request";
import { ISignUpParams } from "./dto/request";
import { ISignUpResponse } from "./dto/response";

/**
 * Action for registration new user
 * 
 * @param { ISignUpParams } data
 * @returns {Promise<ISignUpResponse>}
 */
export const signUp = async (data: ISignUpParams): Promise<ISignUpResponse> => {

    const response = await request('/auth/sign-up', data, ESupportedMethods.POST);

    if (response.authenticated) {
        localStorage.setItem('apiToken', response.authenticated);
        return response;
    } else {
        return response.errors;
    }
};
