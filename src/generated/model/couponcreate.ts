/* Generated operation-scoped models for couponcreate. */
import type { Amount } from '../share.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CouponCreateAppliesTo; property names match the API JSON. */
export interface CouponCreateAppliesTo {
    "productIds": Array<string>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CouponPromotionCode; property names match the API JSON. */
export interface CouponPromotionCode {
    "code"?: string;
    "promotionCodeId"?: string;
    "status"?: string;
}

/** Wire-format PromotionCode; property names match the API JSON. */
export interface PromotionCode {
    "code"?: string;
    "customerId"?: string;
    "expiryTime"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "minAmount"?: Amount;
    "oneTimeOnly"?: boolean;
    "promotionCodeRequestId": string;
}
