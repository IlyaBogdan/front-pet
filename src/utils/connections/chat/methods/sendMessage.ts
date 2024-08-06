interface ICreateUserMessage {}

export const sendMessage = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}