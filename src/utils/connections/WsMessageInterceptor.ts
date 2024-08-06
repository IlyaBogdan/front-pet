export type TBrokerMessageHandler = (...args: any[]) => any;

/**
 * Abstract class for intercepting broker messages
 */
export abstract class WsMessageInterceptor
{
    protected static instance: WsMessageInterceptor | undefined;

    constructor() {
        if (WsMessageInterceptor.instance) {
            return WsMessageInterceptor.instance;
        }

        WsMessageInterceptor.instance = this;
    }

    protected abstract messageHandlers: Array<TBrokerMessageHandler>;


    /**
     * Find supported message handler of broker message by name
     * 
     * @param {string} methodName method name of incomming broker message
     * @returns {TBrokerMessageHandler | undefined}
     */
    public getHandler(methodName: string): TBrokerMessageHandler | undefined
    {
        for (const method of this.messageHandlers) {
            if (method.name === methodName) {
                return method;
            }
        }

        return undefined;
    }
}