/* Generated operation-scoped models for couponinquiredetails. */
/* Generated from the Antom OpenAPI schema. */
/** Wire-format CouponApplicableProduct; property names match the API JSON. */
export interface CouponApplicableProduct {
    "canDelete"?: boolean;
    "gmtModified"?: string;
    "priceCount"?: number;
    "productId"?: string;
    "productName"?: string;
    "status"?: string;
}

/** Wire-format CouponInquireDetailsAppliesTo; property names match the API JSON. */
export interface CouponInquireDetailsAppliesTo {
    "products"?: Array<CouponApplicableProduct>;
}
