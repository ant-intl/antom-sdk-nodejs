/* Generated operation-scoped models for billingsubscriptioninquiredetails. */
import type { Amount } from '../share.js';

/** Wire-format BillingSubscriptionDiscountInfo; property names match the API JSON. */
export interface BillingSubscriptionDiscountInfo {
    "amountOff"?: Amount;
    "couponId"?: string;
    "discountId": string;
    "duration"?: string;
    "percentOff"?: string;
    "status"?: string;
    "times"?: number;
    "type"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BillingSubscriptionInquireDetailsCancellationDetails; property names match the API JSON. */
export interface BillingSubscriptionInquireDetailsCancellationDetails {
    "comment"?: string;
    "feedback"?: string;
}
