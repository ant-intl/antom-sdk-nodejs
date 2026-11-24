/* Generated operation-scoped models for subscriptioncreate. */
import type { Amount } from '../share.js';

/** Wire-format CreateSubscriptionInfo; property names match the API JSON. */
export interface CreateSubscriptionInfo {
    "allowRetry"?: boolean;
    "fixedAmount"?: Amount;
    "maxAmountFloor"?: Amount;
    "retryMode"?: string;
}
