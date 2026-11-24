/* Generated operation-scoped models for receiptinquiredetails. */
import type { Amount } from '../share.js';

/** Wire-format ReceiptItem; property names match the API JSON. */
export interface ReceiptItem {
    "amount"?: Amount;
    "description": string;
    "discountAmount"?: Amount;
    "gmtCreate": string;
    "gmtUpdate": string;
    "itemId": string;
    "periodEnd"?: string;
    "periodStart"?: string;
    "proration"?: boolean;
    "quantity": number;
    "taxAmount"?: Amount;
    "unitAmount"?: Amount;
    "usageAmount"?: Amount;
    "usageQuantity"?: string;
    "usageUnit"?: string;
}
