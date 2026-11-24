/* Generated operation-scoped models for billingsubscriptioninquirelist. */
import type { Amount, BillingSubscriptionPriceItem } from '../share.js';

/** Wire-format Subscription; property names match the API JSON. */
export interface Subscription {
    "billingCycleAnchor"?: string;
    "billingMode"?: string;
    "cancelAt"?: string;
    "cancelAtPeriodEnd"?: boolean;
    "canceledAt"?: string;
    "createTime": string;
    "currentPeriodEnd": string;
    "currentPeriodStart": string;
    "customerId": string;
    "description"?: string;
    "discountAmount"?: Amount;
    "priceItems"?: Array<BillingSubscriptionPriceItem>;
    "status": string;
    "subscriptionId": string;
    "subscriptionRequestId"?: string;
    "subtotal"?: Amount;
    "terminationReason"?: string;
    "totalAmount"?: Amount;
    "trialEnd"?: string;
    "trialStart"?: string;
}
