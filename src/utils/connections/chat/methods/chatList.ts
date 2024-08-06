interface ICreateUserMessage {
    

}

export const chatList = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}