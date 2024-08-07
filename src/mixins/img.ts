import noIcon from '@/assets/no-icon.png';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const avatar = ref(noIcon);

        const staticUrl = (relationUrl: string) => {
            return relationUrl ? `${process.env.VUE_APP_BACKEND_PUBLIC}/${relationUrl}` : '';
        };

        return {
            avatar,
            staticUrl
        }
    }
});
