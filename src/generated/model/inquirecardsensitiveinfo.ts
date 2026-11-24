/* Generated operation-scoped models for inquirecardsensitiveinfo. */
import type { AuthorizationControl, CardholderInfo } from '../share.js';

/** Wire-format CardDetail; property names match the API JSON. */
export interface CardDetail {
    "assetId": string;
    "authorizationControl": AuthorizationControl;
    "cardBrand": 'MASTERCARD';
    "cardNickName"?: string;
    "cardStatus": 'ACTIVE' | 'FROZEN' | 'CANCEL';
    "cardholderinfo": CardholderInfo;
    "createdTime": string;
    "maskedCardNo": string;
    "metadata"?: {
        [key: string]: string;
    };
    "note"?: string;
    "purpose": string;
    "updatedTime": string;
}
