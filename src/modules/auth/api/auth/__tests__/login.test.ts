import { login } from "../login";
import { mockLoginSuccess } from "../__mocks__/login";
import fetchMock from 'fetch-mock';
import { ILoginParams } from "../login/dto/request";
import { BACKEND_URL } from "@/utils/request";

const url = `${BACKEND_URL}/auth/login`;
const loginParams: ILoginParams = {
    email: 'someemail@gmail.com',
    password: 'passwd12345'
};

describe('Test API request for login', () => {

    it('Successfully login', async () => {
        fetchMock.mock({
            url,
            method: 'POST',
            body: loginParams,

            response: mockLoginSuccess
        });

        const response = await login(loginParams);
        expect(response).toEqual(mockLoginSuccess);
    });
});