import { signUp } from "../sign-up";
import { mockSignUpSuccess } from "../__mocks__/signUp";
import fetchMock from 'fetch-mock';
import { ISignUpParams } from "../sign-up/dto/request";
import { BACKEND_URL } from "@/utils/request";

const url = `${BACKEND_URL}/auth/sign-up`;
const signUpParams: ISignUpParams = {
    email: 'someemail@gmail.com',
    password: 'passwd12345',
    first_name: 'John',
    last_name: 'Snow'
}

describe('Test API request for registration', () => {

    it('Successfully registration', async () => {
        fetchMock.mock({
            url,
            method: 'POST',
            body: signUpParams,

            response: mockSignUpSuccess
        });

        const response = await signUp(signUpParams);
        expect(response).toEqual(mockSignUpSuccess);
    });
});