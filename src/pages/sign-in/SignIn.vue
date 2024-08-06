<template>
    <div class="sign-in">
        <pre-loader v-if="loading"/>
        <div class="title">Sign In</div>
        <form class="sign-in__form">
            <input-ui
                label="Email"
                v-model:value="email"
                @keyup.enter="loginHandle"
            />
            <input-ui
                label="Password"
                type="password"
                v-model:value="password"
                @keyup.enter="loginHandle"
            />
            <errors-list :errors="errors"/>
            <button-ui type="primary" @keyup.enter="loginHandle" @click="loginHandle">Sign In</button-ui>
        </form>
        <div class="sign-in__footer">
            <div>Don't have an account?</div>
            <div>
                <router-link to="/sign-up">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { login } from '@/utils/api/auth/login';
import { ILoginParams } from '@/utils/api/auth/login/dto/request';
import { Validator } from '@/utils/Validator';
import { defineComponent, ref } from 'vue';

export default defineComponent({

    setup() {
        const email = ref<string | undefined>(undefined);
        const password = ref<string | undefined>(undefined);
        const errors = ref<string[]>([]);
        const loading = ref(false);

        /**
         * Validate email and password and set errors, if some parameter
         * is incorrect. Returns login payload
         * 
         * @returns {ILoginParams}
         */
        const validate = (): ILoginParams => {
            const data: ILoginParams = { 
                email: email.value!,
                password: password.value!
            };

            errors.value = [];
            const validationResult = Validator.payloadValidation(data);
            if (Array.isArray(validationResult)) errors.value = errors.value.concat(validationResult);

            return data;
        }

        /**
         * Try login
         * 
         * @returns {void}
         */
        const loginHandle = (): void => {
            const data = validate();

            if (!errors.value.length) {
                loading.value = true;
                login(data)
                    .then(() => {
                        window.location.href = '/personal';
                    }, (loginErrors) => {
                        errors.value = loginErrors;
                    })
                    .finally(() => {
                        loading.value = false;
                    });
            }
        };

        return {
            email,
            password,
            errors,
            loading,
            validate,
            loginHandle,
        };
    }
});
</script>
<style lang="scss">
    .sign-in {
        width: 500px;
        margin: 10px 20px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding-bottom: 20px;

        .title {
            font-weight: 600;
            font-size: 20px;
            margin: 5px 0 15px;
            text-align: center;
        }

        &__form {
            margin: 0 0 20px;
            display: flex;
            flex-direction: column;

            .errors {
                text-align: center;
            }

            button {
                margin: 20px auto 0;
                width: 200px;
            }
        }

        &__footer {
            text-align: center;
            div {
                margin-top: 5px;
            }
        }
    }
</style>