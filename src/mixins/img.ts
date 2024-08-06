import noIcon from '@/assets/no-icon.png';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            avatar: noIcon
        }
    },
    methods: {
        staticUrl(relationUrl: string) {
            return relationUrl ? `${process.env.VUE_APP_BACKEND_PUBLIC}/${relationUrl}` : '';
        }
    },
});
