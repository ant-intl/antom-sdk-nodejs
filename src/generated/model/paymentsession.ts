/* Generated operation-scoped models for paymentsession. */
import type { Amount, BillingDiscount, BillingTrialSettings, PeriodRule } from '../share.js';

/** Wire-format AvailablePaymentMethod; property names match the API JSON. */
export interface AvailablePaymentMethod {
    "paymentMethodMetaData"?: {
        [key: string]: object;
    };
    "paymentMethodTypeList"?: Array<PaymentMethodTypeItem>;
}

/** Wire-format BillingCustomerDetails; property names match the API JSON. */
export interface BillingCustomerDetails {
    "billingAddress"?: CustomerAddress;
    "businessAddress"?: CustomerAddress;
    "businessName"?: string;
    "customerType"?: string;
    "fullName"?: string;
    "shippingAddress"?: CustomerAddress;
    "taxIds"?: Array<CustomerTaxId>;
}

/** Wire-format BillingSubscription; property names match the API JSON. */
export interface BillingSubscription {
    "allowPromotionCode"?: boolean;
    "cancelAt"?: string;
    "cancelAtPeriodEnd"?: boolean;
    "collectionMethod"?: string;
    "customerDetails"?: BillingCustomerDetails;
    "customerEmail"?: string;
    "customerId"?: string;
    "daysUntilDue"?: number;
    "defaultPaymentMethod"?: string;
    "description"?: string;
    "discounts"?: Array<BillingDiscount>;
    "paymentBehavior"?: string;
    "subscriptionNotifyUrl"?: string;
    "trialSettings"?: BillingTrialSettings;
}

/** Wire-format CardVerificationResult; property names match the API JSON. */
export interface CardVerificationResult {
    "authenticationMethod": string;
    "authenticationType": string;
    "authorizationCode": string;
    "avsResult": string;
    "cvvResult": string;
    "threeDSResult": RiskThreeDSResult;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CustomerAddress; property names match the API JSON. */
export interface CustomerAddress {
    "address"?: string;
    "addressDetail"?: string;
    "city"?: string;
    "country"?: string;
    "state"?: string;
    "zipcode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CustomerTaxId; property names match the API JSON. */
export interface CustomerTaxId {
    "country"?: string;
    "region"?: string;
    "type"?: string;
    "value"?: string;
}

/** Wire-format ExcludedPaymentMethod; property names match the API JSON. */
export interface ExcludedPaymentMethod {
    "paymentMethodTypeList"?: Array<PaymentMethodTypeItem>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentMethodTypeItem; property names match the API JSON. */
export interface PaymentMethodTypeItem {
    "expressCheckout"?: boolean;
    "paymentMethodOrder"?: number;
    "paymentMethodType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskAddress; property names match the API JSON. */
export interface RiskAddress {
    "isBillShipStateSame": boolean;
    "isPreviousStateSame": boolean;
    "locToShipDistance": number;
    "minPreviousShipToBillDistance": number;
    "shippingPhoneType": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskBuyer; property names match the API JSON. */
export interface RiskBuyer {
    "noteToMerchant": string;
    "noteToShipping": string;
    "orderCountIn1H": number;
    "orderCountIn24H": number;
}

/** Wire-format RiskData; property names match the API JSON. */
export interface RiskData {
    "address"?: RiskAddress;
    "buyer"?: RiskBuyer;
    "cardVerificationResult"?: CardVerificationResult;
    "env"?: RiskEnv;
    "order"?: RiskOrder;
    "riskSignal"?: RiskSignal;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskEnv; property names match the API JSON. */
export interface RiskEnv {
    "ipAddressType": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskOrder; property names match the API JSON. */
export interface RiskOrder {
    "orderType": string;
    "referringSite": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskSignal; property names match the API JSON. */
export interface RiskSignal {
    "riskCode": string;
    "riskReason": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RiskThreeDSResult; property names match the API JSON. */
export interface RiskThreeDSResult {
    "cavv": string;
    "eci": string;
    "threeDSInteractionMode": string;
    "threeDSVersion": string;
}

/** Wire-format SubscriptionPlan; property names match the API JSON. */
export interface SubscriptionPlan {
    "allowAccumulate"?: boolean;
    "maxAccumulateAmount"?: Amount;
    "periodRule"?: PeriodRule;
    "subscriptionNotificationUrl"?: string;
    "subscriptionStartTime"?: string;
}
