/* Generated operation-scoped models for inquirystatement. */
import type { ResultStatusType } from '../share.js';

/** Wire-format ResultResult; property names match the API JSON. */
export interface ResultResult {
    "resultCode": string;
    "resultMessage"?: string;
    "resultStatus": ResultStatusType;
}
