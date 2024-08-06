import { ESupportedMethods, request } from "@/utils/request";
import { ILogoutResponse } from "./dto/response";

/**
 * Logout action
 * 
 * @returns {Promise<ILogoutResponse>}
 */
export const logout = async (): Promise<ILogoutResponse> => {

    const response = await request('/auth/logout', {}, ESupportedMethods.POST);
    localStorage.removeItem('apiToken');
    localStorage.removeItem('user');

    return response;
};
