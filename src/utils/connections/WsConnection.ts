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
     * Upstream websocket connection to broker
     */
    protected connection: WebSocket | undefined;

    /**
     * Abstract interceptor of broker messages
     */
    public abstract interceptor: WsMessageInterceptor;

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
    public intercept(): WsConnection
    {
        this.connection!.onmessage = (brokerMessage) => {

            const data = JSON.parse(brokerMessage.data);
            this.interceptor.checkListeners(data);
            console.log('Accepted data:');
            console.log(data);

            if (data.method === 'ok') return;
        }

        return this;
    }


    public onOpen(callback=()=>{}) {
        this.connection!.onopen = callback;

        return this;
    }
    public onClose(callback=()=>{}) {
        this.connection!.onclose = callback;

        return this;
    }

    /**
     * Call broker API method
     * 
     * @param {any} options params for method
     * @returns {void}
     */
    public call(options: any = {}): WsConnection
    {
        const data = {
            ...options,
            token: localStorage.getItem('apiToken')
        };

        WsConnection.wsSend(this.connection!, data);

        return this;
    }
}