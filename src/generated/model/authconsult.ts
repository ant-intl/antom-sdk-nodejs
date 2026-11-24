/* Generated operation-scoped models for authconsult. */
import type { CodeDetail } from '../share.js';

/** Wire-format AuthCodeForm; property names match the API JSON. */
export interface AuthCodeForm {
    "codeDetails": Array<CodeDetail>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AuthMetaData; property names match the API JSON. */
export interface AuthMetaData {
    "accountHolderCertNo"?: string;
    "accountHolderName"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AuthorizationAccessParams; property names match the API JSON. */
export interface AuthorizationAccessParams {
    "channel"?: string;
}

/** Wire-format AuthorizationConsultDirectDebitInfo; property names match the API JSON. */
export interface AuthorizationConsultDirectDebitInfo {
    "accessParams"?: AuthorizationAccessParams;
    "channelProductCode"?: string;
    "oriAgreementNo"?: string;
    "passBackParams"?: AuthorizationConsultPassBackParams;
    "periodRuleParams"?: PeriodRuleParams;
    "personalProductCode"?: string;
    "signScene"?: string;
    "subMerchant"?: AuthorizationConsultSubMerchant;
    "subscribeType"?: string;
    "subscriptionParams"?: AuthorizationConsultSubscriptionParams;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AuthorizationConsultPassBackParams; property names match the API JSON. */
export interface AuthorizationConsultPassBackParams {
    "itemId"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AuthorizationConsultSubMerchant; property names match the API JSON. */
export interface AuthorizationConsultSubMerchant {
    "subMerchantServiceDescription"?: string;
    "subMerchantServiceName"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AuthorizationConsultSubscriptionParams; property names match the API JSON. */
export interface AuthorizationConsultSubscriptionParams {
    "baseAmount"?: string;
    "deductDesc"?: string;
    "deductName"?: string;
    "expireAt"?: string;
    "firstSubscriptionInfo"?: string;
    "followSubscriptionInfos"?: string;
    "nextPaymentDate"?: string;
    "offsetAmount"?: string;
    "originSubscriptionInfo"?: string;
    "subscribeTplType"?: string;
    "targetSubscriptionInfo"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PeriodRuleParams; property names match the API JSON. */
export interface PeriodRuleParams {
    "period"?: string;
    "periodType"?: string;
    "singleAmount"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ScopeType = 'BASE_USER_INFO' | 'AGREEMENT_PAY' | 'USER_INFO' | 'USER_LOGIN_ID' | 'HASH_LOGIN_ID' | 'SEND_OTP' | 'TAOBAO_REBIND';
