/* Generated operation-scoped models for settle. */
import type { Amount } from '../share.js';

/** Wire-format SettlementDetail; property names match the API JSON. */
export interface SettlementDetail {
    "settleTo": SettleToType;
    "settlementAmount": Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type SettleToType = 'SELLER' | 'MARKETPLACE';
