/* Generated operation-scoped models for refund. */
import type { Amount, UserName } from '../share.js';

/** Wire-format RefundDetail; property names match the API JSON. */
export interface RefundDetail {
    "refundAmount": Amount;
    "refundFrom": RefundFromType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type RefundFromType = 'SELLER' | 'MARKETPLACE' | 'UNSETTLED_FUNDS';

/** Wire-format RefundToBankInfo; property names match the API JSON. */
export interface RefundToBankInfo {
    "accountHolderName"?: UserName;
    "accountNo"?: string;
    "bankCode"?: string;
}
