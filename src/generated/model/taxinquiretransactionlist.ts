/* Generated operation-scoped models for taxinquiretransactionlist. */
import type { Amount } from '../share.js';

/** Wire-format TaxTransaction; property names match the API JSON. */
export interface TaxTransaction {
    "failureReason"?: string;
    "postedAt"?: string;
    "referencePaymentId"?: string;
    "referenceRefundId"?: string;
    "status": string;
    "taxAmount": Amount;
    "taxCalculationId": string;
    "taxDate": string;
    "taxTransactionId": string;
    "type": string;
}
