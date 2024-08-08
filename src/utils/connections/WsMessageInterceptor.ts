export type TBrokerMessageHandler = (...args: any[]) => any;

export type TInterceptConfig = {
    method: string,
    handler: (arg: any) => any
}

/**
 * Abstract class for intercepting broker messages
 */
export abstract class WsMessageInterceptor
{
    protected static instance: WsMessageInterceptor | undefined;
    protected listeners: Array<TInterceptConfig> = [];

    constructor() {
        if (WsMessageInterceptor.instance) {
            return WsMessageInterceptor.instance;
        }

        WsMessageInterceptor.instance = this;
    }

    public setListener(interceptConfig: TInterceptConfig): WsMessageInterceptor
    {
        const registredListener = this.listeners.filter((listener) => listener.method === interceptConfig.method);

        if (!registredListener.length) {
            this.listeners.push(interceptConfig);
        }

        return this;
    }

    public checkListeners(brokerMessage: any): WsMessageInterceptor
    {
        const registredListener = this.listeners.filter((listener) => listener.method === brokerMessage.method);
        if (registredListener.length) {
            const { handler } = registredListener[0];
            handler(brokerMessage);
        }

        return this;
    }
}