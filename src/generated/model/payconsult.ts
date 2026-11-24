/* Generated operation-scoped models for payconsult. */
import type { Amount, Discount, PaymentMethod, PromotionType } from '../share.js';

/** Wire-format AmountLimit; property names match the API JSON. */
export interface AmountLimit {
    "maxAmount": Amount;
    "minAmount": Amount;
    "remainAmount": Amount;
}

/** Wire-format AmountLimitInfo; property names match the API JSON. */
export interface AmountLimitInfo {
    "dayLimit"?: AmountLimit;
    "monthLimit"?: AmountLimit;
    "singleLimit"?: AmountLimit;
}

/** Wire-format Installment; property names match the API JSON. */
export interface Installment {
    "plans": Array<Plan>;
    "supportCardBrands": Array<SupportCardBrand>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type InteractionType = 'QR' | 'REDIRECT' | 'PUSH' | 'ATM' | 'IBANKING' | 'BANKCOUNTER' | 'OTC';

/** Wire-format InterestFree; property names match the API JSON. */
export interface InterestFree {
    "expireTime": string;
    "freePercentage": number;
    "installmentFreeNums": Array<number>;
    "maxPaymentAmount"?: Amount;
    "minPaymentAmount": Amount;
    "provider": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Logo; property names match the API JSON. */
export interface Logo {
    "logoName": string;
    "logoUrl"?: string;
}

/** Wire-format PaymentEvaluation; property names match the API JSON. */
export interface PaymentEvaluation {
    "paymentMethods"?: Array<PaymentMethod>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PaymentMethodCategoryType = 'ALIPAY_PLUS' | 'WALLET' | 'MOBILE_BANKING_APP' | 'BANK_TRANSFER' | 'ONLINE_BANKING' | 'CARD' | 'OTC' | 'VA';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentMethodInfo; property names match the API JSON. */
export interface PaymentMethodInfo {
    "enabled"?: boolean;
    "extendInfo"?: string;
    "paymentMethodDetail"?: string;
    "paymentMethodType"?: string;
    "preferred"?: boolean;
}

/** Wire-format PaymentOption; property names match the API JSON. */
export interface PaymentOption {
    "amountLimitInfoMap"?: {
        [key: string]: AmountLimitInfo;
    };
    "bankIdentifierCode"?: string;
    "disableReason"?: string;
    "enabled": boolean;
    "extendInfo"?: string;
    "installment"?: Installment;
    "interactionType"?: InteractionType;
    "logo"?: Logo;
    "paymentMethodCategory"?: PaymentMethodCategoryType;
    "paymentMethodRegion"?: Array<string>;
    "paymentMethodType": string;
    "paymentOptionDetail"?: PaymentOptionDetail;
    "preferred"?: boolean;
    "promoNames"?: Array<string>;
    "promotionInfos"?: Array<PromotionInfo>;
    "supportedCurrencies"?: Array<string>;
}

/** Wire-format PaymentOptionDetail; property names match the API JSON. */
export interface PaymentOptionDetail {
    "funding"?: Array<string>;
    "interactionTypes"?: Array<string>;
    "supportBanks": Array<SupportBank>;
    "supportCardBrands": Array<SupportCardBrand>;
}

/** Wire-format Plan; property names match the API JSON. */
export interface Plan {
    "enabled": boolean;
    "extendInfo"?: string;
    "installmentNum": string;
    "interestRate"?: string;
    "interval": string;
    "maxInstallmentAmount": Amount;
    "minInstallmentAmount": Amount;
}

/** Wire-format PromotionInfo; property names match the API JSON. */
export interface PromotionInfo {
    "discount"?: Discount;
    "interestFree"?: InterestFree;
    "promotionType": PromotionType;
}

/** Wire-format SupportBank; property names match the API JSON. */
export interface SupportBank {
    "bankIdentifierCode"?: string;
    "bankLogo"?: Logo;
    "bankShortName"?: string;
}

/** Wire-format SupportCardBrand; property names match the API JSON. */
export interface SupportCardBrand {
    "cardBrand": string;
    "logo": Logo;
}
