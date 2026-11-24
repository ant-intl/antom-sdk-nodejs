/* Generated operation-scoped models for invoiceinquirelist. */
import type { Amount } from '../share.js';

/** Wire-format Invoice; property names match the API JSON. */
export interface Invoice {
    "currency": string;
    "customerEmail"?: string;
    "customerFirstName"?: string;
    "customerId": string;
    "customerLastName"?: string;
    "description"?: string;
    "dueDate": string;
    "gmtCreate": string;
    "gmtUpdate": string;
    "invoiceId": string;
    "paidAmount": Amount;
    "pdfFileUrl"?: string;
    "periodEnd": string;
    "periodStart": string;
    "reason": string;
    "remainAmount": Amount;
    "status": string;
    "subscriptionId": string;
    "totalAmount": Amount;
}
