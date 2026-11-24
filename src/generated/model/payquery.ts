/* Generated operation-scoped models for payquery. */
import type { AcquirerInfo, Amount, Quote, Result, ThreeDSResult, TransactionStatusType } from '../share.js';

/** Wire-format CardInfo; property names match the API JSON. */
export interface CardInfo {
    "cardBrand"?: string;
    "cardNo"?: string;
    "cardToken"?: string;
    "funding"?: string;
    "issuingCountry"?: string;
    "paymentMethodRegion"?: string;
    "threeDSResult"?: ThreeDSResult;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentAttempt; property names match the API JSON. */
export interface PaymentAttempt {
    "attemptAt": string;
    "attemptResponse": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PopRiskDecisionResultInfo; property names match the API JSON. */
export interface PopRiskDecisionResultInfo {
    "postRiskDecision"?: string;
    "riskAuthDecision"?: string;
    "riskDecision"?: string;
}

/** Wire-format RetryInfo; property names match the API JSON. */
export interface RetryInfo {
    "availableRetries": number;
    "orderId": string;
    "paymentAttempts": Array<PaymentAttempt>;
}

/** Wire-format Transaction; property names match the API JSON. */
export interface Transaction {
    "acquirerInfo"?: AcquirerInfo;
    "grossSettlementAmount"?: Amount;
    "settlementQuote"?: Quote;
    "transactionAmount": Amount;
    "transactionId": string;
    "transactionRequestId": string;
    "transactionResult": Result;
    "transactionStatus": TransactionStatusType;
    "transactionTime"?: string;
    "transactionType": TransactionType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type TransactionType = 'PAYMENT' | 'REFUND' | 'CAPTURE' | 'CANCEL' | 'AUTHORIZATION' | 'VOID' | 'INCREMENTAL';
