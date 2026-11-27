/* Generated operation-scoped models for pay. */
import type { CodeDetail } from '../share.js';

/** Wire-format ChallengeActionForm; property names match the API JSON. */
export interface ChallengeActionForm {
    "challengeRenderValue"?: string;
    "challengeType"?: ChallengeType;
    "extendInfo"?: string;
    "triggerSource"?: ChallengeTriggerSourceType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ChallengeTriggerSourceType = 'AMS' | 'CHANNEL';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ChallengeType = 'SMS_OTP' | 'PLAINTEXT_CARD_NO' | 'CARD_EXPIRE_DATE';

/** Wire-format OrderCodeForm; property names match the API JSON. */
export interface OrderCodeForm {
    "codeDetails": Array<CodeDetail>;
    "expireTime": string;
    "extendInfo"?: string;
    "paymentMethodType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PayInvoiceCreation; property names match the API JSON. */
export interface PayInvoiceCreation {
    "enabled"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentVerificationData; property names match the API JSON. */
export interface PaymentVerificationData {
    "authenticationCode"?: string;
    "verifyRequestId"?: string;
}
