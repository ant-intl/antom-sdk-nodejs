/* Generated operation-scoped models for receiptinquirelist. */
import type { Amount } from '../share.js';

/** Wire-format Receipt; property names match the API JSON. */
export interface Receipt {
    "collectionMethod"?: string;
    "customerId": string;
    "description"?: string;
    "discountAmount"?: Amount;
    "dueDate"?: string;
    "fileUrl"?: string;
    "footer"?: string;
    "fxRate"?: string;
    "fxRateId"?: string;
    "gmtCreate": string;
    "gmtUpdate": string;
    "invoiceId": string;
    "originalReceiptId"?: string;
    "paidAmount"?: Amount;
    "paidTime"?: string;
    "payToId"?: string;
    "payToRequestId"?: string;
    "paymentDeductedAmount"?: Amount;
    "paymentMethod"?: ReceiptPaymentMethod;
    "paymentMethodType"?: string;
    "paymentRequestId"?: string;
    "periodEnd"?: string;
    "periodStart"?: string;
    "reason": string;
    "receiptId": string;
    "receiptType": string;
    "refundAmount"?: Amount;
    "refundedAmount"?: Amount;
    "remainingAmount"?: Amount;
    "settlementAmount"?: Amount;
    "shippingFeeAmount"?: Amount;
    "status": string;
    "subscriptionId"?: string;
    "subtotal": Amount;
    "taxAmount"?: Amount;
    "totalAmount": Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format ReceiptPaymentMethod; property names match the API JSON. */
export interface ReceiptPaymentMethod {
    "paymentMethodType"?: string;
}
