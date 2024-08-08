import { ChatConnection } from "@/utils/connections/chat/ChatConnection";
import { IUser } from "@/models/IUser";
import { IChat } from "@/models/IChat";
import { IChatInfo } from "@/models/IChatInfo";
import { IMessage } from "@/models/IMessage";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useImgMixin } from "./useImgMixin";
import { TInterceptConfig } from "@/utils/connections/WsMessageInterceptor";
import { WsConnection } from "@/utils/connections/WsConnection";

export const useChatMixin = () => {
  const store = useStore();
  const connection = ref<WsConnection | undefined>(undefined);
  const user = ref<IUser | undefined>(undefined);
  const online = ref(false);
  const { staticUrl } = useImgMixin();
  const listeners = ref<TInterceptConfig[]>([]);
  const callQuee = ref<any[]>([]);

  onMounted(() => {
    user.value = store.state.authModule.user;
    interceptConnection();
  });
  
  const interceptConnection = () => {
    connection.value = new ChatConnection().intercept();
    if (connection.value) {
      connection.value.onOpen(() => {

        listeners.value.forEach((interceptConfig) => {
          console.log('set interceptor');
          console.log(interceptConfig);
          connection.value!.interceptor.setListener(interceptConfig);
        });
        listeners.value = [];

        callQuee.value.forEach((callParams) => {
          console.log('call');
          console.log(callParams);
          useConnection(callParams);
        });
        callQuee.value = [];

        online.value = true;
        const apiToken = localStorage.getItem("apiToken");
        if (apiToken) {
          useConnection({ method: 'pull', token: apiToken, user: user.value! });
        }
      }).onClose(() => {
        online.value = false;
      });
    }
  };

  const convertChatInfo = (chat: IChat): IChatInfo => {
    const chatInfo: IChatInfo = { ...chat, online: [] };

    if (chat.type === 0) {
      const opponent = chat.users.filter(
        (chatUser) => chatUser.id !== user.value?.id
      )[0];
      if (opponent) {
        chatInfo.id = opponent.id;
        chatInfo.title = `${opponent.first_name} ${opponent.last_name}`;
        chatInfo.avatar = staticUrl(opponent.avatar);
        chatInfo.shortName = opponent.first_name;

        // this.connection.call('getOnlineUsers', { users: [opponent.id] });
      }
    } else if (chat.type === 1) {
      chatInfo.title = "chat";
      // @ts-ignore
      chatInfo.avatar = this.avatar; // Обработай avatar более корректно
    }
    return chatInfo;
  };

  /**
   * Set message handler for intercepting broker messages
   * 
   * @param {string} method name of method of incomming message
   * @callback any incomming messages nandler
   * @returns {void}
   */
  const useInterceptor = (method: string, handler: (arg: any) => any) => {
    if (connection.value) {
      connection.value.interceptor.setListener({ method, handler });
    }
  }

  const useConnection = (callParams: any) => {
    if (connection.value) {
      connection.value.call(callParams);
    }
  }

  return {
    user,
    online,
    convertChatInfo,
    useInterceptor,
    useConnection
  };
};
