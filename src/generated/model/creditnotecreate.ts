/* Generated operation-scoped models for creditnotecreate. */
import type { Amount } from '../share.js';

/** Wire-format CreditNoteCreateItem; property names match the API JSON. */
export interface CreditNoteCreateItem {
    "description"?: string;
    "invoiceItemId"?: string;
    "itemAmount"?: Amount;
    "quantity"?: number;
    "type": string;
    "unitAmount"?: Amount;
}
