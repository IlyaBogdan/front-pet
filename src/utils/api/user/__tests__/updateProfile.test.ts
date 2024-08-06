import { updateProfile } from "../profile";
import { mockUpdateProfileSuccess } from "../__mocks__/updateProfile";
import fetchMock from 'fetch-mock';
import { IProfileRequestParams } from "../profile/dto/request";
import { BACKEND_URL } from "@/utils/request";

const url = `${BACKEND_URL}/user/profile`;
const updatedData: IProfileRequestParams = {
    email: 'someemail@gmail.com',
    first_name: 'John',
    last_name: 'Snow',
}

describe('Test API request for update profile', () => {

    it('Successfully profile updated', async () => {
        fetchMock.mock({
            url,
            method: 'POST',
            body: updatedData,

            response: mockUpdateProfileSuccess
        });

        const response = await updateProfile(updatedData);
        expect(response).toEqual(mockUpdateProfileSuccess);
    });
});