interface ICreateUserMessage {
    

}

export const createUser = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}