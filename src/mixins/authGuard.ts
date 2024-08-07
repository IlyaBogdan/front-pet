import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();
        onMounted(() => {
            if (!store.state.authModule.authenticated) window.location.href = '/sign-in';
        });
    }
});
