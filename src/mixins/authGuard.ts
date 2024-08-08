import { onMounted } from "vue";
import { useStore } from "vuex";

export const useAuthGuard = () => {
    const store = useStore();
    onMounted(() => {
        if (!store.state.authModule.authenticated) window.location.href = '/sign-in';
    });
};
