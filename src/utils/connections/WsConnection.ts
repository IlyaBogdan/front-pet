import { WsMessageInterceptor } from "./WsMessageInterceptor";

export type TBrokerAPIMethod = (...args: any[]) => any;

/**
 * Abstract singletone class for broker connection
 */
export abstract class WsConnection
{
    /**
     * Singletone instance
     */
    protected static instance: WsConnection | undefined;

    /**
     * Abstract methods list
     */
    protected abstract methods: Array<TBrokerAPIMethod>;

    /**
     * Abstract interceptor of broker messages
     */
    protected abstract interceptor: WsMessageInterceptor;

    /**
     * Upstream websocket connection to broker
     */
    protected connection: WebSocket | undefined;

    constructor() {
        if (WsConnection.instance) {
            return WsConnection.instance;
        }
        
        this.connection = new WebSocket(process.env.VUE_APP_BROKER_CONNECTION!);        
    }

    /**
     * Main method for sending websocket message
     * 
     * @param {WebSocket} connection 
     * @param {any} body
     * @returns {void}
     */
    public static wsSend(connection: WebSocket, body: any): void
    {
        body.date = new Date();
        const command = JSON.stringify(body);
        console.log('Send command:');
        console.log(command);
    
        let timer: NodeJS.Timeout;
    
        switch (connection.readyState) {
            case WebSocket.CONNECTING:
                timer = setInterval(() => {
                    if (connection.readyState == WebSocket.OPEN) {
                        clearInterval(timer);
                        connection.send(command);
                    }
                }, 1000);
                break;
            case WebSocket.OPEN:
                connection.send(command);
                break;
            case WebSocket.CLOSING:
            case WebSocket.CLOSED:
                break;
        }
        
    }

    /**
     * Method for handling messages from broker
     * TODO: interface for broker message
     * 
     * @returns {any} 
     */
    public intercept(): any
    {
        this.connection!.onmessage = (brokerMessage) => {
            const data = JSON.parse(brokerMessage.data);
            console.log('Accepted data:');
            console.log(data);

            if (data.method === 'ok') return;

            const messageHandler = this.interceptor.getHandler(data.method);
            if (messageHandler) {
                messageHandler(data);
            }
        }

        return this;
    }


    onOpen(callback=()=>{}) {
        this.connection!.onopen = callback;

        return this;
    }
    onClose(callback=()=>{}) {
        this.connection!.onclose = callback;

        return this;
    }

    /**
     * Call broker API method
     * 
     * @param {string} methodName 
     * @param {any} options params for method
     * @returns {void}
     */
    public call(methodName: string, options: any = {}): void
    {
        const data = {
            ...options,
            token: localStorage.getItem('apiToken')
        };

        WsConnection.wsSend(this.connection!, data);
    }

    /**
     * Find supported methods for sending data to broker
     * 
     * @param {string} methodName method name of incomming broker message
     * @returns {TBrokerMessageHandler | undefined}
     */
    protected getMethod(methodName: string): TBrokerAPIMethod | undefined
    {
        for (const method of this.methods) {
            if (method.name === methodName) {
                return method;
            }
        }

        return undefined;
    }
}