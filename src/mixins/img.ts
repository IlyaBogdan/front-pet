import noIcon from '@/assets/no-icon.png';
import { ref } from 'vue';

export const useImgMixin = () => {
    const staticUrl = (relationUrl: string) => {
        console.log(noIcon);
        return relationUrl ? `${process.env.VUE_APP_BACKEND_PUBLIC}/${relationUrl}` : noIcon;
    }

    const storeUrl = (relationUrl: string) => {
        return `${process.env.VUE_APP_BACKEND_PUBLIC}${relationUrl}`;
    }

    return {
        staticUrl,
        storeUrl
    }
};
