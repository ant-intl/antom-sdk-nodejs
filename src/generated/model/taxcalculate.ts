/* Generated operation-scoped models for taxcalculate. */
import type { Amount, TaxAddress } from '../share.js';

/** Wire-format TaxBusinessDetails; property names match the API JSON. */
export interface TaxBusinessDetails {
    "address"?: TaxAddress;
}

/** Wire-format TaxCalculationLineItem; property names match the API JSON. */
export interface TaxCalculationLineItem {
    "amount": Amount;
    "goodsReferenceId": string;
    "productId"?: string;
    "quantity": number;
    "taxBehavior"?: string;
    "taxCode"?: string;
}

/** Wire-format TaxCustomerDetails; property names match the API JSON. */
export interface TaxCustomerDetails {
    "billingAddress"?: TaxAddress;
    "businessDetails"?: TaxBusinessDetails;
    "name"?: string;
    "shippingAddress"?: TaxAddress;
    "taxExemptions"?: Array<TaxExemption>;
    "taxIds"?: Array<TaxId>;
}

/** Wire-format TaxExemption; property names match the API JSON. */
export interface TaxExemption {
    "certificateNumber": string;
    "effectiveFrom"?: string;
    "exemptionType": string;
    "jurisdiction": TaxExemptionJurisdiction;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxExemptionJurisdiction; property names match the API JSON. */
export interface TaxExemptionJurisdiction {
    "city"?: string;
    "country": string;
    "region"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxId; property names match the API JSON. */
export interface TaxId {
    "country": string;
    "region"?: string;
    "value": string;
}

/** Wire-format TaxShipFromDetails; property names match the API JSON. */
export interface TaxShipFromDetails {
    "address": TaxAddress;
}

/** Wire-format TaxShippingCost; property names match the API JSON. */
export interface TaxShippingCost {
    "amount": Amount;
}
