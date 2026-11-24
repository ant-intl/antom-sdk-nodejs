/* Generated operation-scoped models for vaultsfetchnonce. */
import type { UserName } from '../share.js';

/** Wire-format Card; property names match the API JSON. */
export interface Card {
    "cardNo": string;
    "cardholderName"?: UserName;
    "cvv"?: string;
    "expiryMonth": string;
    "expiryYear": string;
}
