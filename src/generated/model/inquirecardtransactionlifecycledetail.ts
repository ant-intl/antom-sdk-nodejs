/* Generated operation-scoped models for inquirecardtransactionlifecycledetail. */
import type { Amount, CardTransactionEvent } from '../share.js';

/** Wire-format CardTransactionLifecycleDetail; property names match the API JSON. */
export interface CardTransactionLifecycleDetail {
    "assetId": string;
    "cardProduct"?: string;
    "events"?: Array<CardTransactionEvent>;
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
