import { ChatConnection } from '@/modules/chat/connections/chat/ChatConnection';
import { IUser } from '@/models/IUser';
import { IChat } from '@chat/models/IChat';
import { IChatInfo } from '@chat/models/IChatInfo';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useImgMixin } from '@shared/mixins/useImgMixin';
import { WsConnection } from '@/utils/connections/WsConnection';

/**
 * Mixin for chat methods and data
 */
export const useChatMixin = () => {
  const store = useStore();
  const connection = ref<WsConnection | undefined>(undefined);
  const user = ref<IUser | undefined>(undefined);
  const online = ref(false);
  const { staticUrl } = useImgMixin();

  onMounted(() => {
    user.value = store.state.authModule.user;
    interceptConnection();
  });
  
  /**
   * Main function for running chat websocket connection
   * 
   * @returns {void}
   */
  const interceptConnection = () => {
    connection.value = new ChatConnection().intercept();
    if (connection.value) {
      connection.value.onOpen(() => {

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

  /**
   * Returns online user status in list
   * @param {IUser} user user information
   * @returns {boolean}
   * 
   * TODO: later move it to shared mixin
   */
  const onlineStatus = (user: IUser, onlineIdList: number[]): boolean => {
    return onlineIdList.includes(user.id);
  }

  const convertChatInfo = (chat: IChat | undefined): IChatInfo | undefined => {
    if (chat) {
      const chatInfo: IChatInfo = { 
        ...chat,
        typing: [],
        online: [],
        avatar: '',
        title: ''
      };
      const apiToken = localStorage.getItem("apiToken");
  
      if (chat.type === 0) {
        const opponent = chat.users.filter(
          (chatUser) => chatUser.id !== user.value?.id
        )[0];
        if (opponent) {
          chatInfo.id = opponent.id;
          chatInfo.title = `${opponent.first_name} ${opponent.last_name}`;
          chatInfo.avatar = staticUrl(opponent.avatar);
          chatInfo.shortName = opponent.first_name;
  
          useConnection({method: 'getOnlineUsers', token: apiToken, users: [opponent.id] });
        }
      } else if (chat.type === 1) {
        chatInfo.title = 'chat';
        // @ts-ignore
        chatInfo.avatar = ''; // Обработай avatar более корректно
      }
      return chatInfo;
    }
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

  /**
   * Hook for calling methods for chat broker
   * 
   * @param {any} callParams 
   * @returns {void}
   */
  const useConnection = (callParams: any): void => {
    if (connection.value) {
      connection.value.call(callParams);
    }
  }

  return {
    user,
    online,
    convertChatInfo,
    useInterceptor,
    useConnection,
    onlineStatus
  };
};
