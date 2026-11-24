/* Generated operation-scoped models for invoiceinquiredetails. */
import type { Amount } from '../share.js';

/** Wire-format InvoiceItem; property names match the API JSON. */
export interface InvoiceItem {
    "amount": Amount;
    "description": string;
    "discountAmount": Amount;
    "gmtCreate": string;
    "gmtUpdate": string;
    "itemId": string;
    "periodEnd"?: string;
    "periodStart"?: string;
    "priceId"?: string;
    "proration": boolean;
    "quantity": string;
    "taxAmount": Amount;
    "unitAmount": Amount;
    "usageAmount"?: Amount;
    "usageQuantity"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format InvoiceNote; property names match the API JSON. */
export interface InvoiceNote {
    "action": string;
    "note": string;
    "noteId": string;
    "noteTime": string;
}
