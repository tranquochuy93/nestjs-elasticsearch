import { isNumber } from 'lodash';
import { ValueTransformer } from 'typeorm';

export class TimestampTransformer implements ValueTransformer {
    to(value) {
        if (isNumber(value)) {
            return new Date(value * 1000);
        }
        return value;
    }

    from(value) {
        if (!value) {
            return value;
        }
        return Math.round(+new Date(value) / 1000);
    }
}
