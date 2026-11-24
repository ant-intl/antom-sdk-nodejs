/* Generated operation-scoped models for couponinquirelist. */
import type { Amount } from '../share.js';

/** Wire-format Coupon; property names match the API JSON. */
export interface Coupon {
    "amountOff"?: Amount;
    "couponId"?: string;
    "couponName"?: string;
    "discountType"?: string;
    "maxRedemptions"?: number;
    "percentOff"?: string;
    "redeemBy"?: string;
    "redeemedCount"?: number;
    "status"?: string;
}
