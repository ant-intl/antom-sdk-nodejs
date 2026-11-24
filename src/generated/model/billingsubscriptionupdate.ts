/* Generated operation-scoped models for billingsubscriptionupdate. */
/* Generated from the Antom OpenAPI schema. */
/** Wire-format BillingSubscriptionCancellationDetails; property names match the API JSON. */
export interface BillingSubscriptionCancellationDetails {
    "comment"?: string;
    "feedback"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BillingSubscriptionStatusChange; property names match the API JSON. */
export interface BillingSubscriptionStatusChange {
    "action"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PriceItemChange; property names match the API JSON. */
export interface PriceItemChange {
    "currentPriceId"?: string;
    "itemId"?: string;
    "newPriceId"?: string;
    "newQuantity"?: number;
    "type": string;
}
