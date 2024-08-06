import { defineComponent } from "vue";

export default defineComponent({
    mounted() {
        if (!this.$store.state.authModule.authenticated) window.location.href = '/sign-in';
    },
});
