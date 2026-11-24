/* Generated operation-scoped models for creditnoteinquirelist. */
import type { Amount } from '../share.js';

/** Wire-format CreditNoteSummary; property names match the API JSON. */
export interface CreditNoteSummary {
    "createdAt": string;
    "creditNoteId": string;
    "customerId"?: string;
    "effectiveDate": string;
    "invoiceId": string;
    "reason"?: string;
    "refundAmount"?: Amount;
    "refundStatus"?: string;
    "refundedAt"?: string;
    "status": string;
    "totalAmount": Amount;
    "type": string;
    "voidedAt"?: string;
}
