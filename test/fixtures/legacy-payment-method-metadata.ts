import type { PaymentMethodMetaData } from '../../src/index.js';

const scheduled: PaymentMethodMetaData = { recurringType: 'SCHEDULED' };
const unscheduled: PaymentMethodMetaData = { recurringType: 'UNSCHEDULED' };
const omitted: PaymentMethodMetaData = {};
// @ts-expect-error Keep the previously exported recurring-type contract.
const invalid: PaymentMethodMetaData = { recurringType: 'INVALID' };
void [scheduled, unscheduled, omitted, invalid];
