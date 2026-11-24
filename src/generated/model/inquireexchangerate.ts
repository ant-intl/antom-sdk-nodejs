/* Generated operation-scoped models for inquireexchangerate. */
/* Generated from the Antom OpenAPI schema. */
/** Wire-format CurrencyPair; property names match the API JSON. */
export interface CurrencyPair {
    "buyCurrency"?: string;
    "sellCurrency"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentQuote; property names match the API JSON. */
export interface PaymentQuote {
    "buyCurrency"?: string;
    "exchangeRate"?: number;
    "quoteId"?: string;
    "sellCurrency"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type RateType = 'TRADE' | 'REFERENCE' | 'REFERENCE_TRADE';
