import { request } from "@/utils/request";
import { IProfileRequestParams } from "./dto/request";
import { IProfileRequestResponse, IUserProfileInfo } from "./dto/response";

/**
 * Update profile info
 * @param { IProfileRequestParams } params new information about user profile
 * @returns {Promise<IProfileRequestResponse>}
 */
export const updateProfile = async (params: IProfileRequestParams): Promise<IProfileRequestResponse> => {

    const response = await request('/user/profile', params, 'POST');
    
    return response;
};

/**
 * Return info about logined user
 * 
 * @returns {IUserProfileInfo}
 */
export const getAuthUserInfo = async (): Promise<IUserProfileInfo> => {
    const response = await request('/user', {}, 'GET');
    localStorage.setItem('user', JSON.stringify(response));

    return response;
};

/**
 * Get info about user by id
 * 
 * @param {number} userId some user ID
 * @returns {IUserProfileInfo}
 */
export const getUserProfile = async (userId: number): Promise<IUserProfileInfo> => {

    const response = await request(`/user/${userId}`, {}, 'GET');
    return response;
};
