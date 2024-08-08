import { ChatConnection } from "@/utils/connections/chat/ChatConnection";
import { IUser } from "@/models/IUser";
import { IChat } from "@/models/IChat";
import { IChatInfo } from "@/models/IChatInfo";
import { IMessage } from "@/models/IMessage";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useImgMixin } from "./useImgMixin";
import { TInterceptConfig } from "@/utils/connections/WsMessageInterceptor";

export const useChatMixin = () => {
  const store = useStore();
  const connection = ref<ChatConnection | undefined>(undefined);
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
          connection.value!.interceptor.setListener(interceptConfig);
        });

        callQuee.value.forEach((callParams) => {
          useConnection(callParams);
        });

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

  const sendMessage = (message: IMessage) => {
    if (user.value && connection.value) {
      message.user = user.value;
      //connection.value.call("sendMessage", message);
    }
  };

  const convertChatInfo = (chat: IChat): IChatInfo => {
    const chatInfo: IChatInfo = {
      id: 0,
      title: "",
      avatar: "",
      shortName: "",
      // typing: false,
      // online: false
    };
    if (chat.type === 0) {
      const opponent = chat.users.filter(
        (chatUser) => chatUser.id !== user.value?.id
      )[0];
      if (opponent) {
        chatInfo.id = opponent.id;
        chatInfo.title = `${opponent.first_name} ${opponent.last_name}`;
        chatInfo.avatar = staticUrl(opponent.avatar);
        // chatInfo.typing = this.typingUsers.indexOf(opponent.id) !== -1;
        chatInfo.shortName = opponent.first_name;
        // chatInfo.online = this.chat.online.indexOf(opponent.id) !== -1;

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
  const useInterceptor = (method: string, handler: (...args: any[]) => any) => {
    listeners.value.push({ method, handler });

    if (connection.value) {
      connection.value.interceptor.setListener({ method, handler });
    }
  }

  const useConnection = (callParams: any) => {
    if (connection.value) {
      connection.value.call(callParams);
    } else {
      callQuee.value.push(callParams);
    }
  }

  return {
    connection: connection.value,
    user,
    online,
    sendMessage,
    convertChatInfo,
    useInterceptor,
    useConnection
  };
};
