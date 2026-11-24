/* Generated operation-scoped models for invoicecreate. */
import type { Amount, BuyerTaxId } from '../share.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CustomerBusinessAddress; property names match the API JSON. */
export interface CustomerBusinessAddress {
    "address": string;
    "city"?: string;
    "country": string;
    "state"?: string;
    "zipcode"?: string;
}

/** Wire-format InvoiceCreateItem; property names match the API JSON. */
export interface InvoiceCreateItem {
    "description"?: string;
    "discountAmount"?: Amount;
    "itemAmount"?: Amount;
    "itemId"?: string;
    "priceId"?: string;
    "productId"?: string;
    "quantity"?: number;
    "supplyEnd"?: string;
    "supplyStart"?: string;
    "taxBehavior"?: string;
    "taxCode"?: string;
    "unitAmount"?: Amount;
}

/** Wire-format InvoiceCustomerDetails; property names match the API JSON. */
export interface InvoiceCustomerDetails {
    "businessAddress"?: CustomerBusinessAddress;
    "businessName"?: string;
    "customerType"?: string;
    "email": string;
    "firstName"?: string;
    "lastName"?: string;
    "preferredLocales"?: Array<string>;
    "taxIds"?: Array<BuyerTaxId>;
}
