<template>
    <div class="dialog-message" :class="{ grouped: nextUserIsEqual }" :data-destination="message!.type">
        <div class="dialog-message__content">
            <div class="text-wrapper" v-html="content"></div>
            <div class="dialog-message__date">{{ messageDate }}</div>
            <div v-if="!nextUserIsEqual" class="triangle"></div>
        </div>
        <div v-if="!nextUserIsEqual" class="dialog-message__author">
            <avatar-icon :avatar="staticUrl(message!.user!.avatar)"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useImgMixin } from '@/mixins/useImgMixin';
import { IMessageInfo } from '@/models/IChatInfo';
import { IUser } from '@/models/IUser';
import { computed, onMounted, ref, defineProps } from 'vue';
import { TDialogMessageProps } from './props';

const props = defineProps<TDialogMessageProps>();
const message = ref<IMessageInfo | null>(null);
const nextAuthor = ref<IUser | undefined>(props.next);
const { staticUrl } = useImgMixin();

onMounted(() => {
    const type = nextUserIsEqual ? 'out' : 'in';
    message.value = { ...props.message, type };
})

/**
 * Return parsed message content in HTML
 * @returns {string} message HTML
 */
const content = computed(() => {
    const messageContent = message.value!.message;
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return messageContent.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
});

/**
 * Convert message date for dialog
 * 
 * @returns {string} message hours and minutes
 */
const messageDate = computed(() => {
    // TODO: add timezones
    const messageDate = new Date(message.value!.date);
    const hours = `${messageDate.getHours()}`.length == 1 ? `0${messageDate.getHours()}` : `${messageDate.getHours()}`;
    const minutes = `${messageDate.getMinutes()}`.length == 1 ? `0${messageDate.getMinutes()}` : `${messageDate.getMinutes()}`;
    return `${hours}:${minutes}`;
});


const nextUserIsEqual = computed(() => {
    return nextAuthor.value && nextAuthor.value.id === message.value!.user!.id;
});

</script>
<style lang="scss">
    .dialog-message {

        display: flex;
        position: relative;

        &__date {
            position: absolute;
            bottom: 10px;
        }

        &__content {
            background-color: var(--lavanda-ui);
            color:white;
            padding: 20px;
            border-radius: 10px;
            position: relative;
            min-height: 70px;
            min-width: 100px;
            display: inline-block;
            max-width: 350px;

            .triangle {
                position: absolute;
                display: block;
                bottom: -15px;
                width: 0;
                height: 0;
            }            
        }

        &__author {

            position: absolute;
            margin-top: 10px;
            bottom: -50px;
        }

        a {
            color: white;
            text-decoration: underline;

            &:hover {
                color: rgb(184, 183, 183);
            }
        }

        &[data-destination="in"] {
            flex-direction: row;
            justify-content: right;

            .dialog-message__content {
                margin-right: 40px;

                .text-wrapper {
                    text-align: left;
                    margin-bottom: 10px;
                }

                .dialog-message__date {
                    left: 15px;
                }

                .triangle {
                    right: 20px;
                    border-top: 20px solid var(--lavanda-ui);
                    border-left: 20px solid transparent;
                } 
            }
            
            .dialog-message__author {

            }

        }
        &[data-destination="out"] {
            flex-direction: row-reverse;
            justify-content: left;

            .dialog-message__content {
                margin-left: 40px;
        
                .text-wrapper {
                    text-align: right;
                    margin-bottom: 10px;
                }

                .dialog-message__date {
                    right: 15px;
                }

                .triangle {
                    left: 20px;
                    border-top: 20px solid var(--lavanda-ui);
                    border-right: 20px solid transparent;
                } 
            }

            .dialog-message__author {
                
            }
        }
    }
</style>