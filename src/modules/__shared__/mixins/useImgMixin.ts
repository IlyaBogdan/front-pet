import noIcon from '@/assets/no-icon.png';
import { ref } from 'vue';

/**
 * Mixin for generating URL for static img files
 */
export const useImgMixin = () => {

    /**
     * Convert relation URL to static route to img
     * on public path
     * 
     * @param {string} relationUrl relation path to img 
     * @returns {string} full path to img or empty template image
     */
    const staticUrl = (relationUrl: string): string => {
        console.log(noIcon);
        return relationUrl ? `${process.env.VUE_APP_BACKEND_PUBLIC}/${relationUrl}` : noIcon;
    }

    /**
     * Convert relation path to full path to images on
     * backend public folder
     * 
     * @param {string} relationUrl relation path to img 
     * @returns {string} full path to img
     */
    const storeUrl = (relationUrl: string): string => {
        return `${process.env.VUE_APP_BACKEND_PUBLIC}${relationUrl}`;
    }

    return {
        staticUrl,
        storeUrl
    }
};
