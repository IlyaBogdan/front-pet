<template lang="">
    <div class="send-message">
        <div class="attachment clickable">
            <inline-svg :src="attachment" />
        </div>
        <div class="main-field">
            <textarea
                ref="textArea"
                placeholder="Message..."
                @keyup.enter="send"
                v-model="message"
                @focus="$emit('typing', true)"
                @blur="$emit('typing', false)"
                @input="$emit('typing', true)"
            ></textarea>
            <div class="emoji clickable">
                <inline-svg :src="emoji" />
            </div>
            <div class="photo clickable">
                <inline-svg :src="photo" />
            </div>
        </div>
        
        <div class="submit clickable" @click="send">
            <div class="send">
                <inline-svg :src="sendIcon"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Attachment from '@/assets/attachment.svg';
import Emoji from '@/assets/emoji.svg';
import Photo from '@/assets/photo.svg';
import SendIcon from '@/assets/send-icon.svg';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    name: "send-message-field",
    setup(props, { emit }) {
        const message = ref('');
        const typing = ref(false);
        const attachment = ref(Attachment);
        const emoji = ref(Emoji);
        const photo = ref(Photo);
        const sendIcon = ref(SendIcon);
        const textArea = ref<HTMLElement | null>(null);

        onMounted(() => {
            textArea.value!.setAttribute("style", "height:" + (textArea.value!.scrollHeight) + "px;overflow-y:hidden;");
            textArea.value!.addEventListener("input", function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + "px";
            }, false);
        });

        const send = () => {
            if (message.value.length) {
                emit('sendMessage', message.value);
                emit('typing', false);
                message.value = '';
            }
        };

        return {
            message,
            typing,
            attachment,
            emoji,
            photo,
            sendIcon,
            send
        }
    }
});
</script>
<style lang="scss">
    .send-message {
        background-color: gray;
        display: flex;
        align-items: center;
        padding: 10px;

        .clickable {
            cursor: pointer;
            .inline-svg svg {
                width: 23px;
                height: 23px;
                transition: .3s all;
            }

            &:hover .inline-svg svg path {
                fill: white;
            }
        }
        

        .attachment {
            margin-right: 10px;
            margin-left: 9px;
        }

        .main-field {
            width: 85%;
            display: flex;
            align-items: center;
            border: 1px solid var(--gray-ui);
            padding: 5px;
            border-radius: 10px;

            textarea {
                width: 85%;
                resize: none;
                height: 25px;
                padding: 5px 5px 0 5px;
                background-color: gray;
                border: none;
                color: white;
                font-weight: 600;

                &:focus {
                    outline: none;
                }
            }

            .emoji, .photo {
                margin-left: 10px;
                margin-right: 10px;
            }
        }

        .submit {
            margin-left: 10px;
        }
    }
</style>