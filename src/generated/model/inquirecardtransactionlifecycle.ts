/* Generated operation-scoped models for inquirecardtransactionlifecycle. */
import type { Amount } from '../share.js';

/** Wire-format CardTransactionLifecycle; property names match the API JSON. */
export interface CardTransactionLifecycle {
    "assetId": string;
    "cardProduct"?: string;
    "lastUpdateTime": string;
    "latestEventStatus"?: string;
    "latestEventType"?: string;
    "lifecycleId": string;
    "maskedCardNo"?: string;
    "totalAuthAmount"?: Amount;
    "totalBillingAmount"?: Amount;
    "totalCancelAmount"?: Amount;
    "totalChargebackAmount"?: Amount;
    "totalRefundAmount"?: Amount;
    "transactionTime": string;
}
