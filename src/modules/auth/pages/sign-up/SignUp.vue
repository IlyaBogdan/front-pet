<template>
    <div class="sign-up">
        <pre-loader v-if="loading"/>
        <div class="title">Sign Up</div>
        <form class="sign-up__form">
            <input-ui
                label="Email"
                @keyup.enter="signUpHandle"
                :required="true"
                type="email"
                v-model:value="email"
            />
            <input-ui 
                label="Password"
                @keyup.enter="signUpHandle"
                :required="true"
                type="password"
                v-model:value="password"
            />
            <input-ui 
                label="Password repeat"
                @keyup.enter="signUpHandle"
                :required="true"
                type="password"
                v-model:value="passwordRepeat"
            />
            <input-ui
                label="First Name"
                @keyup.enter="signUpHandle"
                :required="true"
                v-model:value="firstName"
            />
            <input-ui
                label="Last Name"
                @keyup.enter="signUpHandle"
                v-model:value="lastName"
            />
            <errors-list :errors="errors"/>
            <button-ui type="primary" @keyup.enter="signUpHandle" @click="signUpHandle">Register</button-ui>
        </form>
        <div class="sign-up__footer">
            <div>Do you have an account?</div>
            <div>
                <router-link to="/sign-in">Sign In</router-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { signUp } from '@/modules/auth/api/auth/sign-up';
import { Validator } from '@/utils/Validator';
import { ISignUpParams } from '@/modules/auth/api/auth/sign-up/dto/request';
import { ref } from 'vue';

const email = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);
const passwordRepeat = ref<string | undefined>(undefined);
const firstName = ref<string | undefined>(undefined);
const lastName = ref<string | undefined>(undefined);
const errors = ref<string[]>([]);
const loading = ref(false);

/**
 * Validate parameters for registration, if some parameter
 * is incorrect. Returns login payload
 * 
 * @returns {ISignUpParams}
 */
const validate = (): ISignUpParams => {
    errors.value = [];
    const data = { 
        email: email.value,
        password: password.value,
        first_name: firstName.value
    };
    const validationResult = Validator.payloadValidation(data);
    if (Array.isArray(validationResult)) errors.value = errors.value.concat(validationResult);
    if (password.value != passwordRepeat.value) errors.value.push('Passwords not equals');

    const result = { ...data, last_name: lastName.value } as ISignUpParams;
    return result;
}

/**
 * Sign up handler
 * 
 * @returns {void}
 */
const signUpHandle = (): void => {
    const data: ISignUpParams = validate();
    if (!errors.value.length) {
        loading.value = true;
        signUp(data)
            .then(() => {
                window.location.href = '/personal';
            }, (signUpErrors) => {
                errors.value = signUpErrors;
            })
            .finally(() => {
                loading.value = false;
            });
    }
};

</script>
<style lang="scss" scoped>
    .sign-up {
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