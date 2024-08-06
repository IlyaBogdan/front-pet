interface ValidatorMessages {
    email: string;
    password: string;
    [key: string]: string; // Индексная подпись для сообщений
  }
  
  interface ValidatorType {
    messages: ValidatorMessages;
    email: (value: string) => boolean;
    password: (value: string) => boolean;
    payloadValidation: (fields: Record<string, any>) => boolean | string[];
    [key: string]: any; // Индексная подпись для методов валидатора
  }
  
export const Validator: ValidatorType = {
  
    messages: {
      email: 'Incorrect email format',
      password: 'Password must contain at least 7 characters',
    },
  
    email(value: string) {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return !!value.match(validRegex);
    },
  
    password(value: string) {
      const validRegex = /^[A-Za-z]\w{7,14}$/;
      return !!value.match(validRegex);
    },
  
    payloadValidation(fields: Record<string, any>) {
      const errors: string[] = [];
      for (const [field, value] of Object.entries(fields)) {
        if (!value) {
          errors.push(`Field ${field} is required`);
          continue;
        }
        if (field in this && typeof this[field] === 'function' && !this[field](value)) {
          errors.push(this.messages[field]);
          continue;
        }
      }
      return errors.length ? errors : true;
    }
  }