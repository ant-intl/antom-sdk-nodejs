/* Generated operation-scoped models for inquireaccountinfo. */
/** Wire-format AgenticBoundPaymentMethod; property names match the API JSON. */
export interface AgenticBoundPaymentMethod {
    "paymentMethodDetail": AgenticBoundPaymentMethodDetail;
    "paymentMethodId": string;
    "paymentMethodType": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AgenticBoundPaymentMethodDetail; property names match the API JSON. */
export interface AgenticBoundPaymentMethodDetail {
    "cardBrand"?: string;
    "lastFour"?: string;
}
