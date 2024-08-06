interface IPullParams {
    

}

export const pull = (params: IPullParams): void => {
    const data = { method: 'pull', ...params };

}