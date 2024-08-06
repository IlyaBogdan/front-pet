interface ICreateUserMessage {
    

}

export const createChat = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}