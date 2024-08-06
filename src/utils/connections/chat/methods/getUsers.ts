interface ICreateUserMessage {
    

}

export const getUsers = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}