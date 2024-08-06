interface ICreateUserMessage {
    

}

export const getChat = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}