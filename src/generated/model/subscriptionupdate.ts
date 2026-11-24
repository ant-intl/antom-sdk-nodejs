/* Generated operation-scoped models for subscriptionupdate. */
import type { Amount } from '../share.js';

/** Wire-format ProrationSettings; property names match the API JSON. */
export interface ProrationSettings {
    "customAmount"?: Amount;
    "prorationMode"?: 'IMMEDIATE_PAY_CUSTOM_AMOUNT' | 'IMMEDIATE_REFUND_CUSTOM_AMOUNT';
}
