/* Generated operation-scoped models for inquiresubscriptionpayment. */
import type { Amount, PaymentMethod } from '../share.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PaymentStatus = 'SUCCESS' | 'FAIL';

/** Wire-format SubscriptionTransaction; property names match the API JSON. */
export interface SubscriptionTransaction {
    "disputeId"?: string;
    "paymentAmount": Amount;
    "paymentId": string;
    "paymentMethod": PaymentMethod;
    "paymentTime"?: string;
    "phaseNo": number;
    "status": string;
}
