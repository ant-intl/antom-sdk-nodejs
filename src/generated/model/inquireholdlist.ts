/* Generated operation-scoped models for inquireholdlist. */
import type { Amount } from '../share.js';

/** Wire-format ReserveHoldDetail; property names match the API JSON. */
export interface ReserveHoldDetail {
    "holdAmount": Amount;
    "holdId": string;
    "holdRequestId": string;
    "holdStatus": string;
    "releasableAmount": Amount;
    "releaseStatus": string;
    "releaseTime": string;
}
