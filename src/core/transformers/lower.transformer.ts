import { ValueTransformer } from 'typeorm';

export class LowerTransformer implements ValueTransformer {
    to(value: string) {
        if (!value || !value.toLowerCase) {
            return value;
        }
        return value.toLowerCase();
    }

    from(value) {
        return value;
    }
}
